import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Home from './Pages/Home';  
import Layout from './Component/Layout';
import About from './Pages/About';
import Course from './Pages/Course';
import Contact from './Pages/Contact';
import CourseDetail from './Pages/CourseDetail';
import Login from './Pages/Login';
import { login } from './redux/UserReducer';
import { useDispatch } from 'react-redux';
import Register from './Pages/Register';
import StudentDashbord from './Pages/StudentDashbord';
import AdminDashbord from './Pages/AdminDashbord';
import store from './redux/store';
import customaxios from './Component/Customaxios';
import { Provider } from 'react-redux';
import CourseContent from './Pages/CourseContent';
function App() {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await customaxios.get('/api/user');
      dispatch(login(res.data));
    
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
 useEffect(()=>{
const user = localStorage.getItem('user');
if(!user){
  getUser();
}else{
  dispatch(login(JSON.parse(user)));
}
 },[])


  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="course" element={<Course />} />
              <Route path="contact" element={<Contact />} />
              <Route path="courseDetail" element={<CourseDetail />} />
              <Route path="studentDashbord" element={<StudentDashbord />} />
              <Route path="adminDashbord" element={<AdminDashbord />} />
              <Route path='courseContent' element={<CourseContent/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
