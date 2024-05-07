import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import TextInput from "../Utils/TextInput";
import Dropdown from "../Utils/Dropdown";
import RowPercentage from "../Responsive/RowPercentage";
import { useTheme } from '../Contexts/ThemeContext';
import SearchIcon from '@mui/icons-material/Search';
import TablaAmbiente from "../Components/TablaAmbienteVistaDocente";
import { IconButton } from "@mui/material";
import axios from 'axios';
import EntradaFecha from "../Utils/EntradaFecha";
import { useLocation } from 'react-router-dom';
import useAmbienteStore from '../Contexts/AmbienteStore';
import Button from '../Utils/Button';
import { URL_API } from "../services/const";

//const informacion = [
//  { id: 1, nombre: "691A", capacidad: 100, tipo: "Aula", planta: "Planta 1", ubicacion: 'ubi1', servicios: 'Data display', dia: "Lunes", periodos: "08:00-10:00, 15:45-17:15" },
//  { id: 2, nombre: "691B", capacidad: 110, tipo: "Aula", planta: "Planta 1", ubicacion: 'ubi1', servicios: 'Data display', dia: "Martes", periodos: "08:00-10:00" },
//  { id: 3, nombre: "691C", capacidad: 90, tipo: "Aula", planta: "Planta 1", ubicacion: 'ubi1', servicios: 'Data display', dia: "Miercoles", periodos: "08:00-10:00" },
//  { id: 4, nombre: "692A", capacidad: 120, tipo: "Aula", planta: "Planta 2", ubicacion: 'ubi1', servicios: 'Data display', dia: "Jueves", periodos: "08:00-18:45" },
//  { id: 5, nombre: "692B", capacidad: 125, tipo: "Aula", planta: "Planta 2", ubicacion: 'ubi1', servicios: 'Data display', dia: "Jueves", periodos: "18:00-20:00" },
//];


const tipos =[
  {value: "10", label: "Aula"},
  {value: "20", label: "Auditorio"},
  {value: "30", label: "Laboratorio"},
];

const opcionesHorario = [
  { value: "06:45-08:15", label: "06:45-08:15" },
  { value: "08:15-09:45", label: "08:15-09:45" },
  { value: "09:45-11:15", label: "09:45-11:15" },
  { value: "11:15-12:45", label: "11:15-12:45" },
  { value: "12:45-14:15", label: "12:45-14:15" },
  { value: "14:15-15:45", label: "14:15-15:45" },
  { value: "15:45-17:15", label: "15:45-17:15" },
  { value: "17:15-18:45", label: "17:15-18:45" },
  { value: "18:45-20:15", label: "18:45-20:15" },
  { value: "20:30-21:45", label: "20:30-21:45" },
];

