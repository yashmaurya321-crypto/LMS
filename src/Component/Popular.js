// PopularCourses.js
import React from 'react';
import CourseCard from './CourseCard.js'
import '../Css/PopularCourses.css'; // Assuming CSS file is in the same folder
import courseImage from '../assets/download.jpeg'; // Replace with actual image path

function Popular() {
  const courses = [
    {
      image: courseImage,
      title: "MERN Stack Development",
      description: "Learn the MERN stack - MongoDB, Express, React, and Node.js.",
      price: 67
    },
    {
      image: courseImage,
      title: "MERN Stack Development",
      description: "Learn the MERN stack - MongoDB, Express, React, and Node.js.",
      price: 67
    },
    {
      image: courseImage,
      title: "MERN Stack Development",
      description: "Learn the MERN stack - MongoDB, Express, React, and Node.js.",
      price: 67
    },
    {
        image: courseImage,
        title: "MERN Stack Development",
        description: "Learn the MERN stack - MongoDB, Express, React, and Node.js.",
        price: 67
      },
    
  ];

  return (
    <div className="popular-courses">
      <h4>Popular Course</h4>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            description={course.description}
            price={course.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
