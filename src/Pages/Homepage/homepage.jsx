import React, {useState} from 'react';
import  { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Calendar from "react-calendar";
import Menu from "../../Images/menu.svg";
import Calendar1 from "../../Images/calendar.svg"
import Search from "../../Images/search.svg";
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

const Homepage = () => { 
  const date = new Date();
  const {events, loading} = useSelector((state) => state.events);
  const [showCalendar, setShowCalendar] = useState(false);
const [viewLink, setViewLink] = useState(false);
  return (
    <div className='homepage-container'>
      {loading ? <div className='hour'><div class="lds-hourglass"></div></div> : (
        <>
        <p className='current-date'>{date.toDateString()}</p>
        <div class="slider__controls">

<div className="slider__pagination"></div>
</div>
    <Swiper 
    grabCursor={true}
    centeredSlides={true}
    loop={true}
    slidesPerView={1.2}
    spaceBetween={20}
    pagination={{el: '.slider__pagination', clickable: true, type: 'bullets' }}
    navigation={{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    }}
    modules={[Pagination, Navigation]}
    className="swiper_container">
      {events.map((slide) => (
        <>
           <SwiperSlide>
            <div className="slide_img_container">
            <img src={slide.image} alt="slide_image" className='slider-img'/>
            </div>
          <p className="eventName">{`${slide.name} : ${slide.state}`}</p>
         {!slide.location.isOnline && (<><p className="location">{slide.location.event_location}</p></>)}
          <div className="slider_bottom_content">

            <div className="slider_pulse">
              <div className="pulse_bars">
                <span className="bar firstbar"></span>
                <span className="bar secondbar"></span>
                <span className="bar thirdbar"></span>
                <span className="bar fourthbar"></span>
                <span className="bar fifthbar"></span>
                <span className="bar sixthbar"></span>
                <span className="bar seventhbar"></span>
                <span className="bar eightbar"></span>
                <span className="bar ninthbar"></span>
                <span className="bar tenthbar"></span>
              </div>
              <p className="pulse_text">pulse</p>
            </div>

            <div className="bottom_date">
              <p>{new Date(slide.date).getDay()}</p>
            </div>

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
          </div>
          <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
        </SwiperSlide>
        </>
      ))}
    </Swiper>

    <div className="search_category">

      <div className="category">
      <select name="categories" id="event_categories">
  <option value="entertainment">Entertainment</option>
  <option value="Education">Educational</option>
  <option value="Festival">Festival</option>
  <option value="religion">Religion</option>
</select>
      </div>

      <div className="search">
        <span className="searchIcon"><img src={Search} alt="" /></span>
        <input type="text" name="search" id="search" placeholder='Search Events' />
      </div>
    </div>
    </>)}
    </div> 
  )
}

export default Homepage;
