import React from 'react';
import { FaStar } from "react-icons/fa";

function ReviewCard({ rating, text, name, image }) {
  // Generate the stars dynamically based on the rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar key={i} style={{ color: i <= rating ? '#FFD700' : '#e0e0e0' }} />
    );
  }

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      width: '500px',
      margin: '20px'
    }}>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        {stars}
      </div>
      <p style={{ fontSize: '14px', color: '#555' }}>
        {text}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', bottom : 0 }}>
        <img src={image} alt="Reviewer's photo" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
        <h4 style={{ fontSize: '16px', color: '#333' }}>{name}</h4>
      </div>
    </div>
  );
}

export default ReviewCard;
