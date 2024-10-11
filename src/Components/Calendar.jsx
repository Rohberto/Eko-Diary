import React, { useState } from 'react'; 
import "../Styles/calendar.css";
function Calendar() { 
    const times = Array.from({ length: 24 }, (_, i) => `${i}:00`); const [selectedMonth, setSelectedMonth] = useState(0);
     // 0 = January 
     // Calendar generation logic for the bottom calendar 
     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
     const daysInMonth = new Date(2025, selectedMonth + 1, 0).getDate(); 
     // Days in the selected month 
     const startDay = new Date(2025, selectedMonth, 1).getDay();
      // Start day of the month
       const calendarDays = Array.from({ length: 42 }, (_, i) => { const day = i - startDay + 1; return day > 0 && day <= daysInMonth ? day : ''; }); 
      const Months = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
       const current_month = new Date().getMonth();
       const current_year = new Date().getFullYear();

      const current_day = new Date().getDay();
      const current_date = new Date().getDate();
      const tommorrow_date = new Date().getDate() + 1;
      return ( <div className="calendar-container"> 
       <div className="calendar-header"> 
        <div className="date-header"> 
            <h3>{Months[current_month]}  {current_year}</h3>
             <h4>{daysOfWeek[current_day]} {current_date}</h4> 
             </div> 
             <div className="date-header"> 
                <h3>{Months[current_month]} {current_year}</h3> 
                <h4>{daysOfWeek[current_day === 6 ? 0 : current_day + 1]}  {tommorrow_date}</h4>
                 </div> </div> 
                 <div className="calendar-body"> 
                    <div className="day-column">
                         {times.map((time, index) => 
                         ( <div key={index} className="time-slot"> {time} </div> ))}
                          <div className="coming-soon">Coming Soon</div> 
                          </div> <div className="day-column"> 
                            {times.map((time, index) => ( <div key={index} className="time-slot"></div> ))}
                             </div>
                              </div> {/* Small Calendar for reference */} 
                              <div className="small-calendar">
                                 <div className="month-switch"> 
                                    <button onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}>←</button> 
                                    <span>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][selectedMonth]} 2025</span> 
                                    <button onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}>→</button> 
                                    </div> 
                                    <div className="mini-calendar-grid"> 
                                        {daysOfWeek.map((day) => ( <div key={day} className="mini-day-header">{day}</div> ))} 
                                        {calendarDays.map((day, index) => ( <div key={index} className="mini-day-cell">{day}</div> ))} 
                                        </div> </div> </div> ); }
                                         export default Calendar;