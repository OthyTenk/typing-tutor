import { FC } from "react";

interface PracticeHeaderProps {
  title: string;
  handleButtonAction: () => void;
}

export const PracticeHeader: FC<PracticeHeaderProps> = ({
  title,
  handleButtonAction,
}) => {
  return (
    <div className="practice-header">
      <button className="back-to-lessons" onClick={handleButtonAction}>
        ← Back to Lessons
      </button>
      <h3>{title}</h3>
    </div>
  );
};
