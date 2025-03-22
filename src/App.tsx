import { useState } from 'react';
import './App.css';
import { TypingArea } from './components';
import { Lesson, TypingStats } from './types';
import { lessons } from './data/lessons';
import { useProgress } from './hooks/useProgress';

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [stats, setStats] = useState<{ [key: string]: TypingStats }>({});
  const { saveProgress } = useProgress();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useState(() => {
    const savedProgress = localStorage.getItem('typing-progress');
    if (savedProgress) setStats(JSON.parse(savedProgress));
  });

  const handleLessonComplete = (lesson: Lesson, newStats: TypingStats) => {
    setStats(prev => ({ ...prev, [lesson.id]: newStats }));
    saveProgress(lesson.id, newStats);
    setSelectedLesson(null); // Return to lesson selection
  };


  return (
    <div className="app">
      <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          Toggle Dark Mode
        </button>
        
        <h1>Touch Typing Tutor</h1>
      
      {!selectedLesson ? (
        // Lesson Selection Screen
        <div className="lesson-list">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              className="lesson-card"
              onClick={() => setSelectedLesson(lesson)}
            >
              <h3>{lesson.title}</h3>
              <div className="progress">
                Progress: {stats[lesson.id]?.progress || 0}%
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Typing Practice Screen
        <div className="practice-screen">
          <button onClick={() => setSelectedLesson(null)}>
            ← Back to Lessons
          </button>
          <h2>{selectedLesson.title}</h2>
          <TypingArea 
            lesson={selectedLesson} 
            onComplete={(newStats) => handleLessonComplete(selectedLesson, newStats)}
          />
        </div>
      )}
      </div>
    </div>
  )
}

export default App
