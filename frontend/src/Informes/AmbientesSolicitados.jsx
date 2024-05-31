import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import RowPercentage from "../Responsive/RowPercentage";
import { useTheme } from "../Contexts/ThemeContext";
import SearchIcon from "@mui/icons-material/Search";
import EntradaFecha from "../Utils/EntradaFecha";
import { IconButton } from "@mui/material";
import axios from "axios";
import { URL_API } from "../services/const";
import Dropdown from "../Utils/Dropdown";

const AmbientesSolicitados = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoAmbiente, setTipoAmbiente] = useState("Todos");
  const [informacionFinal, setInformacionFinal] = useState([]);
  const [loading, setLoading] = useState(false);  

  const solicitudes_individuales = [
    {
      id: 1,
      user_id: 5,
      grupo: ["1", "2"],
      nombre_ambiente: { nombre: "692B" },
      materia: "Taller de Sistemas Operativos",
      horas: ["06:45-08:15", "08:15-09:45"],
      servicios: "",
      detalle: "Taller práctico",
      fecha: "2024-05-10",
      created_at: "2024-05-01T12:34:56",
      updated_at: "2024-05-02T14:30:21"
    },
    {
      id: 2,
      user_id: 5,
      grupo: ["1"],
      nombre_ambiente: { nombre: "693D" },
      materia: "Cálculo II",
      horas: ["08:15-09:45"],
      servicios: "Data display",
      detalle: "Examen parcial",
      fecha: "2024-05-11",
      created_at: "2024-05-02T12:34:56",
      updated_at: "2024-05-02T14:30:21"
    },
    {
      id: 3,
      user_id: 5,
      grupo: ["1"],
      nombre_ambiente: { nombre: "692B" },
      materia: "Redes de Computadoras",
      horas: ["11:15-12:45"],
      servicios: "",
      detalle: "Examen parcial",
      fecha: "2024-05-09",
      created_at: "2024-05-03T12:34:56",
      updated_at: "2024-05-03T14:30:21"
    }
  ];

  const solicitudes_grupales = [
    {
      id: "1",
      users_id: [
        { user_id: 5 },
        { user_id: 7 }
      ],
      grupo: ["1", "3"],
      nombre_ambiente: { nombre: "691A" },
      materia: "Programación Avanzada",
      horas: ["10:00-11:30"],
      servicios: "Computadoras",
      detalle: "Práctica de laboratorio",
      fecha: "2024-06-01",
      created_at: "2024-05-01T09:30:00",
      updated_at: "2024-05-01T10:00:00"
    },
    {
      id: "2",
      users_id: [
        { user_id: 8 },
        { user_id: 9 }
      ],
      grupo: ["2", "4"],
      nombre_ambiente: { nombre: "692A" },
      materia: "Matemáticas Discretas",
      horas: ["14:00-15:30"],
      servicios: "Proyector",
      detalle: "Examen final",
      fecha: "2024-06-02",
      created_at: "2024-05-02T10:30:00",
      updated_at: "2024-05-02T11:00:00"
    },
    {
      id: "3",
      users_id: [
        { user_id: 6 },
        { user_id: 10 }
      ],
      grupo: ["1", "2"],
      nombre_ambiente: { nombre: "693D" },
      materia: "Inteligencia Artificial",
      horas: ["16:00-17:30"],
      servicios: "Micrófono",
      detalle: "Conferencia",
      fecha: "2024-06-03",
      created_at: "2024-05-03T11:30:00",
      updated_at: "2024-05-03T12:00:00"
    }
  ];

  const ambientes = [
    {
      id: 5,
      nombre: "693D",
      capacidad: 300,
      tipo: "Auditorio",
      planta: "Planta 3",
      ubicacion: "Edificio Academico",
      servicios: "Data display",
      dia: "Lunes",
      horas: ["08:15-09:45"],
      created_at: "2024-05-06T14:03:10.000000Z",
      updated_at: "2024-05-06T14:03:10.000000Z"
    },
    {
      id: 12,
      nombre: "692B",
      capacidad: 100,
      tipo: "Aula",
      planta: "Planta 2",
      ubicacion: "Edificio Academico",
      servicios: null,
      dia: "Lunes",
      horas: ["11:15-12:45"],
      created_at: "2024-05-23T00:51:33.000000Z",
      updated_at: "2024-05-23T00:51:33.000000Z"
    },
    {
      id: 9,
      nombre: "691C",
      capacidad: 80,
      tipo: "Aula",
      planta: "Planta 1",
      ubicacion: "Edificio Academico",
      servicios: null,
      dia: "Lunes",
      horas: ["06:45-08:15","08:15-09:45","11:15-12:45"],
      created_at: "2024-05-09T15:20:34.000000Z",
      updated_at: "2024-05-09T15:20:34.000000Z"
    },
    {
      id: 10,
      nombre: "692A",
      capacidad: 60,
      tipo: "Aula",
      planta: "Planta 2",
      ubicacion: "Edificio Academico",
      servicios: null,
      dia: "Lunes",
      horas: ["11:15-12:45","09:45-11:15"],
      created_at: "2024-05-23T00:44:59.000000Z",
      updated_at: "2024-05-23T00:44:59.000000Z"
    },
    {
      id: 8,
      nombre: "691B",
      capacidad: 20,
      tipo: "Aula",
      planta: "Planta 1",
      ubicacion: "Edificio Academico",
      servicios: null,
      dia: "Lunes",
      horas: ["11:15-12:45"],
      created_at: "2024-05-06T14:03:10.000000Z",
      updated_at: "2024-05-06T14:03:10.000000Z"
    },
    {
      id: 6,
      nombre: "691A",
      capacidad: 120,
      tipo: "Aula",
      planta: "Planta 1",
      ubicacion: "Edificio Academico",
      servicios: null,
      dia: "Martes",
      horas: ["11:15-12:45"],
      created_at: "2024-05-06T14:03:58.000000Z",
      updated_at: "2024-05-06T14:03:58.000000Z"
    }
  ];

  const buscarAmbientes = () => {
    setLoading(true);
    const todasSolicitudes = [...solicitudes_individuales, ...solicitudes_grupales];
    const filtradas = todasSolicitudes.filter(solicitud => {
      const fechaSolicitud = new Date(solicitud.fecha);
      const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;
      const fechaFinDate = fechaFin ? new Date(fechaFin) : null;
      const ambiente = ambientes.find(a => a.nombre === solicitud.nombre_ambiente.nombre);
      const tipoSolicitud = ambiente?.tipo || solicitud.nombre_ambiente.nombre;

      const cumpleFecha =
        (!fechaInicioDate || fechaSolicitud >= fechaInicioDate) &&
        (!fechaFinDate || fechaSolicitud <= fechaFinDate);

      const cumpleTipo =
        tipoAmbiente === "Todos" ||
        tipoSolicitud.toLowerCase() === tipoAmbiente.toLowerCase();

      return cumpleFecha && cumpleTipo;
    });

    const agrupadas = filtradas.reduce((acc, curr) => {
      const ambienteNombre = curr.nombre_ambiente.nombre;
      const ambiente = ambientes.find(a => a.nombre === ambienteNombre);

      if (!acc[ambienteNombre]) {
        acc[ambienteNombre] = {
          nombre: ambienteNombre,
          capacidad: ambiente ? ambiente.capacidad : 0,
          tipo: ambiente ? ambiente.tipo : "Desconocido",
          planta: ambiente ? ambiente.planta : "Desconocido",
          ubicacion: ambiente ? ambiente.ubicacion : "Desconocido",
          servicios: ambiente ? ambiente.servicios || "Ninguno" : "Ninguno",
          vecesSolicitadas: 0
        };
      }
      acc[ambienteNombre].vecesSolicitadas += 1;
      return acc;
    }, {});

    setInformacionFinal(Object.values(agrupadas));
    setLoading(false);
  };

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
      width: "80%",
      gap: "20px",
    },
    cardStyle: {
      minHeight: "600px",
      padding: "30px 50px",
      borderColor: "blue",
      borderRadius: "15px",
    },
    buttonContainer: {
      flexDirection: "column",
      gap: "10px",
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px",
    },
    tableStyle: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
    },
    tableCell: {
      border: "1px solid #ddd",
      padding: "3px",
      
    },
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
              <StyledText boldText>Ambientes Solicitados</StyledText>
            </div>

            <RowPercentage firstChildPercentage={70} gap="10px">
              <RowPercentage firstChildPercentage={50} gap="10px">
              
              <div>
                <EntradaFecha
                  etiqueta="Fecha Inicio"
                  enCambio={setFechaInicio}
                  mensajeValidacion=""
                />
              </div>
              <div>
                <EntradaFecha
                  etiqueta="Fecha Fin"
                  enCambio={setFechaFin}
                  mensajeValidacion=""
                />
              </div>
              </RowPercentage>
              <RowPercentage firstChildPercentage={10} gap="10px">
                <div>
                  <Dropdown
                    etiqueta="Tipo de Ambiente"
                    opciones={[
                      { value: "Todos", label: "Todos" },
                      { value: "Aula", label: "Aula" },
                      { value: "Laboratorio", label: "Laboratorio" },
                      { value: "Auditorio", label: "Auditorio" }
                    ]}
                    valorInicial={tipoAmbiente}
                    cambio={setTipoAmbiente}
                  />
                </div>
                <div>
                  <IconButton onClick={buscarAmbientes} style={{ color: "black" }}>
                    <SearchIcon
                      style={{ fontSize: 30, color: theme.highlight }}
                    />
                  </IconButton>
                </div>
              </RowPercentage>
            </RowPercentage>
            


            <table style={defaultStyle.tableStyle}>
              <thead style={defaultStyle.tableHeader}>
                <tr>
                  <th style={defaultStyle.tableCell}>Nombre</th>
                  <th style={defaultStyle.tableCell}>Capacidad</th>
                  <th style={defaultStyle.tableCell}>Tipo</th>
                  <th style={defaultStyle.tableCell}>Planta</th>
                  <th style={defaultStyle.tableCell}>Ubicación</th>
                  <th style={defaultStyle.tableCell}>Servicios</th>
                  <th style={defaultStyle.tableCell}>Veces solicitadas</th>
                </tr>
              </thead>
              <tbody>
                {informacionFinal.map((info, index) => (
                  <tr key={index}>
                    <td style={defaultStyle.tableCell}>{info.nombre}</td>
                    <td style={defaultStyle.tableCell}>{info.capacidad}</td>
                    <td style={defaultStyle.tableCell}>{info.tipo}</td>
                    <td style={defaultStyle.tableCell}>{info.planta}</td>
                    <td style={defaultStyle.tableCell}>{info.ubicacion}</td>
                    <td style={defaultStyle.tableCell}>{info.servicios}</td>
                    <td style={defaultStyle.tableCell}>{info.vecesSolicitadas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AmbientesSolicitados;
