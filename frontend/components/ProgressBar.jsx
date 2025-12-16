export default function ProgressBar({ completed, total }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress">
      <div className="progress-info">
        <span>Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="progress-bar">
        <div style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
