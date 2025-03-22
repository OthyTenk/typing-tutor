import { Lesson } from "./types";
import { generatePrompt } from "./helpers/utils";

export const lessons: Lesson[] = [
  // Home Row
  {
    id: "home-row",
    title: "Home Row (ASDFJKL;)",
    keys: ["A", "S", "D", "F", "J", "K", "L", ";"],
    prompt: generatePrompt(["A", "S", "D", "F", "J", "K", "L", ";"], 20),
    row: "home",
  },
  // Top Row
  {
    id: "top-row",
    title: "Top Row (QWERTYUIOP)",
    keys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    prompt: generatePrompt(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], 25),
    row: "top",
  },
  // Bottom Row
  {
    id: "bottom-row",
    title: "Bottom Row (ZXCVBNM,./)",
    keys: ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
    prompt: generatePrompt(["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"], 25),
    row: "bottom",
  },
];