import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startOfWeek, addDays, addMonths, format, isSameDay } from 'date-fns';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import useCalendarStore from '../Contexts/CalendarioStore';

const CalendarStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const RowStyles = styled.div`
  display: flex;
  width: 100%;
`;

const CellStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: 1px solid #EAEAEA;
  min-height: 35px;
  cursor: pointer;
  &:hover {
    border: 1px solid #3661EB;
  }
`;

const HeaderStyles = styled(CellStyles)`
  color: #55555D;
  font-weight: bold;
  text-align: center;
`;

const ButtonStyles = styled.button`
  cursor: pointer;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const MonthIndicatorStyles = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px 0;
`;

const Calendar = ({ schedule, aula }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const navigate = useNavigate();
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const hours = ['06:45', '08:15', '09:45', '11:15', '12:45', '14:15', '15:45', '17:15', '18:45', '20:15', '21:45'];

  const { setAula, setDia, setHora } = useCalendarStore((state) => ({
    setAula: state.setAula,
    setDia: state.setDia,
    setHora: state.setHora
  }));

  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const onCellClick = (day, hour, isReserved) => {
    if (!isReserved) {
      setAula(aula);
      setDia(format(addDays(currentWeekStart, days.indexOf(day)), 'yyyy-MM-dd'));
      setHora(hour);
      console.log(`Aula: ${aula}, Día: ${day}, Hora: ${hour}`);
      navigate('/solicitud');
    }
  };

  return (
    <CalendarStyles>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <ButtonStyles onClick={goToPreviousMonth}>{"<<"}</ButtonStyles>
        <ButtonStyles onClick={goToPreviousWeek}>{"<"}</ButtonStyles>
        <MonthIndicatorStyles>{format(currentDate, 'MMMM yyyy')}</MonthIndicatorStyles>
        <ButtonStyles onClick={goToNextWeek}>{">"}</ButtonStyles>
        <ButtonStyles onClick={goToNextMonth}>{">>"}</ButtonStyles>
      </div>
      <RowStyles>
        <HeaderStyles>Hora</HeaderStyles>
        {days.map((day, index) => {
          const date = addDays(currentWeekStart, index);
          return (
            <HeaderStyles key={day} style={{ backgroundColor: isSameDay(date, new Date()) ? '#DFF2FD' : 'transparent' }}>
              {`${day}`}
              <br />
              {`${format(date, 'dd')}`}
            </HeaderStyles>
          );
        })}
      </RowStyles>
      {hours.map(hour => (
        <RowStyles key={hour}>
          <HeaderStyles>{hour}</HeaderStyles>
          {days.map((day, index) => {
            const dayDate = format(addDays(currentWeekStart, index), 'yyyy-MM-dd');
            const isReserved = schedule[dayDate] && schedule[dayDate].includes(hour);
            return (
              <Tooltip key={`${day}-${hour}`} title={`${day}, ${format(addDays(currentWeekStart, index), 'dd/MM/yyyy')} - ${hour} ${isReserved ? ' (Ocupado)' : ' (Disponible)'}`}>
                <CellStyles style={{ backgroundColor: isReserved ? '#F1F5FF' : 'transparent', color: isReserved ? '#55555D' : '#000' }}
                  onClick={() => onCellClick(format(addDays(currentWeekStart, index), 'dd/MM/yyyy'), hour, isReserved)}>
                  {isReserved ? 'Ocupado' : ''}
                </CellStyles>
              </Tooltip>
            );
          })}
        </RowStyles>
      ))}
    </CalendarStyles>
  );
};

export default Calendar;
