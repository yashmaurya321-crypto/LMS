import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import img1 from "../assets/banner.jpeg";
import "../Css/Crousal.css";

const carouselData = [
  {
    title: "Get educated online from your home",
    subtitle: "Best Online Course",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    image: img1
  },
  {
    title: "Learn at your own pace",
    subtitle: "Flexible Learning",
    description: "Discover thousands of courses from expert instructors worldwide",
    image: img1
  },
  {
    title: "Advance your career",
    subtitle: "Professional Development",
    description: "Gain new skills and certifications to boost your career prospects",
    image: img1
  }
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  return (
    <div className="carousel-container">
      {carouselData.map((slide, index) => (
        <div
          key={index}
          className="slide-container"
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
          }}
        >
          <img className="image" src={slide.image} alt={slide.title} />
          <div className="gradient"></div>
          <div className="slide-content">
            <h3 className="slide-subtitle">{slide.subtitle}</h3>
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-description">{slide.description}</p>
            <button className="sign-up-button">Sign up</button>
          </div>
        </div>
      ))}
<div style = {{display : "flex", flexDirection : "row"}}>
<button className="nav-button" onClick={prevSlide} style={{ right: 16 }}>
        <FaArrowLeft size={40} />
      </button>
      <button className="nav-button-2" onClick={nextSlide} style={{ right: 16 }}>
        <FaArrowRight size={40} />
      </button>
</div>
      
    </div>
  );
};

export default Carousel;
