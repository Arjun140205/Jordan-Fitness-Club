import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/logo.css';

const CornerLogo = () => {
  const imgRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      img.loading = 'eager';
      img.decoding = 'async';
    }
  }, []);

  // Hide on auth pages — they use their own logo
  const hideOnPaths = ['/login', '/register'];
  if (hideOnPaths.includes(location.pathname)) return null;

  return (
    <div className="corner-logo">
      <img 
        ref={imgRef}
        src={logo} 
        alt="Jordan Fitness Club Logo" 
        className="transition-all duration-300 ease-out"
        style={{
          imageRendering: 'high-quality',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      />
    </div>
  );
};

export default CornerLogo;
