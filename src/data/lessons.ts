import { Lesson } from "../types";
import { generatePrompt } from "../helpers/utils";

export const lessons: Lesson[] = [
  // Home Row
  {
    id: "home-row-right",
    title: "Home Row Right (JKL;')",
    keys: ["J", "K", "L", ";", "'"],
    prompt: generatePrompt(["J", "K", "L", ";", "'"], 20),
    row: "home",
  },
  {
    id: "home-row-left",
    title: "Home Row Left (ASDF)",
    keys: ["A", "S", "D", "F"],
    prompt: generatePrompt(["A", "S", "D", "F"], 20),
    row: "home",
  },
  {
    id: "home-row-basic",
    title: "Home Row Basic (ASDFJKL;')",
    keys: ["A", "S", "D", "F", "J", "K", "L", ";", "'"],
    prompt: generatePrompt(["A", "S", "D", "F", "J", "K", "L", ";", "'"], 20),
    row: "home",
  },
  {
    id: "home-row-complete",
    title: "Home Row Complete (ASDFGHJKL;')",
    keys: ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    prompt: generatePrompt(
      ["A", "S", "D", "G", "H", "F", "J", "K", "L", ";", "'"],
      20
    ),
    row: "home",
  },
  // Top Row
  {
    id: "top-row-right",
    title: "Top Row Right (UIOP[])",
    keys: ["U", "I", "O", "P", "[", "]"],
    prompt: generatePrompt(["U", "I", "O", "P", "[", "]"], 25),
    row: "top",
  },
  {
    id: "top-row-left",
    title: "Top Row Left (QWER)",
    keys: ["Q", "W", "E", "R"],
    prompt: generatePrompt(["Q", "W", "E", "R"], 20),
    row: "top",
  },
  {
    id: "top-row-basic",
    title: "Top Row Basic (QWERUIOP[])",
    keys: ["Q", "W", "E", "R", "U", "I", "O", "P", "[", "]"],
    prompt: generatePrompt(
      ["Q", "W", "E", "R", "U", "I", "O", "P", "[", "]"],
      25
    ),
    row: "top",
  },
  {
    id: "top-row-complete",
    title: "Top Row Complete (QWERTYUIOP[])",
    keys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
    prompt: generatePrompt(
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
      25
    ),
    row: "top",
  },
  // Bottom Row
  {
    id: "bottom-row-right",
    title: "Bottom Row Right (M,./)",
    keys: ["M", ",", ".", "/"],
    prompt: generatePrompt(["M", ",", ".", "/"], 25),
    row: "bottom",
  },
  {
    id: "bottom-row-left",
    title: "Bottom Row Left (ZXCV)",
    keys: ["Z", "X", "C", "V"],
    prompt: generatePrompt(["Z", "X", "C", "V"], 25),
    row: "bottom",
  },
  {
    id: "bottom-row-basic",
    title: "Bottom Row Basic (ZXCVM,./)",
    keys: ["Z", "X", "C", "V", "M", ",", ".", "/"],
    prompt: generatePrompt(["Z", "X", "C", "V", "M", ",", ".", "/"], 25),
    row: "bottom",
  },
  {
    id: "bottom-row-complete",
    title: "Bottom Row Complete (ZXCVBNM,./)",
    keys: ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
    prompt: generatePrompt(
      ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
      25
    ),
    row: "bottom",
  },
];
