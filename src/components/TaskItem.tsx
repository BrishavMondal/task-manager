import { useState } from "react";
import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({
  task,
  onDelete,
  onToggle,
  onEdit,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const saveTask = () => {
    if (!title.trim()) return;

    onEdit({
      ...task,
      title,
      description,
    });

    setEditing(false);
  };

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      {editing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />

          <div className="task-buttons">
            <button className="complete-btn" onClick={saveTask}>
              Save
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                setTitle(task.title);
                setDescription(task.description);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <p>
            <strong>Status:</strong>{" "}
            {task.completed ? "Completed ✅" : "Active ⏳"}
          </p>

          <div className="task-buttons">
            <button
              className="complete-btn"
              onClick={() => onToggle(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button
              className="edit-btn"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}