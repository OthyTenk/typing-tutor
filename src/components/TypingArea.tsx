import { FC, useEffect, useRef, useState } from "react";
import { calculateStats } from "../helpers/utils";
import { Lesson, TypingStats, PracticeMode } from "../types";
import { Keyboard } from "./Keyboard";
import { useSound } from "../hooks/useSound";

interface TypingAreaProps {
  lesson: Lesson;
  onComplete: (stats: TypingStats) => void;
  mode?: PracticeMode;
  soundEnabled?: boolean;
  soundVolume?: number;
}

export const TypingArea: FC<TypingAreaProps> = ({
  lesson,
  onComplete,
  mode = "normal",
  soundEnabled = true,
  soundVolume = 0.5,
}) => {
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
  const [timeRemaining, setTimeRemaining] = useState(60); // for timed mode
  const inputRef = useRef<HTMLInputElement>(null);
  const sounds = useSound(soundVolume, soundEnabled);

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

  // Timer for timed mode
  useEffect(() => {
    if (mode === "timed" && startTime && !isCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCompleted(true);
            const stats = calculateStats(input.length, errors, startTime);
            onComplete({ ...stats, timeElapsed: 60 });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mode, startTime, isCompleted, input.length, errors, onComplete]);

  // Handle key presses
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isCompleted) return; // Don't process keys after completion

      const expectedChar = lesson.prompt[input.length];
      const typedChar = e.key;

      if (e.key === "Backspace") {
        // Only allow backspace in certain modes
        if (mode !== "race") {
          setInput((prev) => prev.slice(0, -1));
        }
        return;
      }

      if (!expectedChar) return;

      if (typedChar === expectedChar) {
        setInput((prev) => prev + typedChar);
        setCurrentKey({ key: typedChar.toUpperCase(), time: Date.now() });
        setErrorKey({ key: "", time: 0 });
        sounds.correct();
      } else {
        setErrors((prev) => prev + 1);
        setErrorKey({ key: typedChar.toUpperCase(), time: Date.now() });
        sounds.error();
      }

      if (!startTime) setStartTime(Date.now());
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [input, lesson.prompt, startTime, isCompleted, mode, sounds]);

  // Check lesson completion
  useEffect(() => {
    if (input.length === lesson.prompt.length && startTime && !isCompleted) {
      setIsCompleted(true);
      const timeElapsed = (Date.now() - startTime) / 1000;
      const stats = calculateStats(lesson.prompt.length, errors, startTime);
      sounds.complete();
      onComplete({ ...stats, timeElapsed });
    }
  }, [
    input.length,
    lesson.prompt.length,
    startTime,
    isCompleted,
    errors,
    onComplete,
    sounds,
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

      {/* Timer for timed mode */}
      {mode === "timed" && startTime && (
        <div className="timer-display">
          <span className="timer-icon">⏱️</span>
          <span className="timer-value">{timeRemaining}s</span>
        </div>
      )}

      {/* Progress bar for race mode */}
      {mode === "race" && (
        <div className="race-progress">
          <div
            className="race-progress-bar"
            style={{
              width: `${(input.length / lesson.prompt.length) * 100}%`,
            }}
          />
        </div>
      )}

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
