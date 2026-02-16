import { FC } from "react";
import { TypingStats } from "../types";

interface StatsDashboardProps {
  stats: { [key: string]: TypingStats };
}

export const StatsDashboard: FC<StatsDashboardProps> = ({ stats }) => {
  const completedLessons = Object.keys(stats).length;
  const values = Object.values(stats);

  const avgWpm = values.length
    ? Math.round(
        values.reduce((acc, curr) => acc + curr.wpm, 0) / values.length,
      )
    : 0;

  const avgAccuracy = values.length
    ? Math.round(
        values.reduce((acc, curr) => acc + curr.accuracy, 0) / values.length,
      )
    : 0;

  const totalErrors = values.reduce((acc, curr) => acc + curr.errors, 0);

  return (
    <div className="stats-dashboard">
      <h3>Your Statistics</h3>
      <div className="dashboard-grid">
        <div className="card">
          <h4>Completed</h4>
          <div className="big-stat">{completedLessons}</div>
          <div className="sub-text">Lessons</div>
        </div>
        <div className="card">
          <h4>Avg WPM</h4>
          <div className="big-stat">{avgWpm}</div>
          <div className="sub-text">Words Per Minute</div>
        </div>
        <div className="card">
          <h4>Avg Accuracy</h4>
          <div className="big-stat">{avgAccuracy}%</div>
          <div className="sub-text">Accuracy Rate</div>
        </div>
        <div className="card">
          <h4>Total Errors</h4>
          <div className="big-stat">{totalErrors}</div>
          <div className="sub-text">Mistakes Made</div>
        </div>
      </div>
    </div>
  );
};
