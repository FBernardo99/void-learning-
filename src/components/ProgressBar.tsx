
interface ProgressBarProps {
  label: string;
  value: number;
}

// Mostra visualmente o progresso de uma atividade ou disciplina.
function ProgressBar({ label, value }: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-bar">
      <div className="progress-bar__header">
        <span>{label}</span>
        <strong>{progress}%</strong>
      </div>

      <div
        className="progress-bar__track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-bar__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
