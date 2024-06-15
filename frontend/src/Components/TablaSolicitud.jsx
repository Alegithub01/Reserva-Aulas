/* eslint-disable react/jsx-key */
import { useState, useEffect, useCallback } from "react";
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
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { URL_API } from "../services/const";

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
// const prueba = [
//   { id: 1, nombre: 'Juan Perez', materia: 'Base de datos 1', grupo: '1', fecha: '2024-10-10', horario: '8:15-09:45, 09:45-11:15', servicios: 'Proyector', Motivo: 'Taller', estado: 'Pendiente', ambiente: '' },
//   { id: 2, nombre: 'Jose Perez', materia: 'Programación', grupo: '2', fecha: '2024-10-10', horario: '8:15-09:45', servicios: 'Proyector', Motivo: 'Examen parcial', estado: 'Aceptada', ambiente: '692H' },
//   { id: 3, nombre: 'Maria Perez', materia: 'Base de datos 1', grupo: '1', fecha: '2024-10-15', horario: '8:15-09:45', servicios: 'Proyector', Motivo: 'Examen final', estado: 'Rechazada', ambiente: '' },
//   { id: 4, nombre: 'Maria Perez', materia: 'Base de datos 2', grupo: '3', fecha: '2024-10-20', horario: '18:45-20:15', servicios: 'Wi-fi', Motivo: 'Taller', estado: 'Aceptada', ambiente: '690A, 690B' },
// ];


// let prueba = [];

// axios.get('http://localhost:8000/api/solicitudes-formato')
//   .then(response => {
//     // Assign the response data to prueba
//     prueba = response.data;
//     console.log(prueba);
//   })
//   .catch(error => {
//     console.error('Error fetching solicitudes:', error);
//   });


const TablaSolicitudes = () => {
  const [filas, setFilas] = useState([]);
  const [filasModificadas, setFilasModificadas] = useState({});
  const [dialogoAbierto, setDialogoAbierto] = useState({
    eliminar: false,
    aceptar: false,
    rechazar: false,
  });
  const [mensajeDialogo, setMensajeDialogo] = useState({
    eliminando: '¿Estás seguro de que deseas eliminar esta solicitud?',
    aceptando: '¿Estás seguro de que deseas aceptar esta oferta de ambientes?',
    rechazando: '¿Estás seguro de que deseas rechazar esta oferta de ambientes?',
  });
  const [idATratar, setidATratar] = useState(null);

  const transformarDatos = (datos) => {
    return datos.map((item) => ({
      ...item,
      ambiente: item.ambiente?JSON.parse(item.ambiente).join(', '):'',
      grupo: item.grupo?JSON.parse(item.grupo).join(', '):'',
    }));
  };
  
   useEffect(() => {
    const datita = async () => {
      const dataUser = await axios.post(`${URL_API}/auth/me`,{}, {
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const id = dataUser.data.id;
      await axios.get(`${URL_API}/solicitudes-formato/${id}`)
      .then(response => {
        // Assign the response data to prueba
        console.log(response.data);
        const datosTransformados = transformarDatos(response.data);
        setFilas(datosTransformados);
      })
      .catch(error => {
        console.error('Error fetching solicitudes:', error);
      });
    }
    datita();
   }, []);

  const manejoEdicionParar = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuidPrevented = true;
    }
  };
  const manejoEditar = (id) => () => {
    //visto por el admin, no se puede editar
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
    setidATratar(id);
    setDialogoAbierto({ aceptar: false, eliminar: true, rechazar: false });
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
      await axios.delete(`${URL_API}/solicitudes/${idATratar}`); //cambiar url
      setFilas((filasAnteriores) => filasAnteriores.filter((fila) => fila.id !== idATratar));
      setDialogoAbierto(false);
      setidATratar(null);
    } catch (error) {
      console.error('Error al eliminar la fila.', error);
    }
  };

  const manejoCancelarEliminacion = () => {
    setDialogoAbierto(false);
    setidATratar(null);
  };
  const procesarFilasModificadas = (nuevaFila) => {
    const filaModificada = { ...nuevaFila, isNew: false };
    // Actualiza filas con los nuevos valores de la fila editada
    setFilas(filas.map((fila) => (fila.id === nuevaFila.id ? filaModificada : fila)));
    return filaModificada;
  };

  const manejoAceptarOferta = (id) => () => {
    setidATratar(id);
    setDialogoAbierto({ aceptar: true, eliminar: false, rechazar: false });
  }

  const manejarAceptarOfertaBackend = () => () => {
    console.log('Se aceptó la solicitud');
    // PARA BACKEND ----------************-**----------------------
    
    setDialogoAbierto(false);
    setidATratar(null);
  }

  const manejoRechazarOferta = (id) => () => {
    setidATratar(id);
    setDialogoAbierto({ aceptar: false, eliminar: false, rechazar: true });
  }

  const manejarRechazarOfertaBackend = () => () => {
    console.log('Se rechazó la solicitud', idATratar);

    try{
      if(idATratar < 1000){
        axios.post(`${URL_API}/noAceptar/${idATratar}`);
      }else{
        axios.post(`${URL_API}/noAceptarGrupal/${idATratar}`);
      }
    }catch(error){
      console.error('Error al aceptar la solicitud.', error);
    }
    setDialogoAbierto(false);
    setidATratar(null);
  }
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
        const estado = params.row.estado;
        if (ambiente && ambiente.split(',').length === 1){
          return [];
        }else if(estado === 'Asignación rechazada' || estado === 'Asignación aceptada'){
          return []; 
        }else if (ambiente && ambiente.split(',').length > 1){
          return [
            <GridActionsCellItem
              icon={<CheckIcon />}
              label="Check"
              sx={{
                color: 'primary.main',
              }}
              onClick={manejoAceptarOferta(params.id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={manejoRechazarOferta(params.id)}
              color="inherit"
            />,
          ];
        }
        const estadoo = params.row.estado;
        if (estadoo === 'Rechazada') {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={abrirDialogoEliminar(params.id)}
              color="inherit"
            />,
          ];
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
        open={dialogoAbierto.aceptar || dialogoAbierto.eliminar || dialogoAbierto.rechazar}
        onClose={manejoCancelarEliminacion}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogoAbierto.aceptar && mensajeDialogo.aceptando}
            {dialogoAbierto.eliminar && mensajeDialogo.eliminando}
            {dialogoAbierto.rechazar && mensajeDialogo.rechazando}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={manejoCancelarEliminacion}>Cancelar</Button>
          <Button onClick={()=>{
            if (dialogoAbierto.aceptar){
              manejarAceptarOfertaBackend()();
            }else if(dialogoAbierto.rechazar){
              manejarRechazarOfertaBackend()();
            }else{
              manejoConfirmarEliminar();
            }
          }} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


export default TablaSolicitudes;