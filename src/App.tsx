import { useEffect, useState } from "react";
import "./App.css";
import {
  AppHeader,
  LessonCard,
  PracticeHeader,
  TypingArea,
  ResultsModal,
  StatsDashboard,
  AchievementsModal,
  AchievementToast,
  SettingsPanel,
  CustomLessonBuilder,
  PracticeModeSelector,
} from "./components";
import { lessons as defaultLessons } from "./data/lessons";
import { useProgress } from "./hooks/useProgress";
import { useSettings } from "./hooks/useSettings";
import { useAchievements } from "./hooks/useAchievements";
import { Lesson, TypingStats, PracticeMode } from "./types";

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [stats, setStats] = useState<{ [key: string]: TypingStats }>({});
  const [modalStats, setModalStats] = useState<TypingStats | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("normal");
  const [customLessons, setCustomLessons] = useState<Lesson[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>(defaultLessons);

  // Modals and panels
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const { saveProgress } = useProgress();
  const { settings, updateSettings } = useSettings();
  const { achievements, newlyUnlocked, checkAchievements, clearNewlyUnlocked } =
    useAchievements(stats);

  const [isDarkMode, setIsDarkMode] = useState(settings.theme === "dark");

  useEffect(() => {
    const savedProgress = localStorage.getItem("typing-progress");
    if (savedProgress) setStats(JSON.parse(savedProgress));

    // Load custom lessons
    const savedCustomLessons = localStorage.getItem("custom-lessons");
    if (savedCustomLessons) {
      const parsed = JSON.parse(savedCustomLessons);
      setCustomLessons(parsed);
      setLessons([...defaultLessons, ...parsed]);
    }
  }, []);

  useEffect(() => {
    setIsDarkMode(settings.theme === "dark");
  }, [settings.theme]);

  const handleLessonComplete = (lesson: Lesson, newStats: TypingStats) => {
    setStats((prev) => ({ ...prev, [lesson.id]: newStats }));
    saveProgress(lesson.id, newStats);
    setModalStats(newStats);

    // Check for new achievements
    setTimeout(() => {
      checkAchievements();
    }, 500);
  };

  const handleRetry = () => {
    setModalStats(null);
    setRetryCount((prev) => prev + 1);
  };

  const handleMenu = () => {
    setModalStats(null);
    setSelectedLesson(null);
    setPracticeMode("normal");
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

  const handleCreateCustomLesson = (lesson: Lesson) => {
    const updatedCustomLessons = [...customLessons, lesson];
    setCustomLessons(updatedCustomLessons);
    setLessons([...defaultLessons, ...updatedCustomLessons]);

    try {
      localStorage.setItem(
        "custom-lessons",
        JSON.stringify(updatedCustomLessons),
      );
    } catch (error) {
      console.error("Failed to save custom lesson:", error);
    }
  };

  const handleDeleteCustomLesson = (lessonId: string) => {
    const updatedCustomLessons = customLessons.filter((l) => l.id !== lessonId);
    setCustomLessons(updatedCustomLessons);
    setLessons([...defaultLessons, ...updatedCustomLessons]);

    try {
      localStorage.setItem(
        "custom-lessons",
        JSON.stringify(updatedCustomLessons),
      );
    } catch (error) {
      console.error("Failed to delete custom lesson:", error);
    }
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <AppHeader
        onToggleTheme={() => {
          const newTheme = isDarkMode ? "light" : "dark";
          setIsDarkMode(!isDarkMode);
          updateSettings({ theme: newTheme });
        }}
        onShowSettings={() => setShowSettings(true)}
        onShowAchievements={() => setShowAchievements(true)}
      />

      {!selectedLesson ? (
        // Lesson Selection Screen
        <div className="lesson-list">
          <StatsDashboard stats={stats} />

          <div className="lesson-controls">
            <button
              className="btn btn-primary"
              onClick={() => setShowCustomBuilder(true)}
            >
              ✍️ Create Custom Lesson
            </button>
            {customLessons.length > 0 && (
              <p className="custom-lesson-count">
                {customLessons.length} custom lesson
                {customLessons.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

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
                isCustom={lesson.isCustom}
                onDelete={
                  lesson.isCustom
                    ? () => handleDeleteCustomLesson(lesson.id)
                    : undefined
                }
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

          <PracticeModeSelector
            currentMode={practiceMode}
            onModeSelect={setPracticeMode}
          />

          <TypingArea
            key={`${selectedLesson.id}-${retryCount}-${practiceMode}`}
            lesson={selectedLesson}
            mode={practiceMode}
            soundEnabled={settings.soundEnabled}
            soundVolume={settings.soundVolume}
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

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showAchievements && (
        <AchievementsModal
          achievements={achievements}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {showCustomBuilder && (
        <CustomLessonBuilder
          onCreateLesson={handleCreateCustomLesson}
          onClose={() => setShowCustomBuilder(false)}
        />
      )}

      {newlyUnlocked.map((achievement, index) => (
        <AchievementToast
          key={`${achievement.id}-${index}`}
          achievement={achievement}
          onClose={clearNewlyUnlocked}
        />
      ))}
    </div>
  );
}

export default App;
