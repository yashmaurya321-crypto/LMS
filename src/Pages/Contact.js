import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; // Import the icons from React Icons
import img1 from '../assets/banner.jpeg';
import '../Css/Contact.css';

function Contact() {
  return (
    <div className='contact-banner' style={{ position: 'relative' }}>
       <div style={{ position: 'relative', width: '100vw', height: '60vh' }}>
        <img
          src={img1}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          alt="Contact Banner"
        />
        {/* Overlay now only covers the image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(124, 166, 255, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ color: 'white', fontSize: '3rem' }}>Contact Us</h1>
        </div>
      </div>
      <div className='contact-form' style={{ display: 'flex', padding: '2rem' }}>
        {/* Left Section */}
        <div
          style={{
            backgroundColor: '#007BFF', // Blue color for the sidebar
            color: 'white',
            padding: '2rem',
            width: '35%',
            borderRadius: '8px 0 0 8px',
          }}
        >
          <h2 style = {{color : 'white'}}>Let's get in touch</h2>
          <p style={{ margin: '1rem 0', color : 'white' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div style={{ marginBottom: '1rem', color : 'white' }}>
            <p style={{ color : 'white' }}>
              <FaMapMarkerAlt style={{ marginRight: '8px' }} /> 123 Street, New York, USA
            </p>
            <p style={{ color : 'white' }}>
              <FaEnvelope style={{ marginRight: '8px' }} /> xyz@gmail.com
            </p>
            <p style={{ color : 'white' }}>
              <FaPhoneAlt style={{ marginRight: '8px' }} /> +1234567890
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '2rem',
            width: '65%',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <form>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: '#007BFF' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: '#007BFF' }}>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#007BFF' }}>Subject</label>
              <input
                type="text"
                placeholder="Subject"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#007BFF' }}>Message</label>
              <textarea
                placeholder="Message"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', height: '100px' }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#007BFF',
                color: 'white',
                padding: '0.5rem 2rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
