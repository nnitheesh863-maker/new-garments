import React, { useEffect, useRef } from 'react';
import './Garment3DAnimation.css';

const Garment3DAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 20;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-3d';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        animation-delay: ${Math.random() * 5}s;
        animation-duration: ${Math.random() * 5 + 5}s;
      `;
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className="garment-3d-container" ref={containerRef}>
      <div className="garment-stage">
        {/* 3D Garment Shape */}
        <div className="garment-3d">
          <div className="garment-body">
            <div className="garment-collar"></div>
            <div className="garment-sleeve left"></div>
            <div className="garment-sleeve right"></div>
            <div className="garment-pattern"></div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-element thread">
          <i className="fas fa-tshirt"></i>
        </div>
        <div className="floating-element needle">
          <i className="fas fa-magic"></i>
        </div>
        <div className="floating-element measure">
          <i className="fas fa-ruler"></i>
        </div>
      </div>
      
      <div className="garment-info">
        <h3>Garment Production System</h3>
        <p>AI-Powered Manufacturing Excellence</p>
      </div>
    </div>
  );
};

export default Garment3DAnimation;
