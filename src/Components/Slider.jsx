import React, {useState} from 'react';
import Calendar from "react-calendar";
import Menu from "../Images/menu.svg";
import Calendar1 from "../Images/calendar.svg"
import { Link } from 'react-router-dom';
const Slider = ({slide}) => {
    const [showCalendar, setShowCalendar] = useState(false);
const [viewLink, setViewLink] = useState(false);
  return (
         
            <div className="bottom_icons">
              <div className="slider_menu">
                <img src={Menu} alt="menu- icon" onClick={() => setViewLink(!viewLink)}/>
                {
                  viewLink && (
                    <div className="link_event">
                    <Link to={`/event/${slide._id}`}>View Event</Link>
                  </div>
                  )
                }
      
              </div>
              
              <div className="slider_calendar">
                <img src={Calendar1} alt="menu- icon" onClick={() => setShowCalendar(!showCalendar)}/>
                <Calendar
        value={new Date(slide.date)} 
        className={showCalendar ? 'show_calendar' : 'hide_calendar'}
      />
              </div>
            </div>
      
  )
}

export default Slider
