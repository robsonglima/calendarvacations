'use client';

import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; 
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days-of-week">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
      <div className="days-grid">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="empty-day"></div>
        ))}
        {days.map((day) => {
          const isToday =
            currentDate.getFullYear() === today.getFullYear() &&
            currentDate.getMonth() === today.getMonth() &&
            day === today.getDate();
          return (
            <div key={day} className={`day ${isToday ? 'today' : ''}`}>
              {day}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .calendar {
          width: 300px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-family: sans-serif;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #f0f0f0;
          border-bottom: 1px solid #ccc;
        }
        .days-of-week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          padding: 5px;
          background-color: #eee;
          border-bottom: 1px solid #ccc;
        }
        .days-of-week div {
          padding: 5px;
        }
        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
        }
        .day,
        .empty-day {
          padding: 10px;
          border: 1px solid #eee;
        }
        .today {
          background-color: #e0f0ff;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Calendar;