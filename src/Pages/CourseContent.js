import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../Css/CourseContent.css';
import { useNavigate } from 'react-router-dom';
const CourseContent = () => {
  const [course, setCourse] = useState(null);
  const location = useLocation();
  const { courseData } = location.state || {};
  const navigate = useNavigate();
  useEffect(() => {
    if (!courseData) {      
        navigate('/course')
    } else {
      setCourse(courseData);
    }
  }, [courseData]);

  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);

  const handleSectionClick = (index) => {
    setSelectedSectionIndex(index);
    setSelectedLessonIndex(null); 
  };

  const handleLessonClick = (index) => {
    setSelectedLessonIndex(index);
  };

  const handleNextLesson = () => {
    if (selectedSectionIndex !== null && selectedLessonIndex !== null && course) {
      const nextLessonIndex = selectedLessonIndex + 1;
      const currentSection = course.sections[selectedSectionIndex];
      if (nextLessonIndex < currentSection.lessons.length) {
        setSelectedLessonIndex(nextLessonIndex);
      } else if (selectedSectionIndex + 1 < course.sections.length) {
        setSelectedSectionIndex(selectedSectionIndex + 1);
        setSelectedLessonIndex(0);
      }
    }
  };

  if (!course) {
    return <div>Loading course content...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <h2>{course.title}</h2>
          <div className="accordion" id="courseAccordion">
            {course.sections.map((section, sectionIndex) => (
              <div className="card" key={sectionIndex}>
                <div
                  className="card-header"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSectionClick(sectionIndex)}
                >
                  <h5 className="mb-0">{section.title}</h5>
                </div>
                {selectedSectionIndex === sectionIndex && (
                  <div className="card-body">
                    <ul className="list-group">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lessonIndex}
                          className="list-group-item"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleLessonClick(lessonIndex)}
                        >
                          {lesson.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-8">
          {selectedSectionIndex !== null && selectedLessonIndex !== null ? (
            <div>
              <h3>{course.sections[selectedSectionIndex].lessons[selectedLessonIndex].title}</h3>
              {/* Use ReactPlayer to embed YouTube videos */}
              <ReactPlayer
  key={selectedLessonIndex}  // Adding key to force re-render
  url={course.sections[selectedSectionIndex].lessons[selectedLessonIndex].videoUrl}
  className="react-player video-player"
  width="100%"
  controls={true}  // Ensure controls are visible (play, pause, fullscreen, etc.)
  playing={true}   // Optional: auto-play video when selected
/>
              <button className="btn btn-primary mt-3" onClick={handleNextLesson}>
                Next Lesson
              </button>
            </div>
          ) : (
            <p>Please select a lesson to view the content.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
