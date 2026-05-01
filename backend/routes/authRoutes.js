const router = require("express").Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed],
    function (err) {
      if (err) return res.status(500).json({ msg: "User already exists" });
      res.json({ msg: "User created" });
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (err) return res.status(500).json(err);
      if (!user) return res.status(400).json({ msg: "User not found" });

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) return res.status(400).json({ msg: "Wrong password" });

      const token = jwt.sign({ id: user.id }, "secret123");

      res.json({ token });
    }
  );
});

// TEMP: check users
router.get("/test", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.json(err);
    res.json(rows);
  });
});

// TEMP: create user
router.get("/fix-user", async (req, res) => {
  const bcrypt = require("bcryptjs");
  const hashed = await bcrypt.hash("123456", 10);

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    ["test", "test@gmail.com", hashed],
    function (err) {
      if (err) return res.json({ msg: "Already exists" });
      res.json({ msg: "User created" });
    }
  );
});

module.exports = router;

router.get("/fix-user", async (req, res) => {
  const bcrypt = require("bcryptjs");
  const hashed = await bcrypt.hash("123456", 10);

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    ["test", "test@gmail.com", hashed],
    function (err) {
      if (err) return res.json({ msg: "Already exists" });
      res.json({ msg: "User created" });
    }
  );
});