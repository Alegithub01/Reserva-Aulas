import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import CalendarioComp from "../Components/Calendario";
import RowPercentage from "../Responsive/RowPercentage";
import Dropdown from "../Utils/Dropdown";
import { format, addDays, startOfWeek } from 'date-fns';
import axios from 'axios';
import { URL_API } from '../services/const';

function useAmbientes() {
  const [aulas, setAulas] = useState([]);
  const [auditorios, setAuditorios] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://my-json-server.typicode.com/WilliamCallao/Fake-api/ambientes`);
        console.log(response.data);
        const data = response.data;
        const aulasFiltradas = data.filter(amb => amb.tipo === 'Aula');
        const auditoriosFiltrados = data.filter(amb => amb.tipo === 'Auditorio');
        const laboratoriosFiltrados = data.filter(amb => amb.tipo === 'Laboratorio');
        setAulas(aulasFiltradas);
        setAuditorios(auditoriosFiltrados);
        setLaboratorios(laboratoriosFiltrados);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };
    fetchData();
  }, []);
  return { aulas, auditorios, laboratorios };
}

const Calendario = () => {
  const { theme } = useTheme();
  const { aulas, auditorios, laboratorios } = useAmbientes();
  const [tipoAmbiente, setTipoAmbiente] = useState('');
  const [aulaEspecifica, setAulaEspecifica] = useState('');
  const [ambientesDropdown, setAmbientesDropdown] = useState([]);
  const [schedule, setSchedule] = useState({});
  const errorRef = useRef('');

  const handleAulaEspecificaChange = (value) => {
    setAulaEspecifica(value);
    errorRef.current = '';
    fetchSchedule(value);
  };

  const handleTipoAmbienteChange = useCallback((value) => {
    setTipoAmbiente(value);
    setAmbientesDropdown(getDropdownOptions(value));
    setAulaEspecifica('');
  }, [aulas, auditorios, laboratorios]);

  const fetchSchedule = async (aula) => {
    try {
      const [individuales, grupales] = await Promise.all([
        axios.get(`https://my-json-server.typicode.com/WilliamCallao/fake-api/solicitudes_individuales`),
        axios.get(`https://my-json-server.typicode.com/WilliamCallao/Fake-api/solicitudes_grupales`)
      ]);
      const reservas = [...individuales.data, ...grupales.  data];
      const filteredReservas = reservas.filter(reserva => reserva.nombre_ambiente.nombre === aula);
      const schedule = filteredReservas.reduce((acc, reserva) => {
        if (!acc[reserva.fecha]) {
          acc[reserva.fecha] = [];
        }
        reserva.horas.forEach(hora => {
          const inicio = hora.split('-')[0];
          acc[reserva.fecha].push(inicio);
        });
        return acc;
      }, {});
      setSchedule(schedule);
    } catch (error) {
      console.error("Error al obtener las reservas", error);
    }
  };

  const getDropdownOptions = (tipo) => {
    const mapTipoToState = {
      'aulas': aulas,
      'auditorios': auditorios,
      'laboratorios': laboratorios
    };
    const items = mapTipoToState[tipo];
    if (!items) {
      return [];
    }
    const uniqueNames = new Set(items.map(item => item.nombre));
    const options = Array.from(uniqueNames).map(nombre => ({
      value: nombre,
      label: nombre
    }));

    return options;
  };

  const defaultStyle = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      background: theme.bgmain,
    },
    container: {
      display: 'flex',
      width: '70%',
      minWidth: '700px',
      minHeight: '650px',
    },
  };

  const handleError = (message) => {
    errorRef.current = message;
    forceUpdate();
  };

  const forceUpdate = React.useReducer(bool => !bool)[1];

  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card minWidth="100px" minHeight="100px" fullWidth alignCenter padding="30px 50px" borderColor="blue" borderRadius="15px">
          <div style={{ width: "100%", flexDirection: "column", height: "100%", display: "flex", justifyContent: "space-between" }}>
            <div style={{ height: "20%", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: '15px' }}>
              <StyledText boldText>
                Disponibilidad de ambientes{aulaEspecifica ? ` (${aulaEspecifica})` : ''}
              </StyledText>
            </div>
            <RowPercentage firstChildPercentage={40} gap="10px">
              <Dropdown
                etiqueta="Tipo de Ambiente"
                opciones={[
                  { value: "laboratorios", label: "Laboratorios" },
                  { value: "aulas", label: "Aulas" },
                  { value: "auditorios", label: "Auditorio" }
                ]}
                cambio={handleTipoAmbienteChange}
              />
              <Dropdown
                etiqueta="Seleccione el Aula"
                opciones={ambientesDropdown}
                cambio={handleAulaEspecificaChange}
              />
            </RowPercentage>
            {errorRef.current && <div style={{ color: 'red', fontSize: 13 }}>{errorRef.current}</div>}
            <CalendarioComp schedule={schedule} aula={aulaEspecifica} handleError={handleError} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendario;
