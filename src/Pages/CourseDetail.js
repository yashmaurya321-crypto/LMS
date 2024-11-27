import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import customaxios from '../Component/Customaxios';
import { useLocation } from 'react-router-dom';
function CourseDetail({ courseId }) {
  const [courseData, setCourseData] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const userInfo = useSelector((state) => state.user.userInfo); 
  const location = useLocation();

  useEffect(() => {
    // Get course data from location state when the component mounts
    const { course } = location.state || {}; 
    if (course) {
      setCourseData(course);
    }else{
      window.location.href = '/course';
    }
  }, [location.state]); 

  if (!courseData) {
    return <div>Loading...</div>;
  }
  const handleEnroll = async () => {
if(userInfo){

  try {
    // 1. Request to your backend to create Razorpay order
    const response = await customaxios.post('/api/enroll/createEnrollment', {
      courseId: courseData._id,
      amount: courseData.price * 100,
    });

    const { orderId, amount, currency, key } = response.data;

    // 2. Initialize Razorpay checkout
    const options = {
      key, // Your Razorpay key id
      amount, // Amount in paise
      currency, // Currency (INR)
      name: courseData.title,
      description: `Payment for ${courseData.title}`,
      image: courseData.thumbnail,
      order_id: orderId,
      handler: async (response) => {
        // Handle success response here (after successful payment)
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        // 3. Send payment details to backend to verify and enroll the student
       const res =  await customaxios.post('/api/enroll/verifyEnrollment', {
          courseId: courseData._id,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          signature: razorpay_signature,
        });
        if(res.status === 201){
          try {
            const user = await customaxios.get('/api/user');
            localStorage.setItem('user', JSON.stringify(user.data));
            window.location.reload();
            alert('Payment successful and you are enrolled in the course!');
          } catch (error) {
            console.error('Error fetching user data:', error.response?.data || error.message);
            alert('Failed to retrieve user data after payment.');
          }
        }else{
          alert('Payment failed. Please try again.');
        }
      
       
      },
      
    };

    // Initialize Razorpay payment window
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Error in enrollment: ", error);
    alert("Error occurred. Please try again!");
  }

}else{
window.location.href = '/login';
}    
  };
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif',  margin: '0 auto', padding: '20px' }}>
      
      {/* Course Banner */}
      <div style={{
        position: 'relative',
        height: '450px',
        width: '100%',
        backgroundImage: `url(${courseData.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))',
          animation: 'fadeInOverlay 2s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box',
        }}>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <h1 style={{
    color: '#fff',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
    letterSpacing: '1px',
    lineHeight: '1.2',
    animation: 'slideIn 1.5s ease-out forwards',
  }}>
    {courseData.title}
  </h1>
  
  {/* Enrol button */}
  <button style={{
    backgroundColor: '#4598DB',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    marginTop: '20px',
    textTransform: 'uppercase',
  }} 
  onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
  onMouseOut={(e) => e.target.style.backgroundColor = '#4598DB'}
  onClick={() => handleEnroll()}
  >
    Enroll
  </button>
</div>

         
        </div>
        
      </div>

      {/* Course Details Box */}
      <div style={{
        marginTop: '40px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#333' }}>Course Details</h2>
        <ul style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
        }}>
          
          <li style={{
            padding: '10px 15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease',
          }}>
           <b>Level</b> : {courseData.level}
          </li>
          <li style={{
            padding: '10px 15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease',
          }}>
            <b>Category</b>: {courseData.category}
          </li>
          <li style={{
            padding: '10px 15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease',
          }}>
            <b>Students Enrolled</b>: {courseData.totalStudents}
          </li>
        </ul>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
        borderBottom: '2px solid #ddd',
      }}>
        <button 
          onClick={() => setActiveTab('about')}
          style={{
            padding: '15px 30px',
            background: activeTab === 'about' ? '#3498db' : '#fff',
            color: activeTab === 'about' ? '#fff' : '#333',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            borderRadius: '5px 5px 0 0',
            fontWeight: activeTab === 'about' ? 'bold' : 'normal',
            boxShadow: activeTab === 'about' ? '0 -3px 8px rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          About
        </button>
        <button 
          onClick={() => setActiveTab('modules')}
          style={{
            padding: '15px 30px',
            background: activeTab === 'modules' ? '#3498db' : '#fff',
            color: activeTab === 'modules' ? '#fff' : '#333',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            borderRadius: '5px 5px 0 0',
            fontWeight: activeTab === 'modules' ? 'bold' : 'normal',
            boxShadow: activeTab === 'modules' ? '0 -3px 8px rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          Modules
        </button>
      </div>

      {/* Content Section */}
      <div style={{
        marginTop: '20px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}>
        {activeTab === 'about' && (
          <div>
            <h3 style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#333' }}>What You Will Learn</h3>
            <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
              {courseData.whatYouWillLearn.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{item}</li>
              ))}
            </ul>
            <h3 style={{ marginBottom: '15px', marginTop: '20px', fontSize: '1.5rem', color: '#333' }}>Skills You Will Gain</h3>
            <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
              {courseData.skills.map((skill, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'modules' && (
          <div>
            <h3 style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#333' }}>Modules</h3>
            {courseData.sections.map((section, index) => (
              <div key={index} style={{
                marginBottom: '20px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f8f8f8',
                transition: 'transform 0.3s ease',
              }}>
                <h4 style={{ marginBottom: '10px', color: '#555', cursor: 'pointer' }}>{section.title}</h4>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                  {section.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} style={{ marginBottom: '10px' }}>
                      {lesson.title} 
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Who is This Course For Section */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}>
        <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '15px' }}>Who is This Course For</h3>
        <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
          {courseData.whoIsThisCourseFor.map((audience, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{audience}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseDetail;
