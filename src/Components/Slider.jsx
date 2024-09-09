import React, {useState} from 'react';
import Calendar from "react-calendar";
import Menu from "../Images/menu.svg";
import { useDispatch, useSelector } from 'react-redux';
import Calendar1 from "../Images/calendar.svg";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
const Slider = ({slide, setModal, setCurrent}) => {
    const [showCalendar, setShowCalendar] = useState(false);
const [viewLink, setViewLink] = useState(false);
const dispatch = useDispatch();
const {user} = useSelector((state) => state.user);
let iconStyles = { color: "#E4ECFE", fontSize: "1.7em", marginLeft: "10px", borderLeft: "1px solid #E4ECFE"};
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

              {
                user._id == slide.creatorId && (
                  <div className='delete_event' onClick={() => {
                    setModal()
                   setCurrent(slide)}}>
                    <MdOutlineDeleteOutline style={iconStyles} className='delete_icon'/> 
                  </div>
                )
              }
            </div>
      
  )
}

export default Slider
