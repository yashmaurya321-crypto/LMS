import React, { useEffect, useState } from 'react';
import img2 from '../assets/hero.png';
import img1 from '../assets/download.jpeg';
import { useSelector } from 'react-redux';
import '../Css/StudentDashbord.css';
import { FaBook, FaCog, FaEdit, FaTrashAlt } from 'react-icons/fa';
import CourseCard from '../Component/CourseCard';
import { useNavigate } from 'react-router-dom';
import customaxios from '../Component/Customaxios';
function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('courses'); 
  const userInfo = useSelector((state) => state.user.userInfo); 
  console.log("student ", userInfo);
  const navigate = useNavigate();
  const token = localStorage.getItem('user');
  
  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
  }, [token]);

  useEffect(() => {
    if (userInfo?.role !== 'student') {
      window.location.href = '/login';
    }
  }, [userInfo]);

  const courses = [
    {
      image: img1,
      title: 'MERN Stack Development',
      description: 'Learn to build full-stack applications with MongoDB, Express, React, and Node.',
      price: '$67',
      category: 'Web Development',
      level: 'Intermediate',
    },
    // Add more courses as needed
  ];
const handelLogut = async () => {
  try{
const res = await customaxios.post('/api/user/logout');
if(res.status === 200){
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  
 
  window.location.reload();


  window.location.href = '/';
}
  }catch(err){
    console.log(err);
  }
}
  return (
    <div className="dashboard-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="profile-card">
          <img src={img2} alt="Profile" className="profile-image" />
          {/* Check if userInfo is loaded and has a name */}
          <h3>{userInfo?.name || 'Loading...'}</h3>
          <div className="profile-buttons">
            <button
              className={`profile-button ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <FaBook /> Courses
            </button>
            <button
              className={`profile-button ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> Settings
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {activeTab === 'courses' ? (
          <div>
            <h2 className="section-title">Your Courses</h2>
            <div className="student-courses">
              {/* Check if enrolledCourses is null or empty */}
              {userInfo?.enrolledCourses && userInfo.enrolledCourses.length > 0 ? (
               
                userInfo.enrolledCourses.map((course, index) => (
                  <div key={index} onClick={() => navigate('/courseContent', { state: { courseData: course.courseId } })}>
                  <CourseCard                   
                    image={course.courseId.thumbnail}
                    title={course.courseId.title}
                    description={course.description}
                    price={course.price}
                  />
                  </div>
                ))
              ) : (
                // If no courses are enrolled, show a message
                <div className="no-courses-message">
                  No courses enrolled
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="settings-section">
            <h2 className="section-title">Settings</h2>
            <div className="setting-option">
              <h6>Edit</h6>
              <FaEdit />
            </div>
            <div className="setting-option" onClick={handelLogut}>
              <h6>Logout account</h6>
              <FaTrashAlt />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
