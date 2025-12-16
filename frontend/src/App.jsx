import { useEffect, useState } from "react";
import "./App.css";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskItem from "../components/TaskItem";
import ProgressBar from "../components/ProgressBar";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const completedCount = tasks.filter(t => t.completed).length;

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTask(title);
    setTitle("");
    loadTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task.id, !task.completed);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Task Board</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <ProgressBar
          completed={completedCount}
          total={tasks.length}
        />

        {tasks.length > 0 && completedCount === tasks.length && (
          <div className="celebrate">🎉 All tasks completed!</div>
        )}

        <div className="tasks">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
