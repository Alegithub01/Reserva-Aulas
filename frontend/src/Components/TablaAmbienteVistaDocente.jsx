import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import {DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';

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
  const [filasModificadas, setFilasModificadas] = useState({});

  useEffect(() => {
    setFilas(informacion);
  }, [informacion]);

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

TablaAmbienteVista.propTypes = {
  informacion: PropTypes.array,
};