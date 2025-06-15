import React from 'react';
import logo from '../assets/logo.png';
import '../styles/logo.css';

const CornerLogo = () => {
  return (
    <div className="corner-logo">
      <img 
        src={logo} 
        alt="Jordan Fitness Club Logo" 
        className="rounded-full shadow-lg border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default CornerLogo;
