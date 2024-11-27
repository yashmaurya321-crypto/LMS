import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import '../Css/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2>Edtech</h2>
        <p>
          Far far away, behind the word mountains, far from the countries Vokalia
          and Consonantia, there live the blind texts.
        </p>
        <div className="social-icons">
          <a href="#"><FaInstagram className="icon instagram" /></a>
          <a href="#"><FaFacebookF className="icon facebook" /></a>
          <a href="#"><FaTwitter className="icon twitter" /></a>
        </div>
      </div>

      <div className="footer-section">
        <h3>Quick link</h3>
        <ul>
          <li>➤ About</li>
          <li>➤ Contact</li>
          <li>➤ Course</li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Have a Questions?</h3>
        <ul className="contact-info">
          <li><MdLocationOn /> 203 Fake St. Mountain View, San Francisco, California, USA</li>
          <li><MdEmail /> example@gmail.com</li>
          <li><MdPhone /> 5723986498234</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
