import { FC } from "react";
import { Lesson } from "../types";
import { LeftHand } from "./LeftHand";
import { RightHand } from "./RightHand";

const KEYBOARD_LAYOUT = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Back"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift ", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", " Shift"],
  ["Ctrl", "Alt", " ", "Alt", "Ctrl"],
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
    <div>
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
      <div className="hands">
        <LeftHand nextKey={expectedKey} />
        <RightHand nextKey={expectedKey} />
      </div>
    </div>
  );
};
