import { useState } from "react";
import "./App.css";
import {
  AppHeader,
  LessonCard,
  PracticeHeader,
  TypingArea,
} from "./components";
import { lessons } from "./data/lessons";
import { useProgress } from "./hooks/useProgress";
import { Lesson, TypingStats } from "./types";

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [stats, setStats] = useState<{ [key: string]: TypingStats }>({});
  const { saveProgress } = useProgress();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useState(() => {
    const savedProgress = localStorage.getItem("typing-progress");
    if (savedProgress) setStats(JSON.parse(savedProgress));
  });

  const handleLessonComplete = (lesson: Lesson, newStats: TypingStats) => {
    setStats((prev) => ({ ...prev, [lesson.id]: newStats }));
    saveProgress(lesson.id, newStats);
    setSelectedLesson(null); // Return to lesson selection
  };

  return (
    <div className="app">
      <div className={`app ${isDarkMode ? "dark" : "light"}`}>
        <AppHeader onToggleTheme={() => setIsDarkMode((prev) => !prev)} />

        {!selectedLesson ? (
          // Lesson Selection Screen
          <div className="lesson-list">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                progress={stats[lesson.id]?.progress || 0}
                onSelectedLesson={() => setSelectedLesson(lesson)}
              />
            ))}
          </div>
        ) : (
          // Typing Practice Screen
          <div className="practice-screen">
            <PracticeHeader
              title={selectedLesson.title}
              handleButtonAction={() => setSelectedLesson(null)}
            />

            <TypingArea
              lesson={selectedLesson}
              onComplete={(newStats) =>
                handleLessonComplete(selectedLesson, newStats)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
