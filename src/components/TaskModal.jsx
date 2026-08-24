import React, { useState, useRef, useEffect } from "react";

const PRIORITIES = ["High", "Medium", "Low"];

/**
 * TaskModal
 * ---------
 * Used for both CREATE and EDIT:
 *  - `editingTask` is null            -> "Add Task" mode
 *  - `editingTask` is a task object   -> "Edit Task" mode, form is pre-filled
 *
 * useRef: focuses the Title input the instant the modal becomes visible,
 * so a keyboard-first user can start typing immediately without reaching
 * for the mouse.
 */
export default function TaskModal({ isOpen, onClose, onSubmit, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const titleInputRef = useRef(null);

  // Populate the form when opening (edit mode pre-fills, add mode resets),
  // then move focus into the title field.
  useEffect(() => {
    if (!isOpen) return;

    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
    setError("");

    // Focus after the modal has painted so the input actually exists in the DOM.
    titleInputRef.current?.focus();
  }, [isOpen, editingTask]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      titleInputRef.current?.focus();
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), priority });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      {/* stopPropagation so clicking inside the card doesn't close the modal */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-card__header">
          <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
          <button className="modal-card__close" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <label className="task-form__label" htmlFor="task-title">
            Title
          </label>
          <input
            id="task-title"
            ref={titleInputRef}
            className="task-form__input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Fix login bug"
          />

          <label className="task-form__label" htmlFor="task-description">
            Description
          </label>
          <textarea
            id="task-description"
            className="task-form__textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more detail (optional)"
            rows={4}
          />

          <label className="task-form__label" htmlFor="task-priority">
            Priority
          </label>
          <select
            id="task-priority"
            className="task-form__select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {error && <p className="task-form__error">{error}</p>}

          <div className="task-form__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {editingTask ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
