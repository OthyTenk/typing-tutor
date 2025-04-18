export interface Lesson {
  id: string;
  title: string;
  keys: string[];
  prompt: string;
  row: "home" | "top" | "bottom" | "middle" | "all";
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  progress: number;
}
