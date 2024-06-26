import React from 'react';


const Footer = () => {
  return (
    <footer className="footer bg-rose-100 bg-opacity-60 backdrop-blur-lg shadow-lg border border-opacity-30 border-white text-white py-4 w-full -mb-6  z-10 animate-fade-in dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <p className="mb-2 text-rose-500 dark:text-red-500">&copy; {new Date().getFullYear()} <span className='text-rose-900 dark:text-red-500'>POKEDEX</span>. All rights reserved.</p>
        <p className="mt-2 text-rose-500 dark:text-red-500">Made with <span className="dark:text-red-500 text-rose-900 font-bold"> &lt;3 </span></p>
      </div>
    </footer>
  );
};

export default Footer;
