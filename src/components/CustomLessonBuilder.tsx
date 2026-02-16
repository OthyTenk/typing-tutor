import { FC, useState } from "react";
import { Lesson } from "../types";

interface CustomLessonBuilderProps {
  onCreateLesson: (lesson: Lesson) => void;
  onClose: () => void;
}

export const CustomLessonBuilder: FC<CustomLessonBuilderProps> = ({
  onCreateLesson,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleCreate = () => {
    if (!title.trim() || !prompt.trim()) {
      alert("Please fill in both title and text");
      return;
    }

    const customLesson: Lesson = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      keys: [...new Set(prompt.split(""))],
      prompt: prompt.trim(),
      row: "all",
      isCustom: true,
    };

    onCreateLesson(customLesson);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal custom-lesson-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>✍️ Create Custom Lesson</h2>
        </div>

        <div className="custom-lesson-form">
          <div className="form-group">
            <label htmlFor="lesson-title">Lesson Title</label>
            <input
              id="lesson-title"
              type="text"
              placeholder="Enter lesson title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lesson-text">Practice Text</label>
            <textarea
              id="lesson-text"
              placeholder="Enter the text to practice..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              maxLength={500}
            />
            <span className="char-count">{prompt.length} / 500 characters</span>
          </div>

          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
