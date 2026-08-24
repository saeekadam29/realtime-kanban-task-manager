import React from "react";

// Order defines what "move left / move right" means for a given card.
const COLUMN_ORDER = ["todo", "inprogress", "completed"];
const COLUMN_LABELS = { todo: "To Do", inprogress: "In Progress", completed: "Completed" };

const PRIORITY_CLASS = {
  High: "badge--high",
  Medium: "badge--medium",
  Low: "badge--low",
};

/**
 * TaskCard
 * --------
 * Renders one task. Two ways to move a card between columns:
 *  1. Drag-and-drop (native HTML5 DnD via draggable + onDragStart)
 *  2. Fallback arrow buttons (keyboard/touch-friendly, no DnD required)
 */
export default function TaskCard({ task, onMove, onDelete, onEdit }) {
  const currentIndex = COLUMN_ORDER.indexOf(task.status);
  const prevStatus = COLUMN_ORDER[currentIndex - 1];
  const nextStatus = COLUMN_ORDER[currentIndex + 1];

  function handleDragStart(e) {
    // Store the task id so the drop target knows which card was dragged.
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
  }

  return (
    <article
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      aria-label={`Task: ${task.title}`}
    >
      <div className="task-card__top">
        <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>{task.priority}</span>
        <div className="task-card__icon-actions">
          <button
            className="icon-btn"
            title="Edit task"
            aria-label="Edit task"
            onClick={() => onEdit(task)}
          >
            ✎
          </button>
          <button
            className="icon-btn icon-btn--danger"
            title="Delete task"
            aria-label="Delete task"
            onClick={() => onDelete(task.id)}
          >
            🗑
          </button>
        </div>
      </div>

      <h3 className="task-card__title">{task.title}</h3>
      {task.description && <p className="task-card__desc">{task.description}</p>}

      <div className="task-card__footer">
        {prevStatus ? (
          <button className="link-btn" onClick={() => onMove(task.id, prevStatus)}>
            ← {COLUMN_LABELS[prevStatus]}
          </button>
        ) : (
          <span />
        )}
        {nextStatus && (
          <button className="link-btn" onClick={() => onMove(task.id, nextStatus)}>
            {COLUMN_LABELS[nextStatus]} →
          </button>
        )}
      </div>
    </article>
  );
}
