import React, { useState } from 'react';
import customaxios from '../Component/Customaxios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../redux/UserReducer'
function Login() {
  const dispach = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(''); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await customaxios.post('/api/user/login', { email, password });
      if (res.status === 200) {
        setToastMessage('Login successful');
        setToastType('success');
        setShowToast(true);
       
       localStorage.setItem("user", JSON.stringify(res.data.Data));
      
        setTimeout(() => {
          window.location.reload();
          window.location.href = '/';
         
        }, 1500);
      } else {
        setToastMessage('Invalid credentials');
        setToastType('danger');
        setShowToast(true);
      }
    } catch (error) {
      console.log(error);
      setToastMessage('An error occurred. Please try again.');
      setToastType('danger');
      setShowToast(true);
    }
  };

  // Function to hide the toast after a few seconds
  const handleToastClose = () => setShowToast(false);

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.header}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.switchPageText}>
          Don't have an account? <a href="/register" style={styles.link}>Register</a>
        </p>
      </div>

      {/* Bootstrap Toast */}
      <div
        className={`toast-container position-fixed top-0 end-0 p-3`}
        style={{ zIndex: 1055 }}
      >
        <div
          className={`toast align-items-center text-bg-${toastType} ${showToast ? 'show' : 'hide'}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              {toastMessage}
            </div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              aria-label="Close"
              onClick={handleToastClose}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  loginBox: {
    width: '400px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  button: {
    padding: '12px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  switchPageText: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
  },
};

export default Login;
