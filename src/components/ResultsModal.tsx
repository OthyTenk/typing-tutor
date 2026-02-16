import { FC } from "react";
import { Lesson, TypingStats } from "../types";

interface ResultsModalProps {
  stats: TypingStats;
  lesson: Lesson;
  onRetry: () => void;
  onNext: () => void;
  onMenu: () => void;
}

export const ResultsModal: FC<ResultsModalProps> = ({
  stats,
  lesson,
  onRetry,
  onNext,
  onMenu,
}) => {
  const isPassed =
    (!lesson.minWpm || stats.wpm >= lesson.minWpm) &&
    (!lesson.minAccuracy || stats.accuracy >= lesson.minAccuracy);

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isPassed ? "success" : "failure"}`}>
        <h2>{isPassed ? "Lesson Completed! 🎉" : "Lesson Failed 😔"}</h2>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="label">WPM</span>
            <span className="value">{stats.wpm}</span>
            {lesson.minWpm && (
              <span className="target">Target: {lesson.minWpm}</span>
            )}
          </div>

          <div className="stat-item">
            <span className="label">Accuracy</span>
            <span className="value">{stats.accuracy}%</span>
            {lesson.minAccuracy && (
              <span className="target">Target: {lesson.minAccuracy}%</span>
            )}
          </div>

          <div className="stat-item">
            <span className="label">Errors</span>
            <span className="value">{stats.errors}</span>
          </div>
        </div>

        {!isPassed && (
          <div className="feedback">
            <p>Don't give up! improvements come with practice.</p>
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onRetry} className="btn-secondary">
            Retry
          </button>
          <button onClick={onMenu} className="btn-secondary">
            Menu
          </button>
          {isPassed && (
            <button onClick={onNext} className="btn-primary auto-focus">
              Next Lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
