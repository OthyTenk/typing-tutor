import { TypingStats } from "../types";

export const generatePrompt = (keys: string[], length: number): string => {
  let prompt = "";
  for (let i = 0; i < length; i++) {
    prompt += keys[Math.floor(Math.random() * keys.length)];
    if (i % 5 === 4) prompt += " "; // Add space every 5 chars
  }
  return prompt.trim();
};

export const calculateStats = (
  promptLength: number,
  errors: number,
  startTime: number
): TypingStats => {
  const timeMinutes = (Date.now() - startTime) / 60000;
  const wpm = Math.round((promptLength / 5) / timeMinutes) || 0;
  const accuracy = Math.round(((promptLength - errors) / promptLength) * 100) || 0;
  return { wpm, accuracy, errors, progress: 100 };
};