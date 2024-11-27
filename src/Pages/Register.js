import React, { useState } from 'react';
import customaxios from '../Component/Customaxios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(''); // 'success' or 'danger'
const navigation = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setToastMessage('Passwords do not match!');
      setToastType('danger');
      setShowToast(true);
      return;
    }

    try {
      const res = await customaxios.post('/api/user/register', {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        setToastMessage('User registered successfully');
        setToastType('success');
        navigation('/login')
        
      } else {
        setToastMessage('User registration failed');
        setToastType('danger');
      }
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMessage('An error occurred. Please try again.');
      setToastType('danger');
      setShowToast(true);
    }
  };

  // Function to hide the toast after a few seconds
  const handleToastClose = () => setShowToast(false);

  return (
    <div style={styles.container}>
      <div style={styles.registerBox}>
        <h2 style={styles.header}>Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="name" style={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
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
          <div style={styles.inputContainer}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.switchPageText}>
          Already have an account? <a href="/login" style={styles.link}>Login</a>
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
  registerBox: {
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

export default Register;
