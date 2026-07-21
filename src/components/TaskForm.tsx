import { useState } from "react";
import type { Priority } from "../types/task";

interface Props {
  onAdd: (
    title: string,
    description: string,
    priority: Priority
  ) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title, description, priority);

    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}