import { useState, useCallback } from "react";
import Box from '@mui/material/Box';
import { GridRowModes, GridActionsCellItem, GridRowEditStopReasons, DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { useTheme } from '../Contexts/ThemeContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

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
const prueba = [
  { id: 1, nombre: 'Juan Perez', materia: 'Base de datos 1', grupo: '1', fecha: '2024-10-10', horario: '8:15-09:45, 09:45-11:15', servicios: 'Proyector', Motivo: 'Taller', estado: 'Pendiente', ambiente: '' },
  { id: 2, nombre: 'Jose Perez', materia: 'Programación', grupo: '2', fecha: '2024-10-10', horario: '8:15-09:45', servicios: 'Proyector', Motivo: 'Examen parcial', estado: 'Aceptada', ambiente: '692H' },
  { id: 3, nombre: 'Maria Perez', materia: 'Base de datos 1', grupo: '1', fecha: '2024-10-10', horario: '8:15-09:45', servicios: 'Proyector', Motivo: 'Examen final', estado: 'Rechazada', ambiente: '' },
];

function EditarFilas(props) {
  const { setFilas, setFilasModificadas } = props;
}

const TablaSolicitudes = () => {
  const [filas, setFilas] = useState(prueba);
  const [filasModificadas, setFilasModificadas] = useState({});
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  // useEffect(() => {
  //   setFilas(informacion);
  // }, [informacion]);

  const manejoEdicionParar = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuidPrevented = true;
    }
  };
  const manejoEditar = (id) => () => {
    const filaEditada = filas.find((fila) => fila.id === id);
    if (filasModificadas[id]) {
      setFilasModificadas((filasModificadasAnteriores) => ({
        ...filasModificadasAnteriores,
        [id]: {
          ...filasModificadasAnteriores[id],
          mode: GridRowModes.Edit,
        },
      }));
    } else {
      setFilasModificadas((filasModificadasAnteriores) => ({
        ...filasModificadasAnteriores,
        [id]: {
          ...filaEditada,
          mode: GridRowModes.Edit,
        },
      }));
    }
  };

  const manejoGuardarClick = useCallback((id) => async () => {
    try {
      if (filasModificadas[id]) {
        const filaAModificar = filasModificadas[id] || filas.find((fila) => fila.id === id);
        // PARA BACKEND ----------************-**----------------------
        console.log(filaAModificar);
        // await axios.put(`http://
        setFilasModificadas((filasModificadasAnteriores) => {
          const updatedModifications = { ...filasModificadasAnteriores };
          updatedModifications[id] = { mode: 'view' };
          return updatedModifications;
        });
        setFilas((filasAnteriores) => {
          return filasAnteriores.map((fila) => {
            if (fila.id === id) {
              return filaAModificar;
            }
            return fila;
          });
        });
      }
    } catch (error) {
      console.error('Error al guardar la fila.', error);
    }
  }, [filas, filasModificadas, setFilasModificadas]);

  const abrirDialogoEliminar = (id) => () => {
    setIdAEliminar(id);
    setDialogoAbierto(true);
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

  const manejoFilasEnCambio = (nuevasFilasModelo) => {
    setFilasModificadas(nuevasFilasModelo);
  };

  const manejoConfirmarEliminar = async () => {
    try {
      // PARA BACKEND ----------************-**----------------------
      // await axios.delete(`http://127.0.0.1:8000/api/solicitudes/${idAEliminar}`); //cambiar url
      setFilas((filasAnteriores) => filasAnteriores.filter((fila) => fila.id !== idAEliminar));
      setDialogoAbierto(false);
      setIdAEliminar(null);
    } catch (error) {
      console.error('Error al eliminar la fila.', error);
    }
  };

  const manejoCancelarEliminacion = () => {
    setDialogoAbierto(false);
    setIdAEliminar(null);
  };
  const procesarFilasModificadas = (nuevaFila) => {
    const filaModificada = { ...nuevaFila, isNew: false };
    // Actualiza filas con los nuevos valores de la fila editada
    setFilas(filas.map((fila) => (fila.id === nuevaFila.id ? filaModificada : fila)));
    return filaModificada;
  };

  const columnas = [
    {
      field: 'nombre',
      headerName: 'Nombre Docente',
      flex: 1,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'materia',
      headerName: 'Materia',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'grupo',
      headerName: 'Grupo',
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      valueFormatter: (params) => {
        if (params < 1 || params > 10) {
          return 'Error';
        } else {
          return params;
        }
      },
    },
    {
      field: 'fecha',
      headerName: 'Fecha solicitada',
      flex: 1,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      valueFormatter: (params) => new Date(params).toLocaleDateString('es-ES'),
    },
    {
      field: 'horario',
      headerName: 'Horario',
      flex: 1,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      valueOptions: ["06:45-08:15", "08:30-09:45", "10:00-11:15", "11:30-12:45", "13:00-14:15", "14:30-15:45", "16:00-17:15", "17:30-18:45", "19:00-20:15", "20:15-21:45"],
      valueFormatter: (params) => {
        // Verificar si 'params.value' es un array
        if (Array.isArray(params.value)) {
          // Convertir el array de horas a una cadena de texto separada por coma
          const formattedHours = params.value.join(', ');
          return formattedHours;
        }
        // Si no es un array, devolver el valor sin modificar
        return params.value;
      },
    },
    { field: 'servicios', headerName: 'Servicios solicitados', flex: 1, minWidth: 190, headerAlign: 'center', align: 'center', editable: true, },
    {
      field: 'Motivo',
      headerName: 'Motivo de solicitud',
      flex: 1,
      minWidth: 140,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'singleSelect',
      valueOptions: ["Examen final", "Examen parcial", "Examen de mesa", "Práctica", "Reemplazo ambiente", "Taller", "Otro"],
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      editable: false,
    }, {
      field: 'ambiente',
      headerName: 'Ambiente',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      editable: false,
    }, {
      field: 'acciones',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        const ambiente = params.row.ambiente;
        if (ambiente) {
          return [];
        }
        const estaModoEdicion = filasModificadas[params.id]?.mode === GridRowModes.Edit;

        if (estaModoEdicion) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={manejoGuardarClick(params.id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={manejoCancelar(params.id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={manejoEditar(params.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={abrirDialogoEliminar(params.id)}
            color="inherit"
          />,
        ];
      }
    },];
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
        rowModesModel={filasModificadas}
        onRowModesModelChange={manejoFilasEnCambio}
        onRowEditStop={manejoEdicionParar}
        processRowUpdate={procesarFilasModificadas}
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
            ¿Estás seguro de que deseas eliminar esta solicitud?
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


export default TablaSolicitudes;