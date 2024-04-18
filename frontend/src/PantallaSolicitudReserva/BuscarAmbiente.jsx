import React, { useState, useEffect } from "react";
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

const informacion = [
  { id: 1, nombre: "691A", capacidad: 100, tipo: "Aula", planta: "1", servicios: 'Data display', },
  { id: 2, nombre: "691B", capacidad: 110, tipo: "Aula", planta: "1", servicios: 'Data display', },
  { id: 3, nombre: "691C", capacidad: 90, tipo: "Aula", planta: "1", servicios: 'Data display', },
  { id: 4, nombre: "692A", capacidad: 120, tipo: "Aula", planta: "2", servicios: 'Data display', },
  { id: 5, nombre: "692B", capacidad: 125, tipo: "Aula", planta: "2", servicios: 'Data display', },
  { id: 6, nombre: "693C", capacidad: 125, tipo: "Auditorio", planta: "3", servicios: 'Data display' },
  { id: 7, nombre: "693A", capacidad: 125, tipo: "Auditorio", planta: "3", servicios: 'compu' },
];
//PARA BACKEND -----------------*********************************-----------------------------------------
//acá cambiar informacion por datos cargados reales de los ambientes, no importa si tienen más atributos

const tipos =[
  {value: "10", label: "Aula"},
  {value: "20", label: "Auditorio"},
  {value: "30", label: "Laboratorio"},
];

const opcionesHorario = [
  { value: "10", label: "06:45-08:15" },
  { value: "20", label: "08:15-09:45" },
  { value: "30", label: "09:45-11:15" },
  { value: "40", label: "11:15-12:45" },
  { value: "50", label: "12:45-14:15" },
  { value: "60", label: "14:15-15:45" },
  { value: "70", label: "15:45-17:15" },
  { value: "80", label: "17:15-18:45" },
  { value: "90", label: "18:45-20:15" },
  { value: "100", label: "20:30-21:45" },
];

const BusquedaAmbiente = () => {
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroHorario, setFiltroHorario] = useState('');
  const [filtroCapacidad, setFiltroCapacidad] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroServicios, setFiltroServicios] = useState('');
  const [mensajeError, cambiarMensajeError] = useState({ capacidad: "" });
  const { theme } = useTheme();
  const [informacionFinal, setInformacionFinal] = useState([]);
  let informacionAuxi = informacion;
  let tipoFinal = "";

  const funciona = () => {
    if (filtroCapacidad.trim() === "" && filtroTipo.trim() === "" && filtroServicios.trim() === "") {
      return;
    }else{
      tipoFinal = tipos.filter((tipo => tipo.value === filtroTipo));
      // informacionAuxi = (informacionFinal.length > 0 ? informacionFinal : informacion); linea triste del error
      
      if (filtroCapacidad.trim() !== "") {
        informacionAuxi = (informacionAuxi.filter((ambiente) => ambiente.capacidad >= filtroCapacidad));
      }
      
      if(filtroTipo.trim() !== ""){
        informacionAuxi = (informacionAuxi.filter((ambiente) => ambiente.tipo === tipoFinal[0].label));
      }

      if(filtroServicios.trim() !== ""){
        informacionAuxi = (informacionAuxi.filter((ambiente) => ambiente.servicios.includes(filtroServicios)));
      }

      setInformacionFinal(informacionAuxi);
    }
  }


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

  const ambientes = [
    { value: "10", label: "Aula" },
    { value: "20", label: "Auditorio" },
    { value: "30", label: "Laboratorio" },
  ];
  const defaultStyle = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      with: '100%',
      background: theme.bgmain,
    },
    container: {
      display: 'flex',
      width: '50%',
      minWidth: '600px',
      minHeight: '450px',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  };
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          minWidth="100px"
          minHeight="100px"
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
                  valor={filtroFecha}
                  cambio={setFiltroFecha}
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
    </div>
  );
};

export default BusquedaAmbiente;
