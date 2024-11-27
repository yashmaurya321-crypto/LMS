import React from 'react';
import { motion } from 'framer-motion';
import HeroAbout from '../Component/HeroAbout';
import Testimonials from '../Component/Testimonials';
import img1 from '../assets/banner.jpeg';
import missionImg from '../assets/banner.jpeg'; // Add your mission image
import visionImg from '../assets/banner.jpeg';   // Add your vision image
import whyEnrollImg from '../assets/banner.jpeg'; // Add your image for why enroll section

function About() {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div
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
        initial="hidden"
        animate="visible"
        variants={fadeIn}
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

        <motion.div
          style={{ position: "relative", color: "#fff", textAlign: "center", zIndex: 1 }}
          variants={fadeInUp}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>About Us</h1>
          <h3>Home / About</h3>
        </motion.div>
      </motion.div>

      {/* About Us Section */}
      <motion.div
        style={{
          maxWidth: '1200px',
          margin: '40px auto',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          color: '#333'
        }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Who We Are</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px', color: 'black' }}>
          We are dedicated to providing top-notch education that empowers individuals to achieve their goals. Our platform is designed with the learner in mind, offering high-quality, industry-relevant courses that cater to both beginners and experts. Our mission is to make learning accessible, enjoyable, and impactful.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          padding: '50px 0'
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}
      >
        <div style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', gap: '40px' }}>
          <motion.div style={{ flex: 1 }} initial="hidden" animate="visible" variants={fadeIn}>
            <img src={missionImg} alt="Our Mission" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }} />
          </motion.div>
          <motion.div style={{ flex: 1 }} variants={fadeInUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Our Mission</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'black' }}>
              Our mission is to provide a transformative learning experience that equips learners with the skills and knowledge they need to succeed in their careers and personal endeavors. We aim to inspire lifelong learning and to make quality education accessible to all.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px 0'
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}
      >
        <div style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', gap: '40px', flexDirection: 'row-reverse' }}>
          <motion.div style={{ flex: 1 }} variants={fadeIn}>
            <img src={visionImg} alt="Our Vision" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }} />
          </motion.div>
          <motion.div style={{ flex: 1 }} variants={fadeInUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Our Vision</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'black' }}>
              We envision a world where education knows no boundaries, and where every individual has the opportunity to learn and grow at their own pace. We strive to be a leading platform in online education, continually evolving to meet the needs of a changing world.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Why Enroll with Us Section */}
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          padding: '50px 0'
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}
      >
        <div style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', gap: '40px' }}>
          <motion.div style={{ flex: 1 }} variants={fadeIn}>
            <img src={whyEnrollImg} alt="Why Enroll with Us" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }} />
          </motion.div>
          <motion.div style={{ flex: 1 }} variants={fadeInUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Why Enroll with Us</h2>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Access to high-quality courses designed by industry experts.</li>
              <li>Flexible learning options that fit into your schedule.</li>
              <li>Community support and networking opportunities.</li>
              <li>Hands-on projects that prepare you for real-world challenges.</li>
              <li>Affordable pricing with various scholarship options.</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <div style={{ marginTop: '50px' }}>
        <Testimonials />
      </div>
    </div>
  );
}

export default About;
