import React, { useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import '../styles/logo.css';

const CornerLogo = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      // Add loading="eager" for faster loading
      img.loading = 'eager';
      // Add decoding="async" for better performance
      img.decoding = 'async';
    }
  }, []);

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
