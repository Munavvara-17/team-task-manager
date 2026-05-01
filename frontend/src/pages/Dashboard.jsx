import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

// RUN ON LOAD
useEffect(() => {
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { authorization: localStorage.getItem("token") },
    });
    setTasks(res.data);
  };

  fetchTasks();
}, []);

  // CREATE TASK
  const createTask = async () => {
    if (!title) return;

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description: "Demo",
          due_date: "2026-05-01",
          priority: "High",
          assigned_to: 1,
          project_id: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const getColor = (status) => {
    if (status === "Done") return "#4CAF50";
    if (status === "In Progress") return "#ff9800";
    return "#2196F3";
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "8px 12px",
        }}
      >
        Logout
      </button>

      <h1 style={{ textAlign: "center" }}>
        🚀 Team Task Manager ({tasks.length})
      </h1>

      {tasks.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          No tasks yet. Add your first task 👇
        </p>
      )}

      {/* Add Task */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") createTask();
          }}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "5px",
          }}
        />

        <button
          onClick={createTask}
          disabled={!title}
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </div>

      {/* Task Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {tasks.map((t) => (
          <div
            key={t.id}
            style={{
              background: "#1e1e2f",
              padding: "15px",
              borderRadius: "12px",
              width: "220px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>{t.title}</h3>

            <p style={{ color: getColor(t.status), fontWeight: "bold" }}>
              {t.status}
            </p>

            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              <button onClick={() => updateStatus(t.id, "To Do")}>
                To Do
              </button>

              <button onClick={() => updateStatus(t.id, "In Progress")}>
                Progress
              </button>

              <button
                onClick={() => updateStatus(t.id, "Done")}
                style={{ backgroundColor: "#4CAF50", color: "white" }}
              >
                Done
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteTask(t.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}