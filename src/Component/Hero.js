import React from 'react';
import '../Css/Style.css';
import img1 from '../assets/banner.jpeg';

function Hero() {
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${img1})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Learn From the Best</h1>
        <p style={{ color: 'white' }}>
          Kickstart your career with our industry-recognized courses in Web Development, MERN Stack, DSA, and System Design.
        </p>
        <div className="hero-buttons">
          <button
            onClick={() => (window.location.href = '/course')}
            className="hero-button explore-button"
          >
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
