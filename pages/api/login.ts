import type { NextApiRequest, NextApiResponse } from "next"
import oracledb from "oracledb"
import crypto from "crypto"
import * as cookie from "cookie"   // ✅ fix

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" })
  }

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT_STRING,
    })

    const result = await connection.execute(
      `SELECT USER_ID, EMAIL, PASSWORD, FIRST_NAME, LAST_NAME 
       FROM IKA.USERS 
       WHERE EMAIL = :email`,
      [email],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    )

    await connection.close()

    if (!result.rows || result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const user = result.rows[0] as any
    const hashedInput = crypto.createHash("md5").update(password).digest("hex")

    if (user.PASSWORD !== hashedInput) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // set session cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(
        "user-session",
        JSON.stringify({
          id: user.USER_ID,
          email: user.EMAIL,
          firstName: user.FIRST_NAME,
          lastName: user.LAST_NAME,
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }
      )
    )

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.USER_ID,
        email: user.EMAIL,
        firstName: user.FIRST_NAME,
        lastName: user.LAST_NAME,
      },
    })
  } catch (err: any) {
    console.error("Oracle login error:", err)
    return res.status(500).json({ error: "An error occurred during login" })
  }
}
