import { FC } from "react";

interface AppHeaderProps {
  onToggleTheme: () => void;
}

export const AppHeader: FC<AppHeaderProps> = ({ onToggleTheme }) => {
  return (
    <div className="header">
      <h1>Typing Tutor</h1>

      <button className="toggle-theme" onClick={onToggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};
