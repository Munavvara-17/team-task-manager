// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./database.db", (err) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log("SQLite Connected");
//   }
// });

// // Create tables automatically
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT UNIQUE,
//     password TEXT
//   )`);

//   db.run(`CREATE TABLE IF NOT EXISTS projects (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     admin_id INTEGER
//   )`);

//   db.run(`CREATE TABLE IF NOT EXISTS tasks (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT,
//     description TEXT,
//     due_date TEXT,
//     priority TEXT,
//     status TEXT DEFAULT 'To Do',
//     assigned_to INTEGER,
//     project_id INTEGER
//   )`);
// });

// module.exports = db;

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error(err.message);
  else console.log("SQLite Connected");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'member'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    admin_id INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS project_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    project_id INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    due_date TEXT,
    priority TEXT,
    status TEXT DEFAULT 'To Do',
    assigned_to INTEGER,
    project_id INTEGER
  )`);
});

module.exports = db;