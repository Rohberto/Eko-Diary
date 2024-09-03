import React from 'react';
import Cavemen from "../../Images/cavemen.png";
import Saro from "../../Images/saro.png";
import Element from "../../Images/element.png";
import SVG from "../../Images/svg.svg";
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <div className='onboardingContainer'>
      <p className='intro-text'>WHAT'S HAPPENING TODAY</p>
    
    <div className='onboardingImages'>
      <div className='onboardImg onboardImg1'>
      <img src={Saro} alt="Saro" className="saro" />
      </div>
      <div className="onboardImg onboardImg2">
      <img src={Cavemen} alt="Cavemen" className="cavemen" />
      </div>
      <div className="onboardImg onboardImg3">
      <img src={Element} alt="Element" className="element" />
      </div>
     </div>

     <p className='registerP'><Link to="/signup" className="registerText">New Here? Register</Link></p>
    <img src={SVG} alt="svg" className="svg" />
    <p><Link to="/login" className='onboardingLogin'>LOGIN</Link></p>
    </div>
  )
}

export default Onboarding;
