import { FC } from "react";
import { Achievement } from "../data/achievements";

interface AchievementsModalProps {
  achievements: Achievement[];
  onClose: () => void;
}

export const AchievementsModal: FC<AchievementsModalProps> = ({
  achievements,
  onClose,
}) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal achievements-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>🏆 Achievements</h2>
          <p className="achievements-progress">
            {unlockedCount} / {achievements.length} Unlocked
          </p>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-card ${
                achievement.unlocked ? "unlocked" : "locked"
              }`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                {achievement.unlocked && achievement.unlockedAt && (
                  <span className="unlocked-date">
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              {achievement.unlocked && (
                <div className="achievement-badge">✓</div>
              )}
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
