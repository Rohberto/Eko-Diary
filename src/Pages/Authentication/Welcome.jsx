import React, {useEffect} from 'react';
import WelcomeLogo from "../../Images/welcome.svg";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Welcome = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.user);
  useEffect(() => {
    setTimeout(() => {
      navigate('/homepage')
    }, 2000)
  }, [])
  return (
    <div className='WelcomeContainer'>
        <div className="welocmeImg">
        <img src={WelcomeLogo} alt="welcome Logo" className="welcomeLogo" />
        </div>
        <p>Welcome {user.name ? user.name : "name"}, You are all Done.</p>
        <div className="welcomeBtnCont"><button className="welcomeBtn" type='submit'>Homepage</button></div> 
    </div>
  )
}

export default Welcome;
