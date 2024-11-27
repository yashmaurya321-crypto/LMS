import React from 'react';
import img1 from '../assets/banner.jpeg';
import '../Css/Style.css';
function HeroAbout() {
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          {/* Image Column */}
          <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100"
                src={img1}
                alt="About Us"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="col-lg-7">
            <div className="section-title position-relative mb-4">
              <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                About Us
              </h6>
              <h1 className="display-4">First Choice For Online Education Anywhere</h1>
            </div>
            <p>
              Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et,
              tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore.
              Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo
              justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt magna
              dolores aliquyam dolores dolore. Amet erat amet et magna.
            </p>

            {/* Statistics Section */}
            <div className="row pt-3 mx-0">
              <div className="col-3 px-0">
                <div className="bg-success text-center p-4">
                  <h1 className="text-white" data-toggle="counter-up">
                    123
                  </h1>
                  <h6 className="text-uppercase text-white">
                    Available<span className="d-block">Subjects</span>
                  </h6>
                </div>
              </div>
              <div className="col-3 px-0">
                <div className="bg-primary text-center p-4">
                  <h1 className="text-white" data-toggle="counter-up">
                    1234
                  </h1>
                  <h6 className="text-uppercase text-white">
                    Online<span className="d-block">Courses</span>
                  </h6>
                </div>
              </div>
              <div className="col-3 px-0">
                <div className="bg-secondary text-center p-4">
                  <h1 className="text-white" data-toggle="counter-up">
                    123
                  </h1>
                  <h6 className="text-uppercase text-white">
                    Skilled<span className="d-block">Instructors</span>
                  </h6>
                </div>
              </div>
              <div className="col-3 px-0">
                <div className="bg-warning text-center p-4">
                  <h1 className="text-white" data-toggle="counter-up">
                    1234
                  </h1>
                  <h6 className="text-uppercase text-white">
                    Happy<span className="d-block">Students</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAbout;
