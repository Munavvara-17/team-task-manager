const router = require("express").Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// Create Task
router.post("/", auth, (req, res) => {
  const { title, description, due_date, priority, assigned_to, project_id } =
    req.body;

  db.run(
    `INSERT INTO tasks (title, description, due_date, priority, assigned_to, project_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, due_date, priority, assigned_to, project_id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Task created" });
    }
  );
});

// Get Tasks
router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// DELETE TASK
router.delete("/:id", auth, (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Deleted" });
  });
});

// Update Task Status
router.put("/:id", auth, (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Updated" });
    }
  );
});

module.exports = router;

