export interface Lesson {
  id: string;
  title: string;
  keys: string[];
  prompt: string;
  row: "home" | "top" | "bottom" | "middle" | "number" | "symbol" | "all";
  minWpm?: number;
  minAccuracy?: number;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  progress: number;
}

export interface HandInfo {
  hand: "left" | "right" | "both" | null;
  requiresShift: boolean;
  shiftHand: "left" | "right";
}
