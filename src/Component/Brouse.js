import React from 'react';
import '../Css/Brouse.css';
import imgWebDev from '../assets/Blackguy.jpeg';

function Brouse() {
  return (
    <div className="container-fluid" style={{textAlign:'center'}}>
      <div style = {{flexDirection:'column'}}>
      <h4>Browse Online Course Category</h4>
      <div className="grid-container">
        <div className="category-card large">
          <img src={imgWebDev} alt="Programming" className="category-image" />
          <div className="overlay">
            <div className="text">Programming</div>
            <div className="subtext">45 courses</div>
          </div>
        </div>
        <div className="category-card">
          <img src={imgWebDev} alt="Web Development" className="category-image" />
          <div className="overlay">
            <div className="text">Web Development</div>
            <div className="subtext">45 courses</div>
          </div>
        </div>
        <div className="category-card">
          <img src={imgWebDev} alt="Digital Marketing" className="category-image" />
          <div className="overlay">
            <div className="text">Digital Marketing</div>
            <div className="subtext">45 courses</div>
          </div>
        </div>
        <div className="category-card">
          <img src={imgWebDev} alt="Sales" className="category-image" />
          <div className="overlay">
            <div className="text">Sales</div>
            <div className="subtext">45 courses</div>
          </div>
        </div>
        <div className="category-card">
          <img src={imgWebDev} alt="Graphic Design" className="category-image" />
          <div className="overlay">
            <div className="text">Graphic Design</div>
            <div className="subtext">45 courses</div>
          </div>
        </div>
      </div> 
      </div>
      
    </div>
  );
}

export default Brouse;
