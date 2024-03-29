import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import styled from 'styled-components';
import { useTheme } from '../Contexts/ThemeContext';

const informacion = [
  { id: 1, nombre: "691A", capacidad: 100, tipo: "Aula", planta: "1", servicios: 'Data display', dia: "Lunes", horaInicio: "08:00", horaFin: "10:00" },
  { id: 2, nombre: "691B", capacidad: 110, tipo: "Aula", planta: "1", servicios: 'Data display', dia: "Martes", horaInicio: "08:00", horaFin: "10:00" },
  { id: 3, nombre: "691C", capacidad: 90, tipo: "Aula", planta: "1", servicios: 'Data display', dia: "Miercoles", horaInicio: "08:00", horaFin: "10:00" },
  { id: 4, nombre: "692A", capacidad: 120, tipo: "Aula", planta: "2", servicios: 'Data display', dia: "Jueves", horaInicio: "08:00", horaFin: "18:45" },
  { id: 5, nombre: "692B", capacidad: 125, tipo: "Aula", planta: "2", servicios: 'Data display', dia: "Jueves", horaInicio: "18:00", horaFin: "20:00" },
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
function EditarFilas(props) {
  const { setFilas, setFilasModificadas } = props;

  const manejoClick = () => {
    const id = randomId();
    setFilas((filasAnteriores) => [...filasAnteriores, { id, nombre: "", capacidad: 0, tipo: "", planta: "", dia: "", horaInicio: "", horaFin: "", esNuevo: true }]);
    setFilasModificadas((filasModificadasAnteriores) => ({
      ...filasModificadasAnteriores,
      [id]: { mode: GridRowModes.edit, fieldToFocus: "nombre" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={manejoClick}
      >
        Agregar
      </Button>
    </GridToolbarContainer>
  );
}

export default function GridTablaCrud() {
  const [filas, setFilas] = useState(informacion);
  const [filasModificadas, setFilasModificadas] = useState({});

  const manejoEdicionParar = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuidPrevented = true;
    }
  };

  const manejoEditar = (id) => () => {
    setFilasModificadas((filasModificadasAnteriores) => ({
      ...filasModificadasAnteriores,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const manejoGuardarClick = (id) => () => {
    setFilasModificadas((filasModificadasAnteriores) => ({
      ...filasModificadasAnteriores,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const manejoEliminar = (id) => () => {
    setFilas((filasAnteriores) => filasAnteriores.filter((fila) => fila.id !== id));
  };

  const manejoCancelar = (id) => () => {
    setFilasModificadas({
      ...filasModificadas,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const filaEditada = filas.find((fila) => fila.id === id);
    if (filaEditada.esNuevo) {
      setFilas(filas.filter((fila) => fila.id !== id));
    }
  };

  const procesarFilasModificadas = (nuevaFila) => {
    const filaModificada = { ...nuevaFila, isNew: false };
    setFilas(filas.map((fila) => (fila.id === nuevaFila.id ? filaModificada : fila)));
    return filaModificada;
  };

  const manejoFilasEnCambio = (nuevasFilasModelo) => {
    setFilasModificadas(nuevasFilasModelo);
  };

  const columnas = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 80,
      editable: true,
      valueFormatter: (params) => {
        const patronNombre = /^[0-9(A-Z)+]{0,8}$/;
        if (patronNombre.test(params)) {
          return params;
        } else {
          return '';
        }
      },
    },
    {
      field: 'capacidad',
      headerName: 'Capacidad',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueFormatter: (params) => {
        if(params < 10 || params > 300) {
          return 'Error';
        } else {
          return params;
        }
      },
    },
    {
      field: 'tipo',
      headerName: 'Tipo Ambiente',
      width: 90,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Aula', 'Laboratorio', 'Auditorio'],
    },
    {
      field: 'planta',
      headerName: 'Planta',
      width: 60,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['0', '1', '2', '3'],
    },
    { field: 'ubicacion', headerName: 'Ubicación', width: 180, editable: true },
    { field: 'servicios', headerName: 'Servicios', width: 180, editable: true },
    {
      field: 'dia',
      headerName: 'Día',
      width: 80,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    },
    {
      field: 'horaInicio',
      headerName: 'Hora Inicio',
      type: 'time',
      width: 80,
      editable: true,
      valueFormatter: (params) => {
        const patronTiempo = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (patronTiempo.test(params)) {
          return params;
        } else {
          return '--:--';
        }
      },
    },
    {
      field: 'horaFin',
      headerName: 'Hora Fin',
      type: 'time',
      width:  80,
      editable: true,
      valueFormatter: (params) => {
        const patronTiempo = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (patronTiempo.test(params)) {
          return params;
        } else {
          return '--:--';
        }
      },
    },
    {
      field: 'acciones',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const estaModoEdicion = filasModificadas[id]?.mode === GridRowModes.Edit;

        if (estaModoEdicion) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={manejoGuardarClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={manejoCancelar(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={manejoEditar(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={manejoEliminar(id)}
            color="inherit"
          />,
        ];
      },
    },
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
        onRowModesModelChange={manejoFilasEnCambio}
        onRowEditStop={manejoEdicionParar}
        processRowUpdate={procesarFilasModificadas}
        slots={{
          toolbar: EditarFilas,
        }}
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

