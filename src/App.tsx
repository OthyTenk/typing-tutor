import { useEffect, useState } from "react";
import "./App.css";
import {
  AppHeader,
  LessonCard,
  PracticeHeader,
  TypingArea,
  ResultsModal,
  StatsDashboard,
} from "./components";
import { lessons } from "./data/lessons";
import { useProgress } from "./hooks/useProgress";
import { Lesson, TypingStats } from "./types";

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [stats, setStats] = useState<{ [key: string]: TypingStats }>({});
  const [modalStats, setModalStats] = useState<TypingStats | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { saveProgress } = useProgress();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem("typing-progress");
    if (savedProgress) setStats(JSON.parse(savedProgress));
  }, []);

  const handleLessonComplete = (lesson: Lesson, newStats: TypingStats) => {
    setStats((prev) => ({ ...prev, [lesson.id]: newStats }));
    saveProgress(lesson.id, newStats);
    setModalStats(newStats);
  };

  const handleRetry = () => {
    setModalStats(null);
    setRetryCount((prev) => prev + 1);
  };

  const handleMenu = () => {
    setModalStats(null);
    setSelectedLesson(null);
  };

  const handleNext = () => {
    if (!selectedLesson) return;
    const currentIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
    const nextLesson = lessons[currentIndex + 1];
    if (nextLesson) {
      setModalStats(null);
      setSelectedLesson(nextLesson);
      setRetryCount(0);
    } else {
      handleMenu();
    }
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <AppHeader onToggleTheme={() => setIsDarkMode((prev) => !prev)} />

      {!selectedLesson ? (
        // Lesson Selection Screen
        <div className="lesson-list">
          <StatsDashboard stats={stats} />
          <div className="lessons-grid">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                progress={stats[lesson.id]?.progress || 0}
                onSelectedLesson={() => {
                  setSelectedLesson(lesson);
                  setRetryCount(0);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        // Typing Practice Screen
        <div className="practice-screen">
          <PracticeHeader
            title={selectedLesson.title}
            handleButtonAction={handleMenu}
          />

          <TypingArea
            key={`${selectedLesson.id}-${retryCount}`}
            lesson={selectedLesson}
            onComplete={(newStats) =>
              handleLessonComplete(selectedLesson, newStats)
            }
          />
        </div>
      )}

      {modalStats && selectedLesson && (
        <ResultsModal
          stats={modalStats}
          lesson={selectedLesson}
          onRetry={handleRetry}
          onNext={handleNext}
          onMenu={handleMenu}
        />
      )}
    </div>
  );
}

export default App;
