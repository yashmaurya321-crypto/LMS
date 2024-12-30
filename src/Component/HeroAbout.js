import React from 'react';
import { FaArrowRight } from 'react-icons/fa'; // Importing the icon
import img1 from '../assets/banner.jpeg';
import '../Css/HeroAbout.css';

function HeroAbout() {
  return (
    <div className="section-container">
      <div className="content-container">
        <div className="heading-container">
          <h1 className="heading-title">About Us</h1>
          <div className="line-container">
            <div className="line1"></div>
            <div className="line2"></div>
          </div>
        </div>
        <p className="about-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
        </p>
        <button className="more-button">
          More <FaArrowRight /> {/* Using React Icon */}
        </button>
      </div>
      <div className="video-container">
        <video
          controls
          poster={img1}
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default HeroAbout;
