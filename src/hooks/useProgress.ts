import { TypingStats } from '../types';

export const useProgress = () => {
  const saveProgress = (lessonId: string, stats: TypingStats) => {
    const progress = JSON.parse(localStorage.getItem('typing-progress') || '{}');
    progress[lessonId] = stats;
    localStorage.setItem('typing-progress', JSON.stringify(progress));
  };

  const loadProgress = () => {
    return JSON.parse(localStorage.getItem('typing-progress') || '{}');
  };

  return { saveProgress, loadProgress };
};