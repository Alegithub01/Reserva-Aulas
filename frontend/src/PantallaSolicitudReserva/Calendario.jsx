import { useState, useEffect } from 'react';
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import CalendarioComp from "../Components/Calendario";
import RowPercentage from "../Responsive/RowPercentage";
import Dropdown from "../Utils/Dropdown";
import { useCallback } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

function useAmbientes() {
  const [aulas, setAulas] = useState([]);
  const [auditorios, setAuditorios] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // OBTENER DATOS DEL BACKEND
      // SE NECESITAN LOS AMBIENTES REGISTRADOS
      // Y TODAS LAS RESERVAS
        
      const data = [
        {
          nombre: "690C",
          capacidad: 23,
          tipo: "Aula",
          planta: 0,
          ubicacion: "Edif. Nuevo",
          servicios: [],
          dia: "Lunes",
          periodos: ["11:15-12:45"]
        },
        {
          nombre: "691C",
          capacidad: 50,
          tipo: "Aula",
          planta: 1,
          ubicacion: "Edif. Nuevo",
          servicios: ["Data display"],
          dia: "Martes",
          periodos: ["11:15-12:45", "17:15-18:45"]
        },
        {
          nombre: "692A",
          capacidad: 100,
          tipo: "Aula",
          planta: 2,
          ubicacion: "Edif. Nuevo",
          servicios: ["Data display"],
          dia: "Miércoles",
          periodos: ["12:45-14:15"]
        },
        {
          nombre: "692A",
          capacidad: 100,
          tipo: "Aula",
          planta: 2,
          ubicacion: "Edif. Nuevo",
          servicios: ["Data display"],
          dia: "Jueves",
          periodos: ["11:15-12:45", "17:15-18:45"]
        },
        
        {
          nombre: "692A",
          capacidad: 100,
          tipo: "Aula",
          planta: 2,
          ubicacion: "Edif. Nuevo",
          servicios: ["Data display"],
          dia: "Viernes",
          periodos: ["12:45-14-15", "17:15-18:45"]
        },
        {
          nombre: "693D",
          capacidad: 300,
          tipo: "Auditorio",
          planta: 3,
          ubicacion: "Edif. Nuevo",
          servicios: ["2 Data display"],
          dia: "Miércoles",
          periodos: ["06:45-08:15", "08:15-09:45"]
        },
        {
          nombre: "690A",
          capacidad: 50,
          tipo: "Aula",
          planta: 0,
          ubicacion: "Edif. Nuevo",
          servicios: [],
          dia: "Miércoles",
          periodos: ["11:15-12:45", "18:45-20:15"]
        },
        {
          nombre: "617C",
          capacidad: 100,
          tipo: "Aula",
          planta: 0,
          ubicacion: "Dpto. Fisica",
          servicios: [],
          dia: "Lunes",
          periodos: ["17:15-18:45"]
        },
        {
          nombre: "617B",
          capacidad: 100,
          tipo: "Aula",
          planta: 0,
          ubicacion: "Dpto. Fisica",
          servicios: [],
          dia: "Jueves",
          periodos: ["11:15-12:45"]
        },
        {
          nombre: "652",
          capacidad: 50,
          tipo: "Aula",
          planta: 0,
          ubicacion: "",
          servicios: [],
          dia: "Viernes",
          periodos: ["12:45-14:15"]
        },
        {
          nombre: "LAB01",
          capacidad: 50,
          tipo: "Laboratorio",
          planta: 0,
          ubicacion: "Dpto. Inf Sis",
          servicios: ["Computadoras"],
          dia: "Lunes",
          periodos: ["11:15-12:45", "18:45-20:15"]
        },
        {
          nombre: "LAB03",
          capacidad: 50,
          tipo: "Laboratorio",
          planta: 0,
          ubicacion: "Dpto. Inf Sis",
          servicios: ["Routers"],
          dia: "Lunes",
          periodos: ["11:15-12:45"]
        },
      ];
      const aulasFiltradas = data.filter(amb => amb.tipo === 'Aula');
      const auditoriosFiltrados = data.filter(amb => amb.tipo === 'Auditorio');
      const laboratoriosFiltrados = data.filter(amb => amb.tipo === 'Laboratorio');
      setAulas(aulasFiltradas);
      setAuditorios(auditoriosFiltrados);
      setLaboratorios(laboratoriosFiltrados);
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
  
  const handleAulaEspecificaChange = (value) => {
    setAulaEspecifica(value);
  };

  const handleTipoAmbienteChange = useCallback((value) => {   
    setTipoAmbiente(value);
    setAmbientesDropdown(getDropdownOptions(value));
    setAulaEspecifica('');
  }, [aulas, auditorios, laboratorios]);

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
      with:'100%',
      background: theme.bgmain,
    },
    container: {
      display: 'flex',
      width: '70%',
      minWidth: '700px',
      minHeight: '650px',
    },
  };

const testSchedule = {
  "2024-04-12": ["06:45", "09:45", "14:15", "15:45", "21:45"],
  "2024-04-13": ["08:15", "11:15", "14:15", "17:15", "20:15"],
  "2024-04-14": ["09:45", "12:45", "15:45", "18:45"],
  "2024-04-15": ["06:45", "11:15", "14:15", "17:15", "20:15"],
  "2024-04-16": ["08:15", "09:45", "15:45", "18:45", "21:45"],
  "2024-04-17": ["11:15", "12:45", "14:15", "17:15", "21:45"],
  "2024-04-18": ["06:45", "08:15", "09:45", "15:45"],
  "2024-04-19": ["12:45", "14:15", "20:15", "21:45"],
  "2024-04-20": ["06:45", "17:15", "18:45"],
  "2024-04-21": ["08:15", "09:45", "11:15", "15:45"],
  "2024-04-22": ["12:45", "14:15", "17:15", "21:45"],
  "2024-04-23": ["06:45", "09:45", "11:15", "20:15"],
  "2024-04-24": ["08:15", "14:15", "15:45", "18:45"],
};
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card minWidth="100px" minHeight="100px" fullWidth alignCenter padding="30px 50px" borderColor="blue" borderRadius="15px">
          <div style={{ width: "100%", flexDirection: "column", height: "100%", display: "flex", justifyContent: "space-between" }}>
            <div style={{ height: "20%", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom:'15px'}}>
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
            <CalendarioComp schedule={testSchedule} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendario;