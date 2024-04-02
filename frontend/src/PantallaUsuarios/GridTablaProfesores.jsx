import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Caja from '@mui/material/Box';
import IconoEditar from '@mui/icons-material/Edit';
import IconoEliminar from '@mui/icons-material/DeleteOutlined';
import IconoGuardar from '@mui/icons-material/Save';
import IconoCancelar from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

const profesores = [
  { id: 1, nombres: "Juan Carlos", apellidos: "Pérez Peredo", rol: "Docente", correo: "juan.perez@gmail.com" },
  { id: 2, nombres: "Ana Luisa", apellidos: "Gómez Gonzales", rol: "Administrativo", correo: "ana.gomez@gmail.com" },
  { id: 3, nombres: "Luis Alfredo", apellidos: "Martínez Mercedez", rol: "Docente", correo: "luis.martinez@gmail.com" },
];

const roles = [
  { nombre: 'Docente', descripcion: 'Persona que enseña xD' },
  { nombre: 'Administrativo', descripcion: '...' },
  { nombre: 'Administrativo2', descripcion: '...' },
];

const DataGridEstilizado = styled(DataGrid)({
  '.MuiDataGrid-cell': {
    fontSize: '0.93rem',
    color: 'black',
  },
  '.MuiDataGrid-root': {
    border: `3px solid pink`,
    height: '100%', 
    width: 'calc(100% - 20px)',
  },
});

function TablaProfesores() {
  const [filas, setFilas] = useState(profesores);
  const [modeloModoFila, setModeloModoFila] = useState({});
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  const manejarClickEditar = (id) => () => {
    setModeloModoFila({ ...modeloModoFila, [id]: { mode: GridRowModes.Edit } });
  };

  const manejarClickGuardar = (id) => () => {
    setModeloModoFila({ ...modeloModoFila, [id]: { mode: GridRowModes.View } });
  };

  const manejarClickEliminar = (id) => () => {
    setFilas(filas.filter((fila) => fila.id !== id));
  };

  const manejarClickCancelar = (id) => () => {
    setModeloModoFila({
      ...modeloModoFila,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const procesarActualizacionFila = (nuevaFila) => {
    const filasActualizadas = filas.map((fila) => (fila.id === nuevaFila.id ? nuevaFila : fila));
    setFilas(filasActualizadas);
    return nuevaFila;
  };

  const abrirDialogoEliminar = (id) => () => {
    setIdAEliminar(id);
    setDialogoAbierto(true);
  };

  const manejarConfirmarEliminar = () => {
    setFilas(filas.filter((fila) => fila.id !== idAEliminar));
    setDialogoAbierto(false);
    setIdAEliminar(null);
  };

  const columnas = [
    { field: 'nombres', headerName: 'Nombres', flex: 1, minWidth: 100, editable: true },
    { field: 'apellidos', headerName: 'Apellidos', flex: 1, minWidth: 100, editable: true },
    {
      field: 'rol',
      headerName: 'Rol',
      flex: 1,
      minWidth: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: roles.map(rol => rol.nombre),
    },
    { field: 'correo', headerName: 'Correo', flex: 1, minWidth: 150, editable: true },
    {
      field: 'acciones',
      type: 'actions',
      headerName: 'Acciones',
      flex: 1,
      getActions: ({ id }) => {
        const enModoEdicion = modeloModoFila[id]?.mode === GridRowModes.Edit;
        if (enModoEdicion) {
          return [
            <GridActionsCellItem
              key={`${id}-guardar`}
              icon={<IconoGuardar />}
              label="Guardar"
              onClick={manejarClickGuardar(id)}
            />,
            <GridActionsCellItem
              key={`${id}-cancelar`}
              icon={<IconoCancelar />}
              label="Cancelar"
              onClick={manejarClickCancelar(id)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            key={`${id}-editar`}
            icon={<IconoEditar />}
            label="Editar"
            onClick={manejarClickEditar(id)}
          />,
          <GridActionsCellItem
            key={`${id}-eliminar`}
            icon={<IconoEliminar />}
            label="Eliminar"
            onClick={abrirDialogoEliminar(id)}
          />,
        ];
      },
    },
  ];

  return (
    <>
    <Caja sx={{ height: '100%', width: '100%' }}>
      <DataGridEstilizado
        rows={filas}
        columns={columnas}
        editMode="row"
        rowModesModel={modeloModoFila}
        onRowModesModelChange={setModeloModoFila}
        processRowUpdate={procesarActualizacionFila}
        onRowEditStop={(params, event) => {
          if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
          }
        }}
        sx={{
          '& .MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
        components={{
          NoRowsOverlay: () => <div>No hay profesores disponibles.</div>,
        }}
      />
    </Caja>
    <Dialog
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoAbierto(false)}>Cancelar</Button>
          <Button onClick={manejarConfirmarEliminar} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
}

export default TablaProfesores;
