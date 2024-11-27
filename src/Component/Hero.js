import React from 'react';
import '../Css/Style.css';
import img1 from '../assets/banner.jpeg'
function Hero() {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <div
        className="jumbotron jumbotron-fluid position-relative overlay-bottom"
        style={{
          marginBottom: '90px',
          backgroundImage: img1, // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          padding: '60px 0',
        }}
      >
        <div className="container d-flex flex-column align-items-center text-center my-5 py-5">
          <h1 className="text-white mt-4 mb-4">Learn From Home</h1>
          <h1 className="text-white display-1 mb-5">Education Courses</h1>

          {/* Quote Section */}
          <div
            className="quote-section p-4"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for the quote
              borderRadius: '10px',
              color: 'white',
              maxWidth: '600px',
              textAlign: 'center',
              fontStyle: 'italic',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <p className="mb-4" style={{ fontSize: '1.5rem' }}>
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
            <footer className="blockquote-footer text-white">
              <cite title="Source Title">B.B. King</cite>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
