import React from 'react';
import '../Css/Contact.css'
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import img1 from '../assets/banner.jpeg';
function Contact() {
  return (
    <div>
         <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          backgroundImage: `url(${img1})`,
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
          <h1>Conatct Us</h1>
          <h3>Home / Contact us</h3>
        </div>
      </div>
      <div className="contact-container">
      {/* Left Section - Contact Information */}
      <div className="contact-info">
        <h2>Lets get in touch</h2>
        <p style = {{color: 'white'}}>We're open for any suggestion or just to have a chat</p>
        <div className="contact-details">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p style = {{color: 'white'}}>203 Fake St. Mountain View, San Francisco, California, USA</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <p style = {{color: 'white'}}>example@gmail.com</p>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <p style = {{color: 'white'}}>5723986498234</p>
          </div>
        </div>
      </div>

      {/* Right Section - Contact Form */}
      <div className="contact-form">
        <h2>Get in Touch</h2>
        <form>
          <div className="form-group">
            <div className="form-field">
              <label>Full name</label>
              <input type="text" placeholder="Name" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" placeholder="Email" />
            </div>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" placeholder="Subject" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Message"></textarea>
          </div>
        </form>
      </div>
    </div>
    </div>
   
  );
}

export default Contact;
