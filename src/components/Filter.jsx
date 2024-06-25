import React from 'react';
import { usePokemon } from '../context/HomeContext';

const Filter = () => {
  const { setFilter } = usePokemon();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div className="right flex">
        <select
          className="ml-2 px-4 py-2 bg-red-500 hover:bg-rose-700 text-white rounded-md"
          onChange={handleFilterChange}
        >
          <option value="none">None</option>
          <option value="lowest">Lowest Number</option>
          <option value="greatest">Greatest Number</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
