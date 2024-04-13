import React, { useState } from "react";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import TextInput from "../Utils/TextInput";
import Dropdown from "../Utils/Dropdown";
import RowPercentage from "../Responsive/RowPercentage";
import { useTheme } from '../Contexts/ThemeContext';
import SearchIcon from '@mui/icons-material/Search';
import TablaAmbiente from "../Components/TablaAmbienteVistaDocente";

const BusquedaAmbiente = () => {
  const [filtroCapacidad, setFiltroCapacidad] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroServicios, setFiltroServicios] = useState('');
  const [mensajeError, cambiarMensajeError] = useState({ capacidad: "" });
  const { theme } = useTheme();

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
      borderRadius: 15, 
      border: `2px solid ${theme.secondary}`
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
                <TextInput
                  label="Capacidad"
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
                  onChange={(event) => setFiltroServicios(event.target.value)}
                />
              </div>
              <div style={defaultStyle.iconContainer} onClick={()=>{}}>
                <SearchIcon style={{ fontSize: 30, color: theme.highlight }} />
              </div>
            </RowPercentage>
            <TablaAmbiente />
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