const BusquedaAmbiente = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const seleccion = location.state?.seleccion || false;
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroHorario, setFiltroHorario] = useState("");
  const [filtroCapacidad, setFiltroCapacidad] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroServicios, setFiltroServicios] = useState("");
  const [mensajeError, cambiarMensajeError] = useState({ capacidad: "" });
  const { theme } = useTheme();
  const ambientesSeleccionados = useAmbienteStore(state => state.ambientesSeleccionados);
  const [informacionFinal, setInformacionFinal] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para indicar si se están cargando los datos
  const setAmbientesSeleccionados = useAmbienteStore(state => state.setAmbientesSeleccionados);

  const funciona = async () => {
    try {
      setLoading(true); // Indica que se está realizando la búsqueda
      // Construir el objeto de filtro
      const filtro = {};
  
      // Verificar y añadir capacidad al filtro
      if (filtroCapacidad.trim() !== "") {
        filtro.capacidad = filtroCapacidad;
      }
  
      // Verificar y añadir tipo al filtro
      if (filtroTipo.trim() !== "") {
        filtro.tipo = filtroTipo;
      }
  
      // Verificar y añadir horas al filtro
      if (filtroHorario.trim() !== "") {
        filtro.horas = filtroHorario;
      }
  
      // Verificar y añadir servicios al filtro
      if (filtroServicios.trim() !== "") {
        filtro.servicios = filtroServicios;
      }

      let diaSemana;
      let fechaAux;
      if (filtroFecha.trim() !== "") {
        diaSemana = obtenerDiaSemana(filtroFecha);
        fechaAux = filtroFecha;
      } else {
        const fechaActual = new Date();
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const diaActual = fechaActual.getDay();
        // diaSemana = diasSemana[diaActual];
        fechaAux = fechaActual.toISOString().split('T')[0];
      }
      // filtro.dia = diaSemana;
  
      // Verificar si no se ha ingresado ningún filtro
      if (Object.keys(filtro).length === 0) {
        // Mostrar un mensaje de error o simplemente retornar sin hacer nada
        console.error("Debe ingresar al menos un filtro");
        setLoading(false); // Indicar que la búsqueda ha finalizado
        return;
      }
  
      console.log("Datos enviados a la solicitud:", filtro);
  
      // Realizar la solicitud al backend con el filtro
      const response = await axios.post(`${URL_API}/ambientes-filtrar`, filtro);
      const data = response.data;
      // console.log("RESP:", data);
  
      
      // Agregar la fecha y la hora a los datos obtenidos
      const dataConFechaHora = data.map(ambiente => ({
        ...ambiente,
        horario: filtroHorario,
        fecha: fechaAux,
        
      }));

      setInformacionFinal(dataConFechaHora);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener y filtrar ambientes:', error);
      setLoading(false);
    }
  };
  
  const manejarCambioCapacidad = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      setFiltroCapacidad(valor);
    }
  };

  const validarVacioCapacidad = () => {
    if (filtroCapacidad.trim() === "") {
      cambiarMensajeError(previo => ({ ...previo, capacidad: "" }));
    }
  };

  const manejarCambioServicios = (event) => {
    setFiltroServicios(event.target.value);
  }

  const handleConfirm = () => {
    // proximamente... validaciones
    navigate(-1);
  };

  const handleReturn = () => {
    setAmbientesSeleccionados([]);
    navigate(-1);
  };

  const ambientes = [
    { value: "Aula", label: "Aula" },
    { value: "Auditorio", label: "Auditorio" },
    { value: "Laboratorio", label: "Laboratorio" },
  ];
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
      width: '60%',
      gap: '20px',
    },
    cardStyle: {
      minHeight: '600px',
      padding: '30px 50px',
      borderColor: 'blue',
      borderRadius: '15px',
      
    },
    smallCardStyle: {
      flex: '1 1 40%', 
      height: '100%',
      padding: '20px',
      borderColor: 'lightgray',
      borderRadius: '105px',
      backgroundColor: 'blue',
    },
    infoContainer: {
      overflowY: 'auto',
      maxHeight: '350px',
      padding: '10px',
    },
    infoItem: (multiple) => ({
      margin: '20px 0 0 0',
      fontSize: '16px',
      color: theme.text,
      lineHeight: multiple ? '1.3' : '2.1',
    }),
    infoTitle: {
      fontWeight: 'bold', 
    },
    buttonContainer: {
      flexDirection: 'column',
      gap: '10px',
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '20px',
    }
  };

  const obtenerDiaSemana = (fecha) => {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaObj = new Date(fecha);
    const diaSemana = fechaObj.getDay();
    return diasSemana[diaSemana];
  };

  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          style={defaultStyle.cardStyle}
          minWidth="100px"
          minHeight="600px"
          fullWidth
          alignCenter
          padding="30px 50px"
          borderColor="blue"
          borderRadius="15px"
        >
          <div
            style={{
              width: "100%",
              flexDirection: "column",
              height: "100%",
              display: "flex",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                height: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText boldText>Buscar ambientes</StyledText>
            </div>
            <RowPercentage firstChildPercentage={60} gap="10px">
              <div>
                <EntradaFecha
                  etiqueta="Fecha"
                  enCambio={setFiltroFecha}
                  mensajeValidacion=""
                />
              </div>
            <div>
              <Dropdown
                etiqueta="Horario"
                opciones={opcionesHorario}
                cambio={setFiltroHorario}
                esRequerido={true}
                />
            </div>
            </RowPercentage>
            <RowPercentage firstChildPercentage={60} gap="10px">
              <div>
                <TextInput
                  label="Capacidad Minima"
                  fullWidth={true}
                  onChange={(event) => manejarCambioCapacidad(event, "^[0-9]*$", { min: 10, max: 300 })}
                  onBlur={validarVacioCapacidad}
                  isRequired={true}
                  validationMessage={mensajeError.capacidad}
                  pattern="^[0-9]*$"
                  rango={{ min: 10, max: 300 }}
                />
              </div>
              <div>
                <Dropdown
                  etiqueta="Tipo de Ambiente"
                  opciones={ambientes}
                  cambio={setFiltroTipo}

                  esRequerido={true}
                />
              </div>
            </RowPercentage>
            <RowPercentage firstChildPercentage={10} gap="10px">
              <div>
                <TextInput
                  label="Servicios"
                  pattern='^[A-Za-z0-9, ]{0,50}$'
                  onChange={(event) => manejarCambioServicios(event)}
                />
              </div>
              <div style={defaultStyle.iconContainer} onClick={() => { }}>
                <IconButton onClick={funciona} style={{ color: "black" }}>
                  <SearchIcon style={{ fontSize: 30, color: theme.highlight }} />
                </IconButton>
              </div>
            </RowPercentage>
            <TablaAmbiente informacion={informacionFinal} />
            <div
              style={{
                height: "0%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
          </div>
        </Card>
      </div>
      {seleccion && (
        <Card
            minHeight="600px"
            minWidth="100px"
            maxWidth="270px"
            alignCenter
            padding="30px 50px"
        >
          <div
            style={{
              width: "100%",
              flex: 1,
              flexDirection: "column",
              height: "100%",
              display: "flex",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                height: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: 'center',
                padding: '10px 0'
              }}
            >
              <StyledText boldText>Ambiente Seleccionado</StyledText>
            </div>
            <div style={defaultStyle.infoContainer}>
              {ambientesSeleccionados.map((ambiente, index) => (
                <div key={index} style={defaultStyle.infoItem(ambientesSeleccionados.length > 1)}>
                  <span style={defaultStyle.infoTitle}>Tipo:</span> {ambiente.tipo}<br />
                  <span style={defaultStyle.infoTitle}>Nombre:</span> {ambiente.nombre}<br />
                  <span style={defaultStyle.infoTitle}>Capacidad:</span> {ambiente.capacidad}<br />
                  <span style={defaultStyle.infoTitle}>Planta:</span> {ambiente.planta}<br />
                  <span style={defaultStyle.infoTitle}>Ubicación:</span> {ambiente.ubicacion}<br />
                  <span style={defaultStyle.infoTitle}>Servicios:</span> {ambiente.servicios}<br />
                </div>
              ))}
            </div>
            <div style={defaultStyle.buttonContainer}>
              <Button onClick={handleConfirm}>Confirmar</Button>
              <Button onClick={handleReturn}>Cancelar</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BusquedaAmbiente;
