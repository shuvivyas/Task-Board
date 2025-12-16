export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task">
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        <span className={task.completed ? "done" : ""}>
          {task.title}
        </span>
      </label>

      <button
        className="delete"
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </div>
  );
}
