import type { NextApiRequest, NextApiResponse } from 'next';
import oracledb from 'oracledb';


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
