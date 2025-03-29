import { FC } from "react";
import { Lesson } from "../types";

const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  [" "],
];

interface KeyboardProps {
  lesson: Lesson;
  currentKey: string;
  expectedKey: string;
  errorKey: string;
}

export const Keyboard: FC<KeyboardProps> = ({
  lesson,
  currentKey,
  expectedKey,
  errorKey,
}) => {
  return (
    <div className="keyboard">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((key) => (
            <div
              key={key}
              className={`key 
                ${lesson.keys.includes(key) ? "active-lesson" : ""}
                ${key === currentKey ? "current-key" : ""}
                ${key === errorKey ? "error-key" : ""}
                ${key === expectedKey ? "expected-key" : ""}
                ${key === " " ? "space-key" : ""}
              `}
            >
              {key === " " ? "Space" : key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
