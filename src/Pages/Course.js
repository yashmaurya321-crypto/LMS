import React, { useEffect, useState } from 'react';
import '../Css/Course.css'
import img1 from '../assets/download.jpeg';
import customaxios from '../Component/Customaxios';
import img2 from '../assets/banner.jpeg';
import {useNavigate} from "react-router-dom"
import CourseCard from '../Component/CourseCard';
function Course() {
 const navigation = useNavigate()

  // State for selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
const [courses, setCourses] = useState([]);
  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const getCourses = async()=>{
    try{
    const res = await customaxios.get('/api/course/courses')
    if(res.status===200){
    setCourses(res.data.courses)
    console.log(res.data.courses)
    }
    }catch(error){
    console.log(error)
    }
    }
    useEffect(() => {
      getCourses()
    },[])
  // Handle level selection
  const handleLevelChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((lvl) => lvl !== level) : [...prev, level]
    );
  };

  // Filter courses based on selected categories and levels
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    return matchesCategory && matchesLevel;
  });

  return (
    <div>  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
      backgroundImage: `url(${img2})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative"
    }}
  >

    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(147, 197, 255, 0.53)" // #93C5FF color with 53% opacity
      }}
    ></div>

  
    <div style={{ position: "relative", color: "#fff", textAlign: "center", zIndex: 1 }}>
      <h1>Courses</h1>
      <h3 style = {{color : 'white'}}>Home / Course</h3>
    </div>
    </div>
    <div className="course-container">
      {/* Sidebar for filters */}
      <aside className="sidebar">
  <div className="filter-section">
    <h3>Course Category</h3>
    <label>
      <input
        type="checkbox"
        onChange={() => handleCategoryChange('Web Development')}
        checked={selectedCategories.includes('Web Development')}
      />
      <span></span>
      Web Development
    </label>
    <label>
      <input
        type="checkbox"
        onChange={() => handleCategoryChange('Graphic Design')}
        checked={selectedCategories.includes('Graphic Design')}
      />
      <span></span>
      Graphic Design
    </label>
    <label>
      <input
        type="checkbox"
        onChange={() => handleCategoryChange('Sales')}
        checked={selectedCategories.includes('Sales')}
      />
      <span></span>
      Sales
    </label>
    <label>
      <input
        type="checkbox"
        onChange={() => handleCategoryChange('Digital Marketing')}
        checked={selectedCategories.includes('Digital Marketing')}
      />
      <span></span>
      Digital Marketing
    </label>
    
  </div>

  <div className="filter-section">
    
   
   
    
  </div>
</aside>


      {/* Course Grid */}
      <div className="course-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div onClick={()=>navigation("/courseDetail",{ state: { course } })}>
                    <CourseCard
            key={index}
            image={course.thumbnail}
            title={course.title}
            description={course.description}
            price={course.price}
          />

            </div>
          ))
        ) : (
          <p>No courses match the selected filters.</p>
        )}
      </div>
    </div>
  </div>
  );
}

export default Course;
