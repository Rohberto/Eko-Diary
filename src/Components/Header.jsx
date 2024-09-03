import React from "react";
import Logo from "../Images/logo.png";

const Header = () => {
  return (
    <div className='HeaderContainer'>
      <div className="headerLogo">
        <h1>EKO DIARY</h1>
      </div>

      <div className="headerIcon">
        <img src={Logo} alt="Logo Icon" />
      </div>
    </div>
  )
}

export default Header
