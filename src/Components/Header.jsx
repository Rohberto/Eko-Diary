import React from "react";
import Logo from "../Images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loggedOut } from "../Store/UserSlice";

const Header = () => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className='HeaderContainer'>
      <div className="headerLogo">
        <h1>EKO DIARY</h1>
      </div>

    <ul className="header_links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/create-event">Create Events</Link></li>
      <li><Link to="">About</Link></li>
      {
     !user ? ( <li><Link to="/signup">Sign Up</Link></li>) : (<li onClick={() => {
      localStorage.removeItem("user");
      dispatch(loggedOut());
     }}><a href="#">Logout</a></li>)
}
    </ul>

<div className="mobile_menu">
<div className="hamburger" onClick={() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".mobile_menu_content");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
      </div>

      <div className="mobile_menu_content">

        <ul className="mobile_header_links">
        {user && (<p>Hi, {user.name}</p>)}
      <li onClick={() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".mobile_menu_content");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}}><Link to="/">Home</Link></li>
      <li onClick={() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".mobile_menu_content");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}}><Link to="/create-event">Create Events</Link></li>
      <li onClick={() => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".mobile_menu_content");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}}><Link to="">About</Link></li>
      {
     !user ? ( <li onClick={() => {
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".mobile_menu_content");
    
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }}><Link to="/signup">Sign Up</Link></li>) :  ( <li onClick={() => {
      localStorage.removeItem("user");
      dispatch(loggedOut());
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".mobile_menu_content");
    
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }}><Link to="#">Logout</Link></li>)
}
    </ul>
      </div>
</div>
     
<div className="headerIcon">
        <img src={Logo} alt="Logo Icon" />
      </div>
    </div>
  )
}

export default Header
