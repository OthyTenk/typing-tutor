import { FC } from "react";

interface LessonCardProps {
  progress: number;
  title: string;
  onSelectedLesson: () => void;
  isCustom?: boolean;
  onDelete?: () => void;
}

export const LessonCard: FC<LessonCardProps> = ({
  progress,
  title,
  onSelectedLesson,
  isCustom,
  onDelete,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm(`Delete custom lesson "${title}"?`)) {
      onDelete();
    }
  };

  return (
    <div
      className={`lesson-card ${isCustom ? "custom-lesson" : ""}`}
      onClick={onSelectedLesson}
    >
      <h3>
        {isCustom && <span className="custom-badge">✍️</span>}
        {title}
      </h3>
      <div className="progress">Progress: {progress}%</div>
      {isCustom && onDelete && (
        <button
          className="btn-delete"
          onClick={handleDelete}
          title="Delete lesson"
        >
          🗑️
        </button>
      )}
    </div>
  );
};
