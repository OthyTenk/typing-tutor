import { TypingStats } from "../types";

export interface AchievementData {
  progress: { [key: string]: TypingStats };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (data: AchievementData) => boolean;
  unlocked: boolean;
  unlockedAt?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-steps",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "👣",
    condition: (data) => Object.keys(data.progress || {}).length >= 1,
    unlocked: false,
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Reach 60 WPM",
    icon: "⚡",
    condition: (data) =>
      Object.values(data.progress || {}).some((s) => s.wpm >= 60),
    unlocked: false,
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Complete a lesson with 100% accuracy",
    icon: "💎",
    condition: (data) =>
      Object.values(data.progress || {}).some((s) => s.accuracy === 100),
    unlocked: false,
  },
  {
    id: "consistent",
    title: "Consistent",
    description: "Complete 5 lessons",
    icon: "🔥",
    condition: (data) => Object.keys(data.progress || {}).length >= 5,
    unlocked: false,
  },
  {
    id: "master",
    title: "Master Typist",
    description: "Complete all lessons",
    icon: "🏆",
    condition: (data) => Object.keys(data.progress || {}).length >= 14,
    unlocked: false,
  },
  {
    id: "accuracy-ace",
    title: "Accuracy Ace",
    description: "Maintain 95% accuracy on 3 lessons",
    icon: "🎯",
    condition: (data) =>
      Object.values(data.progress || {}).filter((s) => s.accuracy >= 95)
        .length >= 3,
    unlocked: false,
  },
  {
    id: "speedster",
    title: "Speedster",
    description: "Reach 80 WPM",
    icon: "🚀",
    condition: (data) =>
      Object.values(data.progress || {}).some((s) => s.wpm >= 80),
    unlocked: false,
  },
  {
    id: "no-mistakes",
    title: "Flawless",
    description: "Complete a lesson with 0 errors",
    icon: "✨",
    condition: (data) =>
      Object.values(data.progress || {}).some((s) => s.errors === 0),
    unlocked: false,
  },
];
