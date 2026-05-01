const router = require("express").Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// Create project
router.post("/", auth, (req, res) => {
  const { name } = req.body;

  db.run(
    "INSERT INTO projects (name, admin_id) VALUES (?, ?)",
    [name, req.user.id],
    function (err) {
      if (err) return res.status(500).json(err);

      // add creator as member
      db.run(
        "INSERT INTO project_members (user_id, project_id) VALUES (?, ?)",
        [req.user.id, this.lastID]
      );

      res.json({ projectId: this.lastID });
    }
  );
});

// Get projects
router.get("/", auth, (req, res) => {
  db.all(
    `SELECT p.* FROM projects p
     JOIN project_members pm ON p.id = pm.project_id
     WHERE pm.user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

module.exports = router;