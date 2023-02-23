import React from "react";

function FilterDropdown({ options, value, onChange }) {
  return (
<select value={value} onChange={(e) => handleFilterChange(e.target.value)}>      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default FilterDropdown;
