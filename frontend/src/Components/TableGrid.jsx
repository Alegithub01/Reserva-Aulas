import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
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
function EditarFilas(props) {
  const { setFilas, setFilasModificadas } = props;

}

export default function GridTablaCrud() {
  const [filas, setFilas] = useState(informacion);
  const [filasModificadas, setFilasModificadas] = useState({});
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [nombreAntiguo, setNombreAntiguo] = useState('');
  const [periodosAntiguos, setPeriodosAntiguos] = useState('');

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

  const abrirDialogoEliminar = (id) => () => {
    setIdAEliminar(id);
    setDialogoAbierto(true);
  };

  const manejoConfirmarEliminar = () => {
    setFilas(filas.filter((fila) => fila.id !== idAEliminar));
    setDialogoAbierto(false);
    setIdAEliminar(null);
  };

  const manejoCancelarEliminacion = () => {
    setDialogoAbierto(false);
    setIdAEliminar(null);
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
      field: 'periodos',
      headerName: 'Periodos',
      width: 180,
      editable: true,
      valueOptions: ["06:45-08:15", "08:30-09:45", "10:00-11:15", "11:30-12:45", "13:00-14:15", "14:30-15:45", "16:00-17:15", "17:30-18:45", "19:00-20:15", "20:30-21:45"],
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 90,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Disponible', 'Ocupado', 'Mantenimiento'],
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
            onClick={abrirDialogoEliminar(id)}
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
      <Dialog
        open={dialogoAbierto}
        onClose={manejoCancelarEliminacion}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={manejoCancelarEliminacion}>Cancelar</Button>
          <Button onClick={manejoConfirmarEliminar} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

