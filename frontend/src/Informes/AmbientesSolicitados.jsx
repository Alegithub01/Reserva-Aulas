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
import Dropdown from "../Utils/Dropdown";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AmbientesSolicitados = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoAmbiente, setTipoAmbiente] = useState("Todos");
  const [informacionFinal, setInformacionFinal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [solicitudesIndividuales, setSolicitudesIndividuales] = useState([]);
  const [solicitudesGrupales, setSolicitudesGrupales] = useState([]);
  const [ambientes, setAmbientes] = useState([]);

  useEffect(() => {
    const fetchSolicitudesIndividuales = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/WilliamCallao/Fake-api/solicitudes_individuales"
        );
        setSolicitudesIndividuales(response.data);
      } catch (error) {
        console.error("Error fetching solicitudes individuales:", error);
      }
    };

    const fetchSolicitudesGrupales = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/WilliamCallao/Fake-api/solicitudes_grupales"
        );
        setSolicitudesGrupales(response.data);
      } catch (error) {
        console.error("Error fetching solicitudes grupales:", error);
      }
    };

    const fetchAmbientes = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/WilliamCallao/Fake-api/ambientes"
        );
        setAmbientes(response.data);
      } catch (error) {
        console.error("Error fetching ambientes:", error);
      }
    };

    fetchSolicitudesIndividuales();
    fetchSolicitudesGrupales();
    fetchAmbientes();
  }, []);

  useEffect(() => {
    buscarAmbientes();
  }, [solicitudesIndividuales, solicitudesGrupales, ambientes]);

  const buscarAmbientes = () => {
    setLoading(true);
    const todasSolicitudes = [...solicitudesIndividuales, ...solicitudesGrupales];
    const filtradas = todasSolicitudes.filter((solicitud) => {
      const fechaSolicitud = new Date(solicitud.fecha);
      const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;
      const fechaFinDate = fechaFin ? new Date(fechaFin) : null;
      const ambiente = ambientes.find((a) => a.nombre === solicitud.nombre_ambiente.nombre);
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
      const ambiente = ambientes.find((a) => a.nombre === ambienteNombre);

      if (!acc[ambienteNombre]) {
        acc[ambienteNombre] = {
          nombre: ambienteNombre,
          capacidad: ambiente ? ambiente.capacidad : 0,
          tipo: ambiente ? ambiente.tipo : "Desconocido",
          planta: ambiente ? ambiente.planta : "Desconocido",
          ubicacion: ambiente ? ambiente.ubicacion : "Desconocido",
          servicios: ambiente ? ambiente.servicios || "Ninguno" : "Ninguno",
          vecesSolicitadas: 0,
          horas: []
        };
      }
      acc[ambienteNombre].vecesSolicitadas += 1;
      acc[ambienteNombre].horas = acc[ambienteNombre].horas.concat(curr.horas);
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
      flexDirection: "column",
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
      textAlign: "center",
    },
  };

  const dataBar = {
    labels: informacionFinal.map(info => info.nombre),
    datasets: [
      {
        label: 'Veces solicitadas',
        data: informacionFinal.map(info => info.vecesSolicitadas),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const calcularHorarioFrecuencia = () => {
    const horarios = [
      "06:45-08:15",
      "08:15-09:45",
      "09:45-11:15",
      "11:15-12:45",
      "12:45-14:15",
      "14:15-15:45",
      "15:45-17:15",
      "17:15-18:45",
      "18:45-20:15",
      "20:15-21:45",
    ];

    const frecuenciaHoras = horarios.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {});

    informacionFinal.forEach(info => {
      info.horas.forEach(hora => {
        if (frecuenciaHoras[hora] !== undefined) {
          frecuenciaHoras[hora] += 1;
        }
      });
    });

    return frecuenciaHoras;
  };

  const frecuenciaHoras = calcularHorarioFrecuencia();

  const dataPie = {
    labels: Object.keys(frecuenciaHoras),
    datasets: [
      {
        data: Object.values(frecuenciaHoras),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF5733',
          '#C70039',
          '#FFC300',
          '#DAF7A6',
          '#900C3F',
          '#581845',
          '#2ECC71',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF5733',
          '#C70039',
          '#FFC300',
          '#DAF7A6',
          '#900C3F',
          '#581845',
          '#2ECC71',
        ],
      },
    ],
  };

  const ambientesNoSolicitados = ambientes.filter(ambiente =>
    !informacionFinal.some(info => info.nombre === ambiente.nombre)
  );

  const topAmbientesNoSolicitados = ambientesNoSolicitados.length > 0
    ? ambientesNoSolicitados.map(ambiente => ({ ...ambiente, vecesSolicitadas: 0 }))
    : informacionFinal.sort((a, b) => a.vecesSolicitadas - b.vecesSolicitadas).slice(0, 5);

  const horarioMasSolicitado = Object.entries(frecuenciaHoras).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          style={{ ...defaultStyle.cardStyle, position: "relative" }}
          minWidth="100px"
          minHeight="650px"
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

            <RowPercentage firstChildPercentage={80} gap="10px">
              <RowPercentage firstChildPercentage={50} gap="10px">
                <div>
                  <EntradaFecha
                    etiqueta="Fecha Inicio"
                    enCambio={setFechaInicio}
                    // mensajeValidacion=" "
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
                <RowPercentage firstChildPercentage={30} gap="10px">
                  <div>
                    <Dropdown
                      etiqueta="Tipo de Ambiente"
                      opciones={[
                        { value: "Todos", label: "Todos" },
                        { value: "Aula", label: "Aula" },
                        { value: "Laboratorio", label: "Laboratorio" },
                        { value: "Auditorio", label: "Auditorio" },
                      ]}
                      valorInicial={tipoAmbiente}
                      cambio={setTipoAmbiente}
                    />
                  </div>
                </RowPercentage>
                <div>
                  <IconButton onClick={buscarAmbientes} style={{ color: "black" }}>
                    <SearchIcon style={{ fontSize: 30, color: theme.highlight }} />
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

            <div style={{ display: "flex", justifyContent: "space-around", height: "300px" }}>
              <div style={{ width: "45%", height: "100%" }}>
                <Bar data={dataBar} options={{ maintainAspectRatio: false }} />
              </div>
              <div style={{ width: "45%", height: "100%" }}>
                <Pie data={dataPie} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: "1 1 30%", minWidth: "200px", margin: "10px" }}>
                  <p><strong>Ambientes más utilizados:</strong></p>
                  <ul>
                    {informacionFinal.slice(0, 5).map((info, index) => (
                      <li key={index}>{info.nombre} - {info.vecesSolicitadas} veces solicitadas</li>
                    ))}
                  </ul>
                </div>
                <div style={{ flex: "1 1 30%", minWidth: "200px", margin: "10px" }}>
                  <p><strong>Horarios más solicitados:</strong></p>
                  <ul>
                    {horarioMasSolicitado.map((horario, index) => (
                      <li key={index}>{horario[0]} - {horario[1]} solicitudes</li>
                    ))}
                  </ul>
                </div>
                <div style={{ flex: "1 1 30%", minWidth: "200px", margin: "10px" }}>
                  <p><strong>Ambientes menos utilizados:</strong></p>
                  <ul>
                    {topAmbientesNoSolicitados.map((info, index) => (
                      <li key={index}>{info.nombre} - {info.vecesSolicitadas} veces solicitadas</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AmbientesSolicitados;
