import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';
import useAmbienteStore from '../Contexts/AmbienteStore';

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

export default function TablaAmbienteVista({informacion}) {
  const [filas, setFilas] = useState(informacion);
  const [selectedRows, setSelectedRows] = useState([]);
  const setAmbientesSeleccionados = useAmbienteStore(state => state.setAmbientesSeleccionados);

  useEffect(() => {
    setFilas(informacion);
  }, [informacion]);

  useEffect(() => {
    setAmbientesSeleccionados([...selectedRows]);
  }, [selectedRows]);

  const handleCheckboxClick = (row, isChecked) => {
    setSelectedRows(prev => {
      const existingRow = prev.find(r => r.id === row.id);
      if (isChecked && !existingRow) {
        return [...prev, row];
      } else if (!isChecked && existingRow) {
        return prev.filter(r => r.id !== row.id);
      }
      return prev;
    });
  };

  const columnas = [
    {
      field: 'checkbox',
      headerName: '',
      renderCell: (params) => (
        <Checkbox
          checked={selectedRows.some(r => r.id === params.row.id)}
          onChange={(event) => handleCheckboxClick(params.row, event.target.checked)}
          color="primary"
        />
      ),
      width: 10,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false
    },
    { field: 'nombre', headerName: 'Nombre', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'capacidad', headerName: 'Capacidad', type: 'number', width: 117, align: 'center', headerAlign: 'center' },
    { field: 'planta', headerName: 'Planta', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'horario', headerName: 'Horario', width: 110, align: 'center', headerAlign: 'center' },
    { field: 'tipo', headerName: 'Tipo Ambiente', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'fecha', headerName: 'Fecha', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'ubicacion', headerName: 'Ubicación', width: 110, headerAlign: 'center', align: 'center' },
    { field: 'servicios', headerName: 'Servicios', width: 110, headerAlign: 'center', align: 'center' },
  ];

  const { theme } = useTheme();

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

TablaAmbienteVista.propTypes = {
  informacion: PropTypes.array,
};
