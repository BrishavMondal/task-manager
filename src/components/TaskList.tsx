import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList(props: Props) {
  return (
    <>
      {props.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={props.onDelete}
          onToggle={props.onToggle}
          onEdit={props.onEdit}
        />
      ))}
    </>
  );
}