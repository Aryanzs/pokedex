import React from 'react';

const Next = ({ currentPage, setCurrentPage }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center my-8">
      <button
        className="px-4 py-2 rounded-l-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="px-4 py-2 rounded-r-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
        onClick={handleNextClick}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Next;
