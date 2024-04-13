import React, { useState } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';  

const calendarStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const rowStyles = {
  display: 'flex',
  width: '100%',
};

const cellStyles = {
  display: 'flex',     
  alignItems: 'center',    
  justifyContent: 'center',
  flex: 1,
  border: '1px solid #ddd',
  minHeight: '40px',
};

const occupiedCellStyles = {
  ...cellStyles,
  backgroundColor: '#f8d7da',
};

const Calendar = ({ schedule }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const hours = ['08:15', '09:45', '11:15', '12:45', '14:15', '15:45', '17:15', '18:45', '20:15', '21:45'];

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  return (
    <div style={calendarStyles}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <button onClick={goToPreviousWeek}>{"<"}</button>
        <button onClick={goToNextWeek}>{">"}</button>
      </div>
      <div style={rowStyles}>
        {days.map((day, index) => {
          const date = addDays(currentWeekStart, index);
          return (
            <div key={day} style={{ ...cellStyles, fontWeight: 'bold' }}>
              {`${day} ${format(date, 'dd')}`}
            </div>
          );
        })}
      </div>
      {hours.map(hour => (
        <div key={hour} style={rowStyles}>
          {days.map((day, index) => {
            const dayDate = format(addDays(currentWeekStart, index), 'yyyy-MM-dd');
            return (
              <div
                key={`${day}-${hour}`}
                style={schedule[dayDate] && schedule[dayDate][hour] ? occupiedCellStyles : cellStyles}
              >
                {schedule[dayDate] && schedule[dayDate][hour] ? 'Ocupado' : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
