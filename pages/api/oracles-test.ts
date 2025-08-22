import type { NextApiRequest, NextApiResponse } from 'next';
import oracledb from 'oracledb';
import { cookies } from "next/headers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const currentLang = req.headers['x-current-locale'] || 'en';
  console.log("Current Language:", currentLang);

  let currentRegion = localStorage.getItem("user-region");

  console.log("Current Region:", currentRegion);

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT_STRING, // e.g., "host:port/service"
    });

    const result = await connection.execute(`SELECT * FROM IKA.USERS WHERE EMAIL ='niran.millet@ika.com'`, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

      console.log("Current Language:", currentLang);
    await connection.close();

    res.status(200).json(result.rows);
  } catch (err: any) {
      console.log("Current Language:", currentLang);
    console.error("Oracle connection error:", err);
    console.log("Current Language:", currentLang);
    res.status(500).json({
      error: "Oracle DB error",
      detail: err.message,
    });
  }
}


export async function loginUserDB(formData: FormData) {
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()

  if (!email || !password) {
    return { error: "Email and password are required" }
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
      return { error: "Invalid email or password" }
    }

    const user = result.rows[0] as any

    // Compute MD5 hash of the input password
    const hashedInput = crypto.createHash("md5").update(password).digest("hex")

    if (user.PASSWORD !== hashedInput) {
      return { error: "Invalid email or password" }
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(
      "user-session",
      JSON.stringify({
        id: user.ID,
        email: user.EMAIL,
        firstName: user.FIRST_NAME,
        lastName: user.LAST_NAME,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      }

      
    )

    return {
      success: true,
      message: "Login successful!",
      user: {
        id: user.ID,
        email: user.EMAIL,
        firstName: user.FIRST_NAME,
        lastName: user.LAST_NAME,
      },
    }
  } catch (err: any) {
    console.error("Oracle login error:", err)
    return { error: "An error occurred during login" }
  }
}