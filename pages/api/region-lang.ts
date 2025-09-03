import type { NextApiRequest, NextApiResponse } from "next"
import oracledb from "oracledb"
import { useRegion } from "@/hooks/use-region"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { lang, region } = req.body

  console.log("Current Language 1:", lang)
  console.log("User Region 2:", region.toLowerCase())

  const regionToUse = region.toLowerCase();


  if (!lang) {
    return res.status(400).json({ message: "Missing lang in request body" })
  }
  let connection
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT_STRING,
    })
    const result = await connection.execute(
      `SELECT * FROM IKA.LANG_SITE WHERE LANG_ISO_CODE = :regionToUse`,
      { regionToUse }, // object binding
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    )
    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ message: "Lang not found" })
    }
    console.log("Got rows:", result.rows)
    return res.status(200).json({
      success: true,
      message: "Query Successful!",
      data: result.rows,
    })
  } catch (error) {
    console.error("Database error:", error)
    return res.status(500).json({ message: "Internal server error", error })
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (closeErr) {
        console.error("Error closing connection:", closeErr)
      }
    }
  }
  
}
