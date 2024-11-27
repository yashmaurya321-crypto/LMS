import React, { useEffect, useState } from 'react';
import img2 from '../assets/hero.png';
import img1 from '../assets/download.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/StudentDashbord.css';
import { FaBook, FaCog, FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import { Modal, Button } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import customaxios from '../Component/Customaxios';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function AdminDashbord() {
  const [activeTab, setActiveTab] = useState('courses');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // State for the course creation form
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [models, setModels] = useState([]);
  const [image, setimage] = useState(null);
  const [whoIsThisCourseFor, setWhoIsThisCourseFor] = useState(['']);
  const [skills, setSkills] = useState(['']);
  const [whatYouWillLearn, setWhatYouWillLearn] = useState(['']);
  const [courses, setCourses] = useState([
    {
      image: img1,
      title: 'MERN Stack Development',
      description: 'Learn to build full-stack applications with MongoDB, Express, React, and Node.',
      price: '$67',
      category: 'Web Development',
      level: 'Intermediate',
      purchases: 50,
      monthlySales: [10, 15, 8, 20, 18, 30, 25, 40, 22, 35, 45, 50],
    },
    
  ]);
  useEffect(() => {
    const user = localStorage.getItem('user');
    
    if (user) {
      const parsedUser = JSON.parse(user);
      
      if (parsedUser.role !== 'admin') {
        navigate('/');
      }
    } else {
      navigate('/login'); 
    }
  }, [navigate]);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    
    resetForm();
  };
const getCourses = async()=>{
try{
const res = await customaxios.get('/api/course/courses')
if(res.status===200){
setCourses(res.data.courses)
}
}catch(error){
console.log(error)
}
}
useEffect(() => {
  getCourses()
},[])
  const resetForm = () => {
    setCourseTitle('');
    setCourseDescription('');
    setCoursePrice('');
    setCourseCategory('');
    setCourseLevel('');
    setModels([]);
  };

  // Add a new model to the course
  const addModel = () => {
    setModels([...models, { title: '', lessons: [] }]);
  };

  // Update a model's title
  const updateModelTitle = (index, title) => {
    const newModels = [...models];
    newModels[index].title = title;
    setModels(newModels);
  };

  // Add a new lesson to a specific model
  const addLesson = (modelIndex) => {
    const newModels = [...models];
    newModels[modelIndex].lessons.push({ 
      title: '', // Changed from 'name'
      videoUrl: '', 
      description: '' 
    });
    setModels(newModels);
  };
  // Update a lesson's details
  const updateLesson = (modelIndex, lessonIndex, field, value) => {
    const newModels = [...models];
    newModels[modelIndex].lessons[lessonIndex][field] = value;
    setModels(newModels);
  };

  // Save new course
  const handleSaveCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', courseTitle);
      formData.append('description', courseDescription);
      formData.append('price', parseFloat(coursePrice));
      formData.append('category', courseCategory);
      formData.append('level', courseLevel);
      formData.append('sections', JSON.stringify(models)); // Ensure this matches backend expectation
      formData.append('instructor', 'Yash');
      
      // Append arrays as JSON strings
      formData.append('whoIsThisCourseFor', JSON.stringify(whoIsThisCourseFor));
      formData.append('skills', JSON.stringify(skills));
      formData.append('whatYouWillLearn', JSON.stringify(whatYouWillLearn));
      
      if (image) {
        formData.append('image', image);
      }
  
      const response = await customaxios.post('/api/course/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        console.log('Course created successfully:', response.data);
        handleCloseModal();
        getCourses(); // Refresh the course list
      }
    } catch (error) {
      console.error('Failed to create course:', error.response?.data || error.message);
    }
  };
  
  const chartData = {
    labels: courses.map(course => course.title),
    datasets: [
      {
        label: 'Number of Purchases',
        data: courses.map(course => course.purchases),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Courses Purchase Analytics',
      },
    },
  };

  // Data for the Sales Over Time Line Chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const salesChartData = {
    labels: months,
    datasets: courses.map(course => ({
      label: course.title,
      data: course.monthlySales,
      fill: false,
      borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
      tension: 0.3,
    })),
  };

  const salesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="profile-card">
          <img src={img2} alt="Profile" className="profile-image" />
          <h3>Yash Maurya</h3>
          <div className="profile-buttons">
            <button
              className={`profile-button ${activeTab === 'Analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('Analytics')}
            >
              <FaBook /> Analytics
            </button>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="section-title">Your Courses</h2>
              <Button variant="primary" onClick={handleShowModal}>
                <FaPlus /> Add Course
              </Button>
            </div>
            <div className="student-courses">
              {courses.map((course, index) => (
                <div key={index} className="course-card">
                  <img src={course.thumbnail} alt={course.title} />
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <div className="course-details">
                    <span>Price: {course.price}</span><br/>
                    <span>Category: {course.category}</span><br/>
                    <span>Level: {course.level}</span><br/>
                    <span>Purchases: {course.purchases}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'Analytics' ? (
          <div className="analytics-section">
            <h2 className="section-title">Courses Analytics</h2>
            
            {/* Bar Chart for Purchases */}
            <Bar data={chartData} options={chartOptions} />

            {/* Time Range Selector */}
            <div className="time-range-selector">
              <label>Start Date: </label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <label>End Date: </label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>

            {/* Line Chart for Sales Over Time */}
            <h2 className="section-title">Sales Over Time</h2>
            <Line data={salesChartData} options={salesChartOptions} />
          </div>
        ) : (
          <div className="settings-section">
            <h2 className="section-title">Settings</h2>
            <div className="setting-option">
              <h6>Edit</h6>
              <FaEdit />
            </div>
            <div className="setting-option">
              <h6>Delete account</h6>
              <FaTrashAlt />
            </div>
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* Course Basic Information */}
            <div className="form-group">
              <label>Course Title</label>
              <input
                type="text"
                className="form-control"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title"
              />
            </div>
            <div className="form-group">
              <label>Course Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Enter course description"
              ></textarea>
            </div>
            <div className="form-group">
  <label>Upload Course Image</label>
  <input
    type="file"
    className="form-control"
    accept="image/*"
    onChange={(e) => setimage(e.target.files[0])}
  />
</div>

<div className="form-group">
  <label>Who is this Course For?</label>
  {whoIsThisCourseFor.map((item, index) => (
    <div key={index} className="input-group mb-2">
      <input
        type="text"
        className="form-control"
        value={item}
        onChange={(e) => {
          const newItems = [...whoIsThisCourseFor];
          newItems[index] = e.target.value;
          setWhoIsThisCourseFor(newItems);
        }}
        placeholder="Enter target audience"
      />
      <button 
        className="btn btn-danger" 
        onClick={() => {
          const newItems = whoIsThisCourseFor.filter((_, i) => i !== index);
          setWhoIsThisCourseFor(newItems);
        }}
      >
        Remove
      </button>
    </div>
  ))}
  <Button 
    variant="secondary" 
    onClick={() => setWhoIsThisCourseFor([...whoIsThisCourseFor, ''])}
  >
    Add More
  </Button>
</div>

<div className="form-group">
        <label>Skills Required</label>
        {skills.map((item, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              value={item}
              onChange={(e) => {
                const newItems = [...skills];
                newItems[index] = e.target.value;
                setSkills(newItems);
              }}
              placeholder="Enter skill"
            />
            <button
              className="btn btn-danger"
              onClick={() => {
                const newItems = skills.filter((_, i) => i !== index);
                setSkills(newItems);
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={() => setSkills([...skills, ''])}
        >
          Add More
        </Button>
      </div>

      {/* What You Will Learn Input Section */}
      <div className="form-group">
        <label>What You Will Learn</label>
        {whatYouWillLearn.map((item, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              value={item}
              onChange={(e) => {
                const newItems = [...whatYouWillLearn];
                newItems[index] = e.target.value;
                setWhatYouWillLearn(newItems);
              }}
              placeholder="Enter learning objective"
            />
            <button
              className="btn btn-danger"
              onClick={() => {
                const newItems = whatYouWillLearn.filter((_, i) => i !== index);
                setWhatYouWillLearn(newItems);
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={() => setWhatYouWillLearn([...whatYouWillLearn, ''])}
        >
          Add More
        </Button>
      </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                placeholder="Enter course price"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Graphic Design">Graphic Design</option>

              </select>
            </div>
            <div className="form-group">
              <label>Level</label>
              <select
                className="form-control"
                value={courseLevel}
                onChange={(e) => setCourseLevel(e.target.value)}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Models Section */}
            <h4>Course Models</h4>
            {models.map((model, modelIndex) => (
              <div key={modelIndex} className="model-section">
                <div className="form-group">
                  <label>Model Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={model.title}
                    onChange={(e) => updateModelTitle(modelIndex, e.target.value)}
                    placeholder="Enter model title"
                  />
                </div>
                <h5>Lessons</h5>
                {model.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="lesson-section">
                    <div className="form-group">
                      <label>Lesson Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lesson.title}
                        onChange={(e) => updateLesson(modelIndex, lessonIndex, 'title', e.target.value)}
                        placeholder="Enter lesson name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Video URL</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lesson.videoUrl}
                        onChange={(e) => updateLesson(modelIndex, lessonIndex, 'videoUrl', e.target.value)}
                        placeholder="Enter video URL"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={lesson.description}
                        onChange={(e) => updateLesson(modelIndex, lessonIndex, 'description', e.target.value)}
                        placeholder="Enter lesson description"
                      ></textarea>
                    </div>
                  </div>
                ))}
                <Button variant="secondary" onClick={() => addLesson(modelIndex)}>
                  <FaPlus /> Add Lesson
                </Button>
                <hr />
              </div>
            ))}
            <Button variant="secondary" onClick={addModel}>
              <FaPlus /> Add Model
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveCourse}>
            Save Course
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashbord;