import { useState } from "react";
import Box from '@mui/material/Box';
import {DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { useTheme } from '../Contexts/ThemeContext';

const informacion = [
 { id: 1, nombre: "691A", capacidad: 100, tipo: "Aula", planta: "1", servicios: 'Data display', dia: "Lunes", periodos: "08:00-10:00, 15:45-17:15" },
 { id: 2, nombre: "691B", capacidad: 110, tipo: "Aula", planta: "1", servicios: 'Data display', dia: "Martes", periodos: "08:00-10:00" },
 { id: 3, nombre: "691C", capacidad: 90, tipo: "Aula", planta: "1", servicios: 'Data display', dia: "Miercoles", periodos: "08:00-10:00" },
 { id: 4, nombre: "692A", capacidad: 120, tipo: "Aula", planta: "2", servicios: 'Data display', dia: "Jueves", periodos: "08:00-18:45" },
 { id: 5, nombre: "692B", capacidad: 125, tipo: "Aula", planta: "2", servicios: 'Data display', dia: "Jueves", periodos: "18:00-20:00" },
];

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-cell {
    font-size: 0.93rem;
    color: black;
  }
  .MuiDataGrid-root {
    border-width: 3px;
    border-color: pink;
    width: 100%;
    height: 100%; 
  }
`;
export default function TablaAmbienteVista() {
  const [filas, setFilas] = useState(informacion);
  const [filasModificadas, setFilasModificadas] = useState({});

  const columnas = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 110,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'capacidad',
      headerName: 'Capacidad',
      type: 'number',
      width: 117,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'tipo',
      headerName: 'Tipo Ambiente',
      width: 140,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'planta',
      headerName: 'Planta',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'ubicacion', headerName: 'Ubicación', width: 190, headerAlign: 'center', align: 'center',},
    { field: 'servicios', headerName: 'Servicios', width: 190, headerAlign: 'center', align: 'center',},
  ];
  const {theme} = useTheme();
  return (
    <Box
      sx={{
        height: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <StyledDataGrid
        rows={filas}
        columns={columnas}
        editMode="row"
        rowModesModel={filasModificadas}
        slotProps={{
          toolbar: { setFilas, setFilasModificadas },
        }}
        sx={{
          '& .MuiDataGrid-root, .MuiDataGrid-withBorderColor': {
            bgcolor: theme.headerColor,
            color: theme.primaryText,
            fontSize: '0.975rem',
          },
        }}
      />
    </Box>
  );
}