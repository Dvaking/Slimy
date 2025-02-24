import express from "express";
import cors from "cors";
import { Pool } from "pg";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_, res) => {
  res.json({message: "Hello, TypeScript + Express + PostgreSQL!"});
});

app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    res.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});
