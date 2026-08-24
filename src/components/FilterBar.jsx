import React from "react";

const PRIORITY_OPTIONS = ["All", "High", "Medium", "Low"];

/**
 * FilterBar
 * ---------
 * Controlled inputs only — search text and priority filter both live in
 * App state so useMemo there can react to them. This component has no
 * state of its own.
 */
export default function FilterBar({ searchTerm, onSearchChange, priorityFilter, onPriorityChange, resultCount }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="filter-bar__search"
        placeholder="Search tasks by title or description..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search tasks"
      />

      <select
        className="filter-bar__select"
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        aria-label="Filter by priority"
      >
        {PRIORITY_OPTIONS.map((p) => (
          <option key={p} value={p}>
            {p === "All" ? "All Priorities" : p}
          </option>
        ))}
      </select>

      <span className="filter-bar__result-count">
        <span className="counter-chip">{resultCount}</span> matching
      </span>
    </div>
  );
}
