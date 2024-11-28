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
const [users, setUsers] = useState( [
  { "_id": "1", "name": "John Doe", "email": "john@example.com", "role": "student" },
  { "_id": "2", "name": "Jane Smith", "email": "jane@example.com", "role": "admin" }
]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
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
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customaxios.get('/api/user');
        console.log("From response of users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect will only run once (on component mount)



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
      formData.append('title', courseTitle); // Course title
      formData.append('description', courseDescription); // Course description
      formData.append('price', parseFloat(coursePrice)); // Price, ensuring it's a number
      formData.append('category', courseCategory); // Category
      formData.append('level', courseLevel); // Level (e.g., beginner, intermediate, advanced)
      formData.append('sections', JSON.stringify(models)); // Ensure sections data is in correct format (array of objects)
      formData.append('instructor', 'Yash'); // Instructor name (could be dynamic)
      
      // Append optional fields as JSON strings
      formData.append('whoIsThisCourseFor', JSON.stringify(whoIsThisCourseFor)); // Target audience
      formData.append('skills', JSON.stringify(skills)); // Skills
      formData.append('whatYouWillLearn', JSON.stringify(whatYouWillLearn)); // What will the course teach?
  
      // Handle image if provided
      if (image) {
        formData.append('image', image); // Image file
      }
  
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
        
      
      }
  
      // Send the FormData to the backend API
      const response = await customaxios.post('/api/course/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
        },
      });
  
      // If the course is created successfully, handle the response
      if (response.status === 201) {
        console.log('Course created successfully:', response.data);
        handleCloseModal(); // Close the modal if successful
        getCourses(); // Refresh the course list
      }
    } catch (error) {
      // Catch any error and log a message
      console.error('Failed to create course:', error.response?.data || error.message);
    }
  };
  
  

  // Data for the Sales Over Time Line Chart

  

  const handelDeleteCourse =async(id)=>{
try{
  
const res = await customaxios.delete(`/api/course/${id}`)
if(res.status === 200){
  setCourses((prevCourses) =>
    prevCourses.filter((course) => course._id !== id)
  );

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
          <h3>Yash Maurya</h3>
          <div className="profile-buttons">
            <button
              className={`profile-button ${activeTab === 'Analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('Users')}
            >
              <FaBook /> Users
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
            {courses.length > 0 ? (
        courses.map((course, index) => (
          <div key={index} className="course-card">
            <img src={course.thumbnail} alt={course.title} />
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <div className="course-details">
              <span>Price: {course.price}</span>
              <br />
              <span>Category: {course.category}</span>
              <br />
              <span>Level: {course.level}</span>
              <br />
              <span>Purchases: {course.purchases}</span>
            </div>
            <button
              className="delete-button"
              onClick={() => handelDeleteCourse(course._id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="no-courses-message" style = {{color : "black"}}>No courses available. Start adding some!</p>
      )}
    </div>
            </div>
   
        ) : activeTab === 'Users' ? (
          <div>
          <h2 className="mb-4">Users List</h2>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
        type="button"
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
  <button
    type="button"
    className="btn btn-primary"
    onClick={() => setWhoIsThisCourseFor([...whoIsThisCourseFor, ''])}
  >
    Add Target Audience
  </button>
</div>

<div className="form-group">
  <label>Skills</label>
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
        type="button"
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
  <button
    type="button"
    className="btn btn-primary"
    onClick={() => setSkills([...skills, ''])}
  >
    Add Skill
  </button>
</div>

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
        placeholder="Enter what you will learn"
      />
      <button
        type="button"
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
  <button
    type="button"
    className="btn btn-primary"
    onClick={() => setWhatYouWillLearn([...whatYouWillLearn, ''])}
  >
    Add Learning Outcome
  </button>
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