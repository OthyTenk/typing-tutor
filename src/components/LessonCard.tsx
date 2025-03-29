import { FC } from "react";

interface LessonCardProps {
  progress: number;
  title: string;
  onSelectedLesson: () => void;
}

export const LessonCard: FC<LessonCardProps> = ({
  progress,
  title,
  onSelectedLesson,
}) => {
  return (
    <div className="lesson-card" onClick={onSelectedLesson}>
      <h3>{title}</h3>
      <div className="progress">Progress: {progress}%</div>
    </div>
  );
};
