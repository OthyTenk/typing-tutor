import { FC } from "react";
import { PracticeMode } from "../types";

interface PracticeModeSelectorProps {
  currentMode: PracticeMode;
  onModeSelect: (mode: PracticeMode) => void;
}

export const PracticeModeSelector: FC<PracticeModeSelectorProps> = ({
  currentMode,
  onModeSelect,
}) => {
  const modes: {
    value: PracticeMode;
    label: string;
    icon: string;
    description: string;
  }[] = [
    {
      value: "normal",
      label: "Normal",
      icon: "📝",
      description: "Standard practice mode",
    },
    {
      value: "timed",
      label: "Timed",
      icon: "⏱️",
      description: "60 second challenge",
    },
    {
      value: "race",
      label: "Race",
      icon: "🏁",
      description: "Complete as fast as possible",
    },
    {
      value: "zen",
      label: "Zen",
      icon: "🧘",
      description: "No pressure, no timer",
    },
  ];

  return (
    <div className="practice-mode-selector">
      <h3>Practice Mode</h3>
      <div className="mode-buttons">
        {modes.map((mode) => (
          <button
            key={mode.value}
            className={`mode-button ${
              currentMode === mode.value ? "active" : ""
            }`}
            onClick={() => onModeSelect(mode.value)}
            title={mode.description}
          >
            <span className="mode-icon">{mode.icon}</span>
            <span className="mode-label">{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
