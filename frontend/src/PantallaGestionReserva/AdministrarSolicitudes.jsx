import { useState, useEffect } from 'react';
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import { DataGrid } from '@mui/x-data-grid';
import Dropdown from '../Utils/Dropdown';

import { useNavigate } from 'react-router-dom';

const GestionReservas = () => {
  const { theme } = useTheme();
  const navegar = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [orden, setOrden] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      // Reemplazar datos estáticos "data" con llamada a API real.
      // El backend debe devolver los datos de las reservas en el siguiente formato JSON:
      const data = [
        {
          id: 1,
          user_id: 5,
          grupo: ["1", "2"],
          tipo_ambiente: "Aula",
          materia: "Taller de Sistemas Operativos",
          horas: ["06:45-08:15", "08:15-09:45"],
          servicios: "",
          motivo: "Taller", // "Examen parcial", Examen final", "Examen de mesa", "Reemplazo ambiente", "Taller", "Otro"
          fecha: "2024-05-10",
          created_at: "2024-05-01T12:34:56",
          updated_at: "2024-05-02T14:30:21",
          capacidad: 150
        },
        {
          id: 2,
          user_id: 5,
          grupo: ["1"],
          tipo_ambiente: "Aula",
          materia: "Calculo ll",
          // horas: ["08:15-09:45"],
          horas: ["09:45-11:15"],
          servicios: "Wi-Fi",
          motivo: "Examen parcial", // "Examen parcial", Examen final", "Examen de mesa", "Reemplazo ambiente", "Taller", "Otro"
          fecha: "2024-05-11",
          created_at: "2024-05-02T12:34:56",
          updated_at: "2024-05-02T14:30:21",
          capacidad: 100
        },
        {
          id: 3,
          user_id: 5,
          grupo: ["1"],
          tipo_ambiente: "Aula",
          materia: "Redes de Computadoras",
          horas: ["11:15-09:45"],
          servicios: "Proyector, Wi-Fi",
          motivo: "Examen parcial", // "Examen parcial", Examen final", "Examen de mesa", "Reemplazo ambiente", "Taller", "Otro"
          fecha: "2024-05-09",
          created_at: "2024-05-03T12:34:56",
          updated_at: "2024-05-03T14:30:21",
          capacidad: 200
        },
      ];
      setReservas(data);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const ordenarReservas = () => {
      switch (orden) {
        case 'llegada':
          // eslint-disable-next-line no-case-declarations
          const ordenadoPorFecha = [...reservas].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          setReservas(ordenadoPorFecha);
          break;
        case 'urgencia':
          // eslint-disable-next-line no-case-declarations
          const prioridad = {
            "Examen parcial": 1,
            "Examen final": 2,
            "Examen de mesa": 3,
            "Práctica": 4,
            "Reemplazo ambiente": 5,
            "Taller": 6,
            "Otro": 7
          };
          // eslint-disable-next-line no-case-declarations
          const ordenadoPorUrgencia = [...reservas].sort((a, b) => prioridad[a.motivo] - prioridad[b.motivo]);
          setReservas(ordenadoPorUrgencia);
          break;
        case 'proximos':
          // eslint-disable-next-line no-case-declarations
          const ordenadoPorProximos = [...reservas].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
          setReservas(ordenadoPorProximos);
          break;
      }
    };

    ordenarReservas();
  }, [orden, reservas]);

  const columns = [
    { field: 'fecha', headerName: 'Fecha solicitada', flex: 1, minWidth: 130 },
    { 
      field: 'horas', 
      headerName: 'Horario', 
      flex: 1,
      minWidth: 180,
      renderCell: (params) => {
        return params.value.map(hora => hora.split('-')[0]).join(", ");
      }
    },
    { field: 'materia', headerName: 'Materia', flex: 1.5, minWidth: 250 },
    { field: 'motivo', headerName: 'Motivo', flex: 1.2, minWidth: 200 },
];


  const handleRowClick = (params) => {
    // redireccionar a pantalla Solicitud Admin 
    navegar('/SolicitudAdmin', { state:  {dataRow: params.row} });
    console.log('Reserva seleccionada:', params.row);
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
      minWidth: '600px',
      minHeight: '600px',
    },
    dataGridContainer: {
      flexGrow: 1,
      height: '70%',
      width: '100%'
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
              <StyledText boldText>Solicitudes</StyledText>
            </div>
            <Dropdown
              etiqueta="Ordenar Por"
              opciones={[
                { value: "llegada", label: "Fecha de Llegada" },
                { value: "urgencia", label: "Urgencia" },
                { value: "proximos", label: "Próximos" }
              ]}
              cambio={setOrden}
            />
            <div style={defaultStyle.dataGridContainer}>
              <DataGrid
                rows={reservas}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                autoHeight
                onRowClick={handleRowClick}
              />
            </div>

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

export default GestionReservas;
