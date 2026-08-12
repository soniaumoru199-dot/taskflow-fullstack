const Database = require("better-sqlite3");
const express = require("express");
const cors = require("cors");

const db = new Database("taskflow.db");

const app = express();

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending'
  )
`);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow API is running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`TaskFlow server running on http://localhost:${PORT}`);
});

let tasks = [
  {
    id: 1,
    title: "Build TaskFlow frontend",
    status: "Completed",
  },
  {
    id: 2,
    title: "Create Node.js backend",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Deploy TaskFlow",
    status: "Pending",
  },
];

app.get("/api/tasks", (req, res) => {
  const tasks = db
    .prepare("SELECT * FROM tasks ORDER BY id ASC")
    .all();

  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Task title is required",
    });
  }

  const result = db
    .prepare("INSERT INTO tasks (title, status) VALUES (?, ?)")
    .run(title.trim(), "Pending");

  const newTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newTask);
});

app.patch("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const { status } = req.body;

  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  db
    .prepare("UPDATE tasks SET status = ? WHERE id = ?")
    .run(status, taskId);

  const updatedTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(taskId);

  res.json(updatedTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  db
    .prepare("DELETE FROM tasks WHERE id = ?")
    .run(taskId);

  res.json({
    message: "Task deleted successfully",
  });
});