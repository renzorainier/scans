import React from "react";

function FilterDropdown({ label, options, selected, handleFilterChange }) {
  return (
    <div className="filter-dropdown">
      <label>{label}</label>
      <select value={selected} onChange={(e) => handleFilterChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;
