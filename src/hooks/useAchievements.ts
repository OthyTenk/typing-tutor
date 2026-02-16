import { useState, useEffect, useCallback } from "react";
import { ACHIEVEMENTS, Achievement } from "../data/achievements";
import { TypingStats } from "../types";

export const useAchievements = (stats: { [key: string]: TypingStats }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("typing-achievements");
      if (saved) {
        const savedAchievements: Array<{
          id: string;
          unlocked: boolean;
          unlockedAt?: number;
        }> = JSON.parse(saved);
        setAchievements(
          ACHIEVEMENTS.map((ach) => {
            const saved = savedAchievements.find((s) => s.id === ach.id);
            return saved
              ? {
                  ...ach,
                  unlocked: saved.unlocked,
                  unlockedAt: saved.unlockedAt,
                }
              : ach;
          }),
        );
      }
    } catch (error) {
      console.error("Failed to load achievements:", error);
    }
  }, []);

  const checkAchievements = useCallback(() => {
    const data = { progress: stats };
    const updated = achievements.map((ach) => {
      if (!ach.unlocked && ach.condition(data)) {
        return { ...ach, unlocked: true, unlockedAt: Date.now() };
      }
      return ach;
    });

    const newUnlocks = updated.filter(
      (ach, idx) => ach.unlocked && !achievements[idx].unlocked,
    );

    if (newUnlocks.length > 0) {
      setNewlyUnlocked(newUnlocks);
      setAchievements(updated);
      try {
        localStorage.setItem("typing-achievements", JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save achievements:", error);
      }
    }
  }, [stats, achievements]);

  const clearNewlyUnlocked = useCallback(() => {
    setNewlyUnlocked([]);
  }, []);

  return {
    achievements,
    newlyUnlocked,
    checkAchievements,
    clearNewlyUnlocked,
  };
};
