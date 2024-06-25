import React from 'react';


const Footer = () => {
  return (
    <footer className="footer bg-rose-100 bg-opacity-60 backdrop-blur-lg shadow-lg border border-opacity-30 border-white text-white py-4 w-full z-10 animate-fade-in">
      <div className="container mx-auto text-center">
        <p className="mb-2 text-rose-500">&copy; {new Date().getFullYear()} <span className='text-rose-900'>POKEDEX</span>. All rights reserved.</p>
        <p className="mt-2 text-rose-500">Made with <span className=" text-rose-900 font-bold"> &lt;3 </span></p>
      </div>
    </footer>
  );
};

export default Footer;
