import { FC } from "react";

interface AppHeaderProps {
  onToggleTheme: () => void;
  onShowSettings?: () => void;
  onShowAchievements?: () => void;
}

export const AppHeader: FC<AppHeaderProps> = ({
  onToggleTheme,
  onShowSettings,
  onShowAchievements,
}) => {
  return (
    <div className="header">
      <h1>Typing Tutor</h1>

      <div className="header-actions">
        {onShowAchievements && (
          <button
            className="btn btn-icon"
            onClick={onShowAchievements}
            title="Achievements"
          >
            🏆
          </button>
        )}
        {onShowSettings && (
          <button
            className="btn btn-icon"
            onClick={onShowSettings}
            title="Settings"
          >
            ⚙️
          </button>
        )}
        <button
          className="btn btn-icon"
          onClick={onToggleTheme}
          title="Toggle Theme"
        >
          🌓
        </button>
      </div>
    </div>
  );
};
