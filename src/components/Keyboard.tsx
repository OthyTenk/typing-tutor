import { FC } from "react";
import { Lesson } from "../types";
import { LeftHand } from "./LeftHand";
import { RightHand } from "./RightHand";
import { getHandInfo } from "../helpers/utils";

const KEYBOARD_LAYOUT = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Back"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift ", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", " Shift"],
  ["Ctrl", "Alt", " ", "Alt", "Ctrl"],
];

interface KeyboardProps {
  lesson: Lesson;
  currentKey: { key: string; time: number };
  expectedKey: string;
  errorKey: { key: string; time: number };
}

export const Keyboard: FC<KeyboardProps> = ({
  lesson,
  currentKey,
  expectedKey,
  errorKey,
}) => {
  const normExpectedKey = expectedKey?.toUpperCase() || "";
  const handInfo = getHandInfo(expectedKey);

  return (
    <div>
      <div className="keyboard">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((key, keyIndex) => {
              const normKey = key.toUpperCase();
              const isCurrent = normKey === currentKey.key;
              const isError = normKey === errorKey.key;

              let isExpected = normKey === normExpectedKey;

              // Highlight Shift key if required
              if (handInfo.requiresShift) {
                if (key === "Shift " && handInfo.shiftHand === "left")
                  isExpected = true;
                if (key === " Shift" && handInfo.shiftHand === "right")
                  isExpected = true;
              }

              return (
                <div
                  key={`${key}-${keyIndex}-${isCurrent ? currentKey.time : ""}-${isError ? errorKey.time : ""}`}
                  className={`key 
                  ${lesson.keys.includes(key) ? "active-lesson" : ""}
                  ${isCurrent ? "current-key" : ""}
                  ${isError ? "error-key" : ""}
                  ${isExpected ? "expected-key" : ""}
                  ${key === " " ? "space-key" : ""}
                `}
                >
                  {key.trim() === "Ctrl" ||
                  key.trim() === "Alt" ||
                  key.trim() === "Shift"
                    ? key.trim()
                    : key === " "
                      ? "Space"
                      : key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="hands">
        <LeftHand nextKey={expectedKey} handInfo={handInfo} />
        <RightHand nextKey={expectedKey} handInfo={handInfo} />
      </div>
    </div>
  );
};
