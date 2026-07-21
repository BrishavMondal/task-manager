import { useState } from "react";
import "./App.css";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";

import type { Task } from "./types/task";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] = useState("All");

  const addTask = (
    title: string,
    description: string,
    priority: Task["priority"]
  ) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        description,
        priority,
        completed: false,
      },
    ]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
            }
          : t
      )
    );
  };

  const editTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const filtered = tasks.filter((task) => {
    const statusOk =
      status === "All"
        ? true
        : status === "Completed"
        ? task.completed
        : !task.completed;

    const priorityOk =
      priority === "All"
        ? true
        : task.priority === priority;

    const searchOk = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return statusOk && priorityOk && searchOk;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskForm onAdd={addTask} />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <FilterBar
        status={status}
        priority={priority}
        setStatus={setStatus}
        setPriority={setPriority}
      />

      <TaskList
        tasks={filtered}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </div>
  );
}