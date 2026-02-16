import { useState, useEffect } from "react";

export interface AppSettings {
  soundEnabled: boolean;
  soundVolume: number;
  keyboardLayout: "qwerty" | "dvorak" | "colemak";
  theme: "light" | "dark";
}

const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  soundVolume: 0.5,
  keyboardLayout: "qwerty",
  theme: "dark",
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("typing-settings");
      if (saved) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem("typing-settings", JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return { settings, updateSettings };
};
