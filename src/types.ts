export type PracticeMode = "normal" | "timed" | "race" | "zen";

export interface Lesson {
  id: string;
  title: string;
  keys: string[];
  prompt: string;
  row: "home" | "top" | "bottom" | "middle" | "number" | "symbol" | "all";
  minWpm?: number;
  minAccuracy?: number;
  isCustom?: boolean;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  progress: number;
  timeElapsed?: number;
}

export interface HandInfo {
  hand: "left" | "right" | "both" | null;
  requiresShift: boolean;
  shiftHand: "left" | "right";
}

export interface PracticeModeConfig {
  type: PracticeMode;
  timeLimit?: number; // for timed mode (seconds)
  showTimer?: boolean;
  allowBackspace?: boolean;
}
