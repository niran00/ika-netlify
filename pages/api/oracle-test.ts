import oracledb from "oracledb";

export default async function handler(req, res) {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT_STRING, // e.g. "hostname:1521/servicename"
    });

    const result = await connection.execute(`SELECT * FROM your_table`, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    await connection.close();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Oracle connection error:", err);
    res.status(500).json({ error: "Oracle DB error", detail: err.message });
  }
}
