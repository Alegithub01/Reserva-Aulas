import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

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
function TablaSolicitudes() {
  const [filas, setFilas] = useState([]);
  const [filasModificadas, setFilasModificadas] = useState({});
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  // useEffect(() => {
  //   setFilas(informacion);
  // }, [informacion]);

  const abrirDialogoEliminar = (id) => () => {
    setIdAEliminar(id);
    setDialogoAbierto(true);
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
  

  const manejoFilasEnCambio = (nuevasFilasModelo) => {
    setFilasModificadas(nuevasFilasModelo);
  };
  const columnas = [
    {
      field: 'nombre',
      headerName: 'Nombre Docente',
      flex: 1,
      minWidth: 190,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'materia',
      headerName: 'Materia',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'grupo',
      headerName: 'Grupo',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'fecha',
      headerName: 'Fecha solicitada',
      flex: 1,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'horario',
      headerName: 'Horario',
      flex: 1,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'servicios', headerName: 'Servicios solicitados',flex: 1, minWidth: 190, headerAlign: 'center', align: 'center', },
    { field: 'detalles', headerName: 'Detalles de solicitud',flex: 1, minWidth: 190, headerAlign: 'center', align: 'center', },
    {
      field: 'acciones',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={abrirDialogoEliminar(id)}
            color="inherit"
          />,
        ];
      },
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