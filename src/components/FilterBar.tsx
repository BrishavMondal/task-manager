
interface Props {
  status: string;
  priority: string;
  setStatus: (value: string) => void;
  setPriority: (value: string) => void;
}

export default function FilterBar({
  status,
  priority,
  setStatus,
  setPriority,
}: Props) {
  return (
    <>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>All</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </>
  );
}