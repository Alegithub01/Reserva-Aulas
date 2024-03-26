import React,{useState} from 'react';
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
import { randomId} from '@mui/x-data-grid-generator';

const informacion = [
  {id:1, nombre: "691A", capacidad: 100, tipo: "Aula", planta: "1", dia: "Lunes", horaInicio: "08:00", horaFin: "10:00"},
  {id:2, nombre: "691B", capacidad: 110, tipo: "Aula", planta: "1", dia: "Martes", horaInicio: "08:00", horaFin: "10:00"},
  {id:3, nombre: "691C", capacidad: 90, tipo: "Aula", planta: "1", dia: "Miercoles", horaInicio: "08:00", horaFin: "10:00"},
  {id:4, nombre: "692A", capacidad: 120, tipo: "Aula", planta: "2", dia: "Jueves", horaInicio: "08:00", horaFin: "18:45"},
  {id:5, nombre: "692B", capacidad: 125, tipo: "Aula", planta: "2", dia: "Jueves", horaInicio: "18:00", horaFin: "20:00"},
];

function EditarFilas(props) {
  const {setFilas, setFilasModificadas} = props;

  const manejoClick=()=>{
    const id = randomId();
    setFilas((filasAnteriores)=>[...filasAnteriores, {id, nombre: "", capacidad: 0, tipo: "", planta: "", dia: "", horaInicio: "", horaFin: "", esNuevo: true}]);
    setFilasModificadas((filasModificadasAnteriores)=>({
      ...filasAnteriores,
      [id]: {mode: GridRowModes.edit, fieldToFocus: "nombre"},
  }));    
  };

  // return (
  //   <GridToolbarContainer>
  //     <Button
  //       color="primary"
  //       startIcon={<AddIcon />}
  //       onClick={manejoClick}
  //     >
  //       Agregar
  //     </Button>
  //   </GridToolbarContainer>
  // );
}

export default function GridTablaCrud() {
  const [filas, setFilas] = useState(informacion);
  const [filasModificadas, setFilasModificadas] =useState({});

  const manejoEdicionParar = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuidPrevented = true;
    }
  };

  const manejoEditar =(id)=> () =>{
    setFilasModificadas((filasModificadasAnteriores)=>({
      ...filasModificadasAnteriores,
      [id]: {mode: GridRowModes.Edit},
    }));
  };

  const manejoGuardarClick =(id) => () =>{
    setFilasModificadas((filasModificadasAnteriores)=>({
      ...filasModificadasAnteriores,
      [id]: {mode: GridRowModes.View},
    }));
  };

  const manejoEliminar=(id) => () =>{
    setFilas((filasAnteriores)=>filasAnteriores.filter((fila)=>fila.id !== id));
  };

  const manejoCancelar=(id) => () =>{
    setFilasModificadas({
      ...filasModificadas,
      [id]: {mode: GridRowModes.View, ignoreModifications: true},
    });
    const filaEditada = filas.find((fila)=>fila.id === id);
    if(filaEditada.esNuevo){
      setFilas(filas.filter((fila)=>fila.id !== id));
    }
  };

  const procesarFilasModificadas =(nuevaFila) =>{
    const filaModificada = {...nuevaFila, isNew: false};
    setFilas(filas.map((fila)=>(fila.id === nuevaFila.id? filaModificada: fila)));
    return filaModificada;
  };

  const manejoFilasEnCambio =(nuevasFilasModelo) =>{
    setFilasModificadas(nuevasFilasModelo);
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', width: 80, editable: true },
    {
      field: 'capacidad',
      headerName: 'Capacidad',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'tipo',
      headerName: 'Tipo Ambiente',
      width: 60,
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
      width: 70,
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
    },
    {
      field: 'horaFin',
      headerName: 'Hora Fin',
      type: 'time',
      width: 80,
      editable: true,
    },
    {
      field: 'acciones',
      type: 'actions',
      headerName: 'Acciones',
      width: 80,
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

  return (
    <Box
      sx={{
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
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
      />
    </Box>
  );
}





//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={filas}
//         columns={[
//           { field: 'nombre', headerName: 'Nombre', width: 150, editable: true },
//           { field: 'capacidad', headerName: 'Capacidad', type: 'number', width: 150, editable: true },
//           { field: 'tipo', headerName: 'Tipo', width: 150, editable: true },
//           { field: 'planta', headerName: 'Planta', width: 150, editable: true },
//           { field: 'dia', headerName: 'Dia', width: 150, editable: true },
//           { field: 'horaInicio', headerName: 'Hora Inicio', width: 150, editable: true },
//           { field: 'horaFin', headerName: 'Hora Fin', width: 150, editable: true },
//           {
//             field: 'acciones',
//             headerName: 'Acciones',
//             width: 150,
//             sortable: false,
//             renderCell: (params) => {
//               if (params.row.esNuevo) {
//                 return (
//                   <GridActionsCellItem
//                     icon={<SaveIcon />}
//                     label="Guardar"
//                     onClick={() => manejoGuardar(params.row)}
//                   />
//                 );
//               }
//               return (
//                 <Grid
// }
