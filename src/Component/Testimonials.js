import React from 'react';
import '../Css/Testimonials.css';
import ReviewCard from './ReviewCard';
import img1 from '../assets/hero.png'
function Testimonials() {
  // Sample data for reviews
  const reviews = [
    {
      rating: 4,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      name: 'Yash',
      image: img1,
    },
    {
      rating: 5,
      text: 'This is an amazing product! Highly recommend to everyone.',
      name: 'John',
      image: img1,
    },
    {
      rating: 3,
      text: 'Good, but it could be improved in some areas.',
      name: 'Jane',
      image: img1,
    },
    {
      rating: 4,
      text: 'Very satisfied with the quality of the product.',
      name: 'Alice',
      image: img1,
    },
  ];

  return (
    <div className='container' style = {{marginTop : "40px"}}>
      <div className='left-side'>
        <div className="testimonial-header">
          <p className="testimonial-title">Testimonial</p>
          <h4 className="testimonial-subheading">Our students say!</h4>
        </div>
      </div>
      <div className='right-side'></div>
      <div className='reviews-container'>
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            rating={review.rating}
            text={review.text}
            name={review.name}
            image={review.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
