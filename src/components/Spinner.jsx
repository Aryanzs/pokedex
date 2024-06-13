import React from 'react';
import loadingGif from '../assets/loading-gif.png';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <img
          src={loadingGif}
          alt="Loading..."
          className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-purple-500 shadow-2xl shadow-red-500"
        />
        <div className="absolute inset-0 rounded-full animate-ping shadow-2xl shadow-red-500/70"></div>
        <div className="absolute inset-0 rounded-full shadow-2xl shadow-red-500/50"></div>
      </div>
    </div>
  );
};

export default Spinner;