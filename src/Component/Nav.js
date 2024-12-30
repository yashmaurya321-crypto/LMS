import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import the useNavigate hook for navigation
import '../Css/Nav.css';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To store login state
  const [isScrolled, setIsScrolled] = useState(false);
  const [userRole, setUserRole] = useState(''); // To store the user role
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    const user = localStorage.getItem('user');

    // If user info is available, parse it and set login state and role
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserRole(parsedUser.role);
    }

    // Function to check scroll position and change navbar style
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle the profile icon click
  const handleProfileClick = () => {
    if (!isLoggedIn) {
      // If not logged in, navigate to login page
      navigate('/login');
    } else {
      // If logged in, navigate based on user role
      if (userRole === 'admin') {
        navigate('/adminDashbord');
      } else if (userRole === 'student') {
        navigate('/studentDashbord');
      } else {
        // Fallback in case userRole is not admin or student
        navigate('/');
      }
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'bg-scrolled' : 'bg-transparent'} sticky-top`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Aligning the navbar links to the right using ms-auto */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
         
            <li className="nav-item">
              <Link to="/course" className="nav-link">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>

            {/* Conditionally render login button or profile logo */}
            <li className="nav-item">
              {isLoggedIn ? (
                <div className="nav-link" onClick={handleProfileClick}>
                  <div className="profile-logo">
                    <FaUser className="profile-logo-icon" />
                  </div>
                </div>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
