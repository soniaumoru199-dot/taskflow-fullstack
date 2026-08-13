console.log("REGISTER VERSION LOADED");
const Database = require("better-sqlite3");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const db = new Database("taskflow.db");
const app = express();

app.use(cors());
app.use(express.json());

// Create tasks table
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending'
  )
`);

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  )
`);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow API is running",
  });
});

// Register a new user
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  const existingUser = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(cleanEmail);

  if (existingUser) {
    return res.status(409).json({
      message: "An account with that email already exists",
    });
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const result = db
    .prepare(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)"
    )
    .run(cleanName, cleanEmail, passwordHash);

  res.status(201).json({
    message: "Account created successfully",
    userId: result.lastInsertRowid,
  });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const cleanEmail = email.trim().toLowerCase();

  const user = db
    .prepare(
      "SELECT id, name, email, password_hash FROM users WHERE email = ?"
    )
    .get(cleanEmail);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (passwordHash !== user.password_hash) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
  const tasks = db
    .prepare("SELECT * FROM tasks ORDER BY id ASC")
    .all();

  res.json(tasks);
});

// Create a task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Task title is required",
    });
  }

  const result = db
    .prepare(
      "INSERT INTO tasks (title, status) VALUES (?, ?)"
    )
    .run(title.trim(), "Pending");

  const newTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newTask);
});

// Update a task
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

// Delete a task
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

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TaskFlow server running on http://localhost:${PORT}`);
});