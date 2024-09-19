import React from 'react';
import Err from "../Images/404.jpg";
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='not-found-container'>
        <div className="error_img_container">
            <img src={Err} alt="Error Image" />
        </div>

        <p className="error_link">Click on this link <Link to="/">Home</Link> to navigate to homepage.</p>
    </div>
  )
}

export default NotFoundPage;
