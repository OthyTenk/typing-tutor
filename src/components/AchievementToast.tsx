import { FC, useEffect } from "react";
import { Achievement } from "../data/achievements";

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementToast: FC<AchievementToastProps> = ({
  achievement,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="achievement-toast">
      <div className="toast-icon">🎉</div>
      <div className="toast-content">
        <h3>Achievement Unlocked!</h3>
        <div className="toast-achievement">
          <span className="achievement-icon">{achievement.icon}</span>
          <p>{achievement.title}</p>
        </div>
        <p className="toast-description">{achievement.description}</p>
      </div>
      <button className="toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};
