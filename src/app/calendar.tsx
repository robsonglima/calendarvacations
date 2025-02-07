import React from 'react';

/**
 * CalendarData: Interface to define the structure of the calendar data.
 */
interface CalendarData {
  holidays: { [date: string]: string };
  birthdays: { [date: string]: string[] };
  teamVacations: { [date: string]: string[] };
}

/**
 * calendarData: Data structure to hold holidays, birthdays, and team vacations.
 * The date is represented as 'YYYY-MM-DD'.
 */
const calendarData: CalendarData = {
  holidays: {
    '2024-01-01': 'New Year\'s Day',
    '2024-05-01': 'Labor Day',
    '2024-07-04': 'Independence Day',
    '2024-12-25': 'Christmas Day',
  },
  birthdays: {},
  teamVacations: {},
};

/**
 * getDaysInMonth: Returns the number of days in a given month for a specific year.
 * @param year - The year (e.g., 2024).
 * @param month - The month (0-11, where 0 is January).
 * @returns The number of days in the specified month.
 */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * getFirstDayOfMonth: Returns the day of the week (0-6, where 0 is Sunday) for the first day of a given month in a specific year.
 * @param year - The year (e.g., 2024).
 * @param month - The month (0-11, where 0 is January).
 * @returns The day of the week (0-6) for the first day of the specified month.
 */
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * isHoliday: Checks if a given date is a holiday.
 * @param year - The year (e.g., 2024).
 * @param month - The month (0-11, where 0 is January).
 * @param day - The day of the month.
 * @returns True if the date is a holiday, false otherwise.
 */
function isHoliday(year: number, month: number, day: number): boolean {
  const date = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return calendarData.holidays[date] !== undefined;
}

/**
 * Calendar: Renders a 12-month calendar for a specific year.
 * @param year - The year to display the calendar for.
 */
function Calendar({ year }: { year: number }) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="calendar">
      {monthNames.map((monthName, monthIndex) => (
        <div key={monthIndex} className="month">
          <h3 className="month-name">{monthName}</h3>
          <div className="weekdays">
            {dayNames.map((dayName) => (
              <div key={dayName} className="weekday">
                {dayName}
              </div>
            ))}
          </div>
          <div className="days">
            {Array.from({ length: getFirstDayOfMonth(year, monthIndex) }).map((_, index) => (
              <div key={`empty-${index}`} className="day empty"></div>
             ))}
            {Array.from({ length: getDaysInMonth(year, monthIndex) }).map((_, dayIndex) => {
              const day = dayIndex + 1;
              const fullDate = new Date(year, monthIndex, day)
              const dayOfWeek = fullDate.getDay();
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              const isDayHoliday = isHoliday(year, monthIndex, day)
              const isToday = new Date().toDateString() === fullDate.toDateString();
              let dayClassName = "day";

              if (isWeekend) {
                dayClassName += " weekend";
              }

              if (isDayHoliday) {
                dayClassName += " holiday";
              }

              if (isToday) {
                dayClassName += " today";
              }

              return (
                <div key={day} className={dayClassName}>
                  <div className='day-number'>
                  {day}                  
                  </div>
                  {isDayHoliday && <span className='holiday-name'>{calendarData.holidays[`${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`]}</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </div>
  );
}

/**
 * App: Main application component.
 */
function App() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <h1>Annual Calendar</h1>
      <Calendar year={currentYear} />
    </div>
  );
}

export default App;