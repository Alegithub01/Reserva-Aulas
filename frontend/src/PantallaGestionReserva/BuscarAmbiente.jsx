import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import TextInput from "../Utils/TextInput";
import Dropdown from "../Utils/Dropdowncopy";
import RowPercentage from "../Responsive/RowPercentage";
import { useTheme } from "../Contexts/ThemeContext";
import SearchIcon from "@mui/icons-material/Search";
import TablaAmbiente from "../Components/TablaAmbienteVistaDocente";
import { IconButton } from "@mui/material";
import axios from "axios";
import EntradaFecha from "../Utils/EntradaFecha";
import { useLocation } from "react-router-dom";
import useAmbienteStore from "../Contexts/AmbienteStore";
import Button from "../Utils/Button";
import { URL_API } from "../services/const";
import Casilla2 from "../Utils/Casilla2";

//const informacion = [
//  { id: 1, nombre: "691A", capacidad: 100, tipo: "Aula", planta: "Planta 1", ubicacion: 'ubi1', servicios: 'Data display', dia: "Lunes", periodos: "08:00-10:00, 15:45-17:15" },
//  { id: 2, nombre: "691B", capacidad: 110, tipo: "Aula", planta: "Planta 1", ubicacion: 'ubi1', servicios: 'Data display', dia: "Martes", periodos: "08:00-10:00" },
//  { id: 3, nombre: "691C", capacidad: 90, tipo: "Aula", planta: "Planta 1", ubicacion: 'ubi1', servicios: 'Data display', dia: "Miercoles", periodos: "08:00-10:00" },
//  { id: 4, nombre: "692A", capacidad: 120, tipo: "Aula", planta: "Planta 2", ubicacion: 'ubi1', servicios: 'Data display', dia: "Jueves", periodos: "08:00-18:45" },
//  { id: 5, nombre: "692B", capacidad: 125, tipo: "Aula", planta: "Planta 2", ubicacion: 'ubi1', servicios: 'Data display', dia: "Jueves", periodos: "18:00-20:00" },
//];

// const tipos =[
//   {value: "10", label: "Aula"},
//   {value: "20", label: "Auditorio"},
//   {value: "30", label: "Laboratorio"},
// ];

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
  { value: "20:15-21:45", label: "20:15-21:45" },
];

const BusquedaAmbiente = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { seleccion, fecha, capacidad, horario, servicios, tipoAmbiente } =
    location.state || {};
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroHorario, setFiltroHorario] = useState("");
  const [filtroCapacidad, setFiltroCapacidad] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroServicios, setFiltroServicios] = useState("");
  const [mensajeError, cambiarMensajeError] = useState({ capacidad: "" });
  const { theme } = useTheme();
  const ambientesSeleccionados = useAmbienteStore(
    (state) => state.ambientesSeleccionados
  );
  const [informacionFinal, setInformacionFinal] = useState([]);
  const [loading, setLoading] = useState(false);
  const setAmbientesSeleccionados = useAmbienteStore(
    (state) => state.setAmbientesSeleccionados
  );
  const [mensajeNoResultados, setMensajeNoResultados] = useState('');
  useEffect(() => {
    if (tipoAmbiente) {
      setFiltroTipo(tipoAmbiente);
    }
    if (capacidad) {
      setFiltroCapacidad(capacidad.toString());
    }
    if (horario) {
      setFiltroHorario(horario.toString());
    }
    if (servicios) {
      setFiltroServicios(servicios.toString());
    }
    if (fecha) {
      setFiltroFecha(fecha.toString());
    }
  }, [tipoAmbiente, capacidad, horario, servicios, fecha]);
        // El filtro que se construye para la consulta tiene esta forma:
        // capacidad:"200"
        // fecha:"2024-05-11"  // verificar que el ambiente este disponible en esta fecha (segun las solicitudes)
        // horas:"08:15-09:45" // si es de horario multiple seria así '06:45-08:15,08:15-09:45'      
        // servicios:"Proyector, Wi-Fi"
        // tipo:"Laboratorio"
        // Realizar la solicitud al backend con el filtro
        const funciona = async () => {
          try {
            setLoading(true);
            const filtro = {
              capacidad: filtroCapacidad.trim(),
              tipo: filtroTipo.trim(),
              horas: filtroHorario.trim(),
              // servicios: filtroServicios.trim(),
              // fecha: filtroFecha.trim()
            };
            Object.keys(filtro).forEach((key) => {
              if (filtro[key] === "") {
                delete filtro[key];
              }
            });
        
            if (Object.keys(filtro).length === 0) {
              console.error("Debe ingresar al menos un filtro para realizar la búsqueda.");
              setLoading(false);
              return;
            }
        
            console.log("FILTRO", filtro);
            const response = await axios.post(`${URL_API}/ambientes-filtrar`, filtro);
            let data = response.data;
            console.log('respuesta', data);
        
            if (data.length === 0 && filtroCapacidad) {
              setMensajeNoResultados(`No se encontraron ambientes con la capacidad deseada (${filtroCapacidad}). Puede seleccionar dos ambientes de menor capacidad.`);
              delete filtro.capacidad;
              const retryResponse = await axios.post(`${URL_API}/ambientes-filtrar`, filtro);
              data = retryResponse.data;
        
              // Verificar si hay menos de 2 ambientes
              if (data.length < 2) {
                setMensajeNoResultados("No se encontraron ambientes que cumplan con las especificaciones.");
                setLoading(false);
                return;
              }
        
              // Verificar que los ambientes sean contiguos
              if (!sonAmbientesContiguos(data)) {
                setMensajeNoResultados("No se encontraron ambientes contiguos que cumplan con las especificaciones.");
                setLoading(false);
                return;
              }
            }
        
            const dataConFechaHora = data.map((ambiente) => {
              const horasArray = JSON.parse(ambiente.horas);
              const horasFormateadas = horasArray.join(", ");
              return {
                ...ambiente,
                horario: horasFormateadas,
                fecha: filtro.fecha,
              };
            });
        
            dataConFechaHora.sort((a, b) => a.nombre.localeCompare(b.nombre));
        
            setInformacionFinal(dataConFechaHora);
            setLoading(false);
          } catch (error) {
            console.error("Error al obtener y filtrar ambientes:", error);
            setLoading(false);
          }
        };

  const sonAmbientesContiguos = (ambientes) => {
    if (ambientes.length <= 1) return true;
    const prefix = ambientes[0].nombre.slice(0, 3);
    return ambientes.every(ambiente => ambiente.nombre.slice(0, 3) === prefix);
  };

  const manejarCambioCapacidad = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      setFiltroCapacidad(valor);
    }
  };

  const validarVacioCapacidad = () => {
    if (filtroCapacidad.trim() === "") {
      cambiarMensajeError((previo) => ({ ...previo, capacidad: "" }));
    }
  };

  const manejarCambioServicios = (event) => {
    setFiltroServicios(event.target.value);
  };

  const handleConfirm = () => {
    navigate(-1);
  };

  const handleReturn = () => {
    setAmbientesSeleccionados([]);
    navigate(-1);
  };

  const ambientes = [
    { value: " ", label: " Todos " },
    { value: "Aula", label: "Aula" },
    { value: "Auditorio", label: "Auditorio" },
    { value: "Laboratorio", label: "Laboratorio" },
  ];

  const defaultStyle = {
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      background: theme.bgmain,
          },
    container: {
      display: "flex",
      width: "60%",
      gap: "20px",
    },
    cardStyle: {
      minHeight: "600px",
      padding: "30px 50px",
      borderColor: "blue",
      borderRadius: "15px",
    },
    smallCardStyle: {
      flex: "1 1 40%",
      height: "100%",
      padding: "20px",
      borderColor: "lightgray",
      borderRadius: "105px",
      backgroundColor: "blue",
    },
    infoContainer: {
      overflowY: "auto",
      maxHeight: "350px",
      padding: "10px",
    },
    infoItem: (multiple) => ({
      margin: "20px 0 0 0",
      fontSize: "16px",
      color: theme.text,
      lineHeight: multiple ? "1.3" : "2.1",
    }),
    infoTitle: {
      fontWeight: "bold",
    },
    buttonContainer: {
      flexDirection: "column",
      gap: "10px",
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px",
    },
  };

  const [selectedHorario, setSelectedHorario] = useState(horario);
  const [selectedTipo, setSelectedTipo] = useState(tipoAmbiente || "");
  const handleHorarioChange = (newHorario) => {
    setSelectedHorario(newHorario);
    setFiltroHorario(newHorario);
  };
  const handleTipoChange = (newTipo) => {
    setSelectedTipo(newTipo);
    setFiltroTipo(newTipo);
  };

  const verificarHorario = (ambientesSeleccionados, horarios) => {
    return ambientesSeleccionados.every(ambiente => {
      const horariosAmbiente = ambiente.horario.split(', ').map(h => h.trim());
      return horarios.every(horarioBuscado => horariosAmbiente.includes(horarioBuscado));
    });
  };

  const verificaServicios = (ambientesSeleccionados, servicios) => {
    const serviciosRequeridos = servicios.split(',').map(servicio => servicio.trim());
    return ambientesSeleccionados.every(ambiente => {
      if (!ambiente.servicios) return false;
      const serviciosAmbiente = ambiente.servicios.split(',').map(servicio => servicio.trim());
      return serviciosRequeridos.every(servicioRequerido =>
        serviciosAmbiente.some(servicioAmbiente => servicioAmbiente.includes(servicioRequerido))
      );
    });
  };
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          style={{ ...defaultStyle.cardStyle, position: "relative" }}
          minWidth="100px"
          minHeight="600px"
          maxHeight="600px"
          fullWidth
          alignCenter
          padding="30px 50px"
          borderColor="blue"
          borderRadius="15px"
          isLoading={loading}
          overlayStyle={{
            backgroundColor: "rgba(0, 0, 255, 0.5)",
          }}
        >
          <div
            style={{
              width: "100%",
              flexDirection: "column",
              height: "100%",
              display: "flex",
              gap: "15px",
              justifyContent: "space-between",
              flex: 1,
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
                  valorInicial={fecha}
                />
              </div>
              <div>
                <Dropdown
                  etiqueta="Horario"
                  opciones={opcionesHorario}
                  valorInicial={selectedHorario}
                  cambio={handleHorarioChange}
                  esRequerido={true}
                />
              </div>
            </RowPercentage>
            <RowPercentage firstChildPercentage={60} gap="10px">
              <div>
                <TextInput
                  label="Capacidad Minima"
                  fullWidth={true}
                  onChange={(event) =>
                    manejarCambioCapacidad(event, "^[0-9]*$", {
                      min: 10,
                      max: 300,
                    })
                  }
                  onBlur={validarVacioCapacidad}
                  isRequired={true}
                  validationMessage={mensajeError.capacidad}
                  pattern="^[0-9]*$"
                  rango={{ min: 10, max: 300 }}
                  defaultValue={capacidad}
                />
              </div>
              <div>
                <Dropdown
                  etiqueta="Tipo de Ambiente"
                  opciones={ambientes}
                  valorInicial={selectedTipo}
                  cambio={handleTipoChange}
                  esRequerido={true}
                />
              </div>
            </RowPercentage>
            <RowPercentage firstChildPercentage={10} gap="10px">
              <div>
                <TextInput
                  label="Servicios"
                  pattern="^[A-Za-z0-9, ]{0,50}$"
                  onChange={(event) => manejarCambioServicios(event)}
                  defaultValue={servicios}
                  value={filtroServicios}
                />
              </div>
              <div style={defaultStyle.iconContainer} onClick={() => {}}>
                <IconButton onClick={funciona} style={{ color: "black" }}>
                  <SearchIcon
                    style={{ fontSize: 30, color: theme.highlight }}
                  />
                </IconButton>
              </div>
            </RowPercentage>
            {mensajeNoResultados && (
              <div style={{ padding: '10px', backgroundColor: 'lightpink', margin: '0px', borderRadius:'10px' }}>
                {mensajeNoResultados}
              </div>
            )}
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
          padding="30px 30px"
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
                textAlign: "center",
                padding: "10px 0",
              }}
            >
              <StyledText>
                Ambientes Seleccionados:{" "}
                {ambientesSeleccionados.length > 0
                  ? ambientesSeleccionados.map((a) => a.nombre).join(", ")
                  : "Ninguno"}
              </StyledText>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {ambientesSeleccionados.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Casilla2 label="Fecha" checked={true} />
                  <Casilla2
                    label="Capacidad"
                    descripcion={`Solicitado: ${capacidad}, Asignado: ${ambientesSeleccionados
                      .map((a) => `${a.capacidad}`)
                      .join(", ")}`}
                    checked={
                      ambientesSeleccionados.reduce(
                        (acc, ambiente) =>
                          acc + parseInt(ambiente.capacidad, 10),
                        0
                      ) >= parseInt(capacidad, 10)
                    }
                  />
                  <Casilla2
                    label="Horario"
                    descripcion={`Solicitado: ${horario}`}
                    checked={verificarHorario(ambientesSeleccionados, horario)}
                  />
                  <Casilla2
                    label="Tipo de Ambiente"
                    descripcion={`Solicitado: ${tipoAmbiente}`}
                    checked={ambientesSeleccionados.some(
                      (ambiente) => ambiente.tipo === tipoAmbiente
                    )}
                    style={{
                      backgroundColor: ambientesSeleccionados.some(
                        (ambiente) => ambiente.tipo === tipoAmbiente
                      )
                        ? "lightgreen"
                        : "transparent",
                    }}
                  />
                  <Casilla2
                    label="Servicios"
                    checked={servicios === "" || verificaServicios(ambientesSeleccionados, servicios)}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Casilla2 label="Fecha" checked={false} />
                  <Casilla2 label="Capacidad" checked={false} />
                  <Casilla2 label="Horario" checked={false} />
                  <Casilla2 label="Tipo de Ambiente" checked={false} />
                  <Casilla2 label="Servicios" checked={false} />
                </div>
              )}
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
