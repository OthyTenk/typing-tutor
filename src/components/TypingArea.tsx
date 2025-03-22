import { useEffect, useState } from "react";
import { Lesson, TypingStats } from "../types";
import { calculateStats } from "../helpers/utils";
import { Keyboard } from "./Keyboard";

interface TypingAreaProps {
  lesson: Lesson;
  onComplete: (stats: TypingStats) => void;
}

export const TypingArea = ({ lesson, onComplete }: TypingAreaProps) => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [currentKey, setCurrentKey] = useState("");
  const [errorKey, setErrorKey] = useState("");

  // Handle key presses
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const expectedChar = lesson.prompt[input.length]?.toUpperCase();
      const typedChar = e.key.toUpperCase();

      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        setErrors((prev) => Math.max(0, prev - 1));
        return;
      }

      if (!expectedChar) return;

      if (typedChar === expectedChar) {
        setInput((prev) => prev + typedChar);
        setCurrentKey(typedChar);
        setErrorKey("");
      } else {
        setErrors((prev) => prev + 1);
        setErrorKey(typedChar);
        setTimeout(() => setErrorKey(""), 500);
      }

      if (!startTime) setStartTime(Date.now());
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [input, lesson.prompt, startTime]);

  // Check lesson completion
  useEffect(() => {
    if (input.length === lesson.prompt.length && startTime) {
      const stats = calculateStats(lesson.prompt.length, errors, startTime);
      onComplete(stats);
    }
  }, [errors, input, lesson.prompt.length, onComplete, startTime]);

  return (
    <div className="typing-area">
      <Keyboard lesson={lesson} currentKey={currentKey} errorKey={errorKey} />
      <div className="prompt">
        {lesson.prompt.split("").map((char, index) => (
          <span
            key={index}
            className={`char 
              ${index < input.length ? (input[index] === char ? "correct" : "incorrect") : ""}
              ${index === input.length ? "current" : ""}
            `}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};