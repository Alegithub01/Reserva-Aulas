import { useState, useEffect, useRef } from "react";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import RowPercentage from "../Responsive/RowPercentage";
import { useTheme } from "../Contexts/ThemeContext";
import SearchIcon from "@mui/icons-material/Search";
import EntradaFecha from "../Utils/EntradaFecha";
import { IconButton, Button } from "@mui/material";
import axios from "axios";
import Dropdown from "../Utils/Dropdown";
import { Line } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const FechasDemandadas = () => {
  const { theme } = useTheme();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoAmbiente, setTipoAmbiente] = useState("Todos");
  const [informacionFinal, setInformacionFinal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [asignacionesIndividuales, setAsignacionesIndividuales] = useState([]);
  const [asignacionesGrupales, setAsignacionesGrupales] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const reportRef = useRef();

  useEffect(() => {
    const fetchAsignacionesIndividuales = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/WilliamCallao/Fake-api/solicitudes_individuales"
        );
        setAsignacionesIndividuales(response.data);
      } catch (error) {
        console.error("Error fetching asignaciones individuales:", error);
      }
    };

    const fetchAsignacionesGrupales = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/WilliamCallao/Fake-api/solicitudes_grupales"
        );
        setAsignacionesGrupales(response.data);
      } catch (error) {
        console.error("Error fetching asignaciones grupales:", error);
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

    fetchAsignacionesIndividuales();
    fetchAsignacionesGrupales();
    fetchAmbientes();
  }, []);

  useEffect(() => {
    buscarFechasSolicitadas();
  }, [asignacionesIndividuales, asignacionesGrupales, ambientes]);

  const buscarFechasSolicitadas = () => {
    setLoading(true);
    const todasAsignaciones = [
      ...asignacionesIndividuales,
      ...asignacionesGrupales,
    ];
    const filtradas = todasAsignaciones.filter((asignacion) => {
      const fechaAsignacion = new Date(asignacion.fecha);
      const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;
      const fechaFinDate = fechaFin ? new Date(fechaFin) : null;
      const ambiente = ambientes.find(
        (a) => a.nombre === asignacion.nombre_ambiente.nombre
      );
      const tipoAsignacion =
        ambiente?.tipo || asignacion.nombre_ambiente.nombre;

      const cumpleFecha =
        (!fechaInicioDate || fechaAsignacion >= fechaInicioDate) &&
        (!fechaFinDate || fechaAsignacion <= fechaFinDate);

      const cumpleTipo =
        tipoAmbiente === "Todos" ||
        tipoAsignacion.toLowerCase() === tipoAmbiente.toLowerCase();

      return cumpleFecha && cumpleTipo;
    });

    const agrupadas = filtradas.reduce((acc, curr) => {
      const fecha = curr.fecha;
      if (!acc[fecha]) {
        acc[fecha] = {
          fecha,
          cantidad: 0,
          horas: [],
          ambientes: [],
          materias: [],
        };
      }
      acc[fecha].cantidad += 1;
      acc[fecha].horas.push(...curr.horas);
      acc[fecha].ambientes.push(curr.nombre_ambiente.nombre);
      acc[fecha].materias.push(curr.materia);
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

  const dataLine = {
    labels: informacionFinal.map((info) => info.fecha),
    datasets: [
      {
        label: "Reservas por día",
        data: informacionFinal.map((info) => info.cantidad),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const calcularFrecuenciaHoras = () => {
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

    informacionFinal.forEach((info) => {
      info.horas.forEach((hora) => {
        if (frecuenciaHoras[hora] !== undefined) {
          frecuenciaHoras[hora] += 1;
        }
      });
    });

    return frecuenciaHoras;
  };

  const frecuenciaHoras = calcularFrecuenciaHoras();

  const topAmbientesUtilizados = informacionFinal.reduce((acc, info) => {
    info.ambientes.forEach((ambiente) => {
      if (!acc[ambiente]) {
        acc[ambiente] = 0;
      }
      acc[ambiente] += 1;
    });
    return acc;
  }, {});

  const exportPDF = () => {
    setTimeout(() => {
      const doc = new jsPDF("portrait", "pt", "a4");
      const margin = 20;
      const scale = 2;

      html2canvas(reportRef.current, { scale }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = doc.internal.pageSize.getWidth() - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
        doc.save("informe_fechas_demandadas.pdf");
      });
    }, 1000);
  };

  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          style={{ ...defaultStyle.cardStyle, position: "relative" }}
          minWidth="800px"
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
            ref={reportRef}
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
              <StyledText boldText>Fechas Demandadas</StyledText>
            </div>

            <RowPercentage firstChildPercentage={80} gap="10px">
              
              <Button 
                variant="contained" 
                onClick={exportPDF} 
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '20px', 
                  color: 'gray', 
                  border: '2px solid lightgray', 
                  boxShadow: 'none'
                }}
              >
                PDF
              </Button>
              <RowPercentage firstChildPercentage={50} gap="10px">
                <div>
                  <EntradaFecha
                    etiqueta="Fecha Inicio"
                    enCambio={setFechaInicio}
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
                  <IconButton
                    onClick={buscarFechasSolicitadas}
                    style={{ color: "black" }}
                  >
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
                  <th style={defaultStyle.tableCell}>Fecha</th>
                  <th style={defaultStyle.tableCell}>Hora</th>
                  <th style={defaultStyle.tableCell}>Ambiente</th>
                  <th style={defaultStyle.tableCell}>Materia</th>
                </tr>
              </thead>
              <tbody>
                {informacionFinal.map((info, index) => (
                  <tr key={index}>
                    <td style={defaultStyle.tableCell}>{info.fecha}</td>
                    <td style={defaultStyle.tableCell}>{info.horas.join(", ")}</td>
                    <td style={defaultStyle.tableCell}>{info.ambientes.join(", ")}</td>
                    <td style={defaultStyle.tableCell}>{info.materias.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                height: "300px",
              }}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <Line data={dataLine} options={{ maintainAspectRatio: false }} />
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
                <div
                  style={{ flex: "1 1 30%", minWidth: "200px", margin: "10px" }}
                >
                  <p>
                    <strong>Horarios más Solicitados:</strong>
                  </p>
                  <ul>
                    {Object.entries(frecuenciaHoras).sort((a, b) => b[1] - a[1]).slice(0, 5).map((horario, index) => (
                      <li key={index}>{horario[0]} - {horario[1]} asignaciones</li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{ flex: "1 1 30%", minWidth: "200px", margin: "10px" }}
                >
                  <p>
                    <strong>Ambientes más Utilizados:</strong>
                  </p>
                  <ul>
                    {Object.entries(topAmbientesUtilizados).sort((a, b) => b[1] - a[1]).slice(0, 5).map((ambiente, index) => (
                      <li key={index}>{ambiente[0]} - {ambiente[1]} veces asignadas</li>
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

export default FechasDemandadas;
