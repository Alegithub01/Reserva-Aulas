import React from 'react';

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
  const hours = ['08:15', '09:45', '11:15', '12:45', '14:15', '15:45', '17:15', '18:45', '20:15', '21:45'];
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <div style={calendarStyles}>
      <div style={rowStyles}>
        {days.map(day => (
          <div key={day} style={{ ...cellStyles, fontWeight: 'bold' }}>{day}</div>
        ))}
      </div>
      {hours.map(hour => (
        <div key={hour} style={rowStyles}>
          {days.map(day => (
            <div
              key={`${day}-${hour}`}
              style={schedule[day] && schedule[day][hour] ? occupiedCellStyles : cellStyles}
            >
              {schedule[day] && schedule[day][hour] ? 'Ocupado' : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
