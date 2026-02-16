import { FC, useEffect, useRef, useState } from "react";
import { calculateStats } from "../helpers/utils";
import { Lesson, TypingStats } from "../types";
import { Keyboard } from "./Keyboard";

interface TypingAreaProps {
  lesson: Lesson;
  onComplete: (stats: TypingStats) => void;
}

export const TypingArea: FC<TypingAreaProps> = ({ lesson, onComplete }) => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [currentKey, setCurrentKey] = useState<{ key: string; time: number }>({
    key: "",
    time: 0,
  });
  const [errorKey, setErrorKey] = useState<{ key: string; time: number }>({
    key: "",
    time: 0,
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Prevent default scrolling for spacebar
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  // Handle key presses
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isCompleted) return; // Don't process keys after completion

      const expectedChar = lesson.prompt[input.length];
      const typedChar = e.key;

      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      if (!expectedChar) return;

      if (typedChar === expectedChar) {
        setInput((prev) => prev + typedChar);
        setCurrentKey({ key: typedChar.toUpperCase(), time: Date.now() });
        setErrorKey({ key: "", time: 0 });
      } else {
        setErrors((prev) => prev + 1);
        setErrorKey({ key: typedChar.toUpperCase(), time: Date.now() });
      }

      if (!startTime) setStartTime(Date.now());
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [input, lesson.prompt, startTime, isCompleted]);

  // Check lesson completion
  useEffect(() => {
    if (input.length === lesson.prompt.length && startTime && !isCompleted) {
      setIsCompleted(true);
      const stats = calculateStats(lesson.prompt.length, errors, startTime);
      onComplete(stats);
    }
  }, [
    input.length,
    lesson.prompt.length,
    startTime,
    isCompleted,
    errors,
    onComplete,
  ]);

  return (
    <div className="typing-area">
      <input
        type="text"
        ref={inputRef}
        autoFocus
        style={{ opacity: 0, position: "absolute" }} // Hide visually
        onKeyDown={(e) => e.preventDefault()} // Block default input behavior
      />
      <div className="prompt">
        {lesson.prompt.split("").map((char, index) => (
          <span
            key={index}
            className={`char 
              ${
                index < input.length
                  ? input[index] === char
                    ? "correct"
                    : "incorrect"
                  : ""
              }
              ${index === input.length ? "current" : ""}
            `}
          >
            {char}
          </span>
        ))}
      </div>
      <Keyboard
        lesson={lesson}
        currentKey={currentKey}
        expectedKey={lesson.prompt[input.length]}
        errorKey={errorKey}
      />
    </div>
  );
};
