const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// PostgreSQL-tilkobling
const pool = new Pool({
  connectionString: 'postgresql://postgres:QYOGNDHwaTzmwKRMZMwrNtgUEJNqhHiJ@switchback.proxy.rlwy.net:11586/railway',
  ssl: {
    rejectUnauthorized: false
  }
});

// Lag tabellen hvis den ikke finnes
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`, (err, result) => {
  if (err) {
    console.error("❌ Feil ved opprettelse av tabell:", err);
  } else {
    console.log("✅ PostgreSQL-databasen er klar.");
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve HTML-siden
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST: Registrer bruker
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, $2)`,
      [username, password]
    );
    res.send("✅ Registrering vellykket!");
  } catch (err) {
    res.send("❌ Feil: Brukernavn finnes kanskje allerede.");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server kjører på http://localhost:${port}`);
});
