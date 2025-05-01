import React from "react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const RegionFilter = ({ onSelect }) => {
  return (
    <div className="flex justify-center my-4">
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="px-4 py-2 border rounded shadow bg-white"
        defaultValue=""
      >
        <option value="" disabled>
          🌐 Filter by Region
        </option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter;
