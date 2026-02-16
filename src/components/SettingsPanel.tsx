import { FC } from "react";
import { AppSettings } from "../hooks/useSettings";

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: Partial<AppSettings>) => void;
  onClose: () => void;
}

export const SettingsPanel: FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onClose,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal settings-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>⚙️ Settings</h2>
        </div>

        <div className="settings-group">
          <h3>Sound</h3>
          <div className="setting-item">
            <label htmlFor="sound-enabled">
              <span>Enable Sound Effects</span>
              <input
                id="sound-enabled"
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) =>
                  onSettingsChange({ soundEnabled: e.target.checked })
                }
              />
            </label>
          </div>

          {settings.soundEnabled && (
            <div className="setting-item">
              <label htmlFor="sound-volume">
                <span>Volume</span>
                <input
                  id="sound-volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.soundVolume}
                  onChange={(e) =>
                    onSettingsChange({
                      soundVolume: parseFloat(e.target.value),
                    })
                  }
                />
                <span className="volume-display">
                  {Math.round(settings.soundVolume * 100)}%
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="settings-group">
          <h3>Keyboard Layout</h3>
          <div className="setting-item">
            <label htmlFor="keyboard-layout">
              <span>Layout</span>
              <select
                id="keyboard-layout"
                value={settings.keyboardLayout}
                onChange={(e) =>
                  onSettingsChange({
                    keyboardLayout: e.target
                      .value as AppSettings["keyboardLayout"],
                  })
                }
              >
                <option value="qwerty">QWERTY</option>
                <option value="dvorak">DVORAK</option>
                <option value="colemak">COLEMAK</option>
              </select>
            </label>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
