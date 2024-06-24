import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import axios from 'axios';
import { URL_API } from '../services/const';

const DataGridStyled = styled(DataGrid)(({ theme }) => ({
  '.MuiDataGrid-cell': {
    fontSize: '0.93rem',
    color: 'black',
  },
  '.MuiDataGrid-root': {
    border: `3px solid ${theme.palette.primary.main}`,
  },
}));

const TableContainer = styled(Box)({
  height: '450px',
  width: 'calc(100% - 40px)',
  margin: '20px',
  padding: '20px',
  boxSizing: 'border-box',
  overflow: 'auto',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  borderRadius: '8px',
});

function UserTable() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idToDisable, setIdToDisable] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get(`${URL_API}/listaUsers`)
      .then(response => {
        setRows(response.data.map(user => ({
          id: user.id,
          nombres: user.nombres,
          apellidos: user.apellidos,
          rol_id: user.rol_id,
          rol: user.rol ? user.rol.nombre : 'Sin rol',
          email: user.email,
          estado: user.estado,
        })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    axios.get(`${URL_API}/listaRoles`)
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow) => {
    const rol = roles.find(role => role.nombre === newRow.rol);
    const updatedRow = { ...newRow, rol_id: rol ? rol.id : null };
    const updatedRows = rows.map((row) => (row.id === newRow.id ? updatedRow : row));
    setRows(updatedRows);

    console.log('Datos a enviar al backend:', updatedRow);

    axios.put(`${URL_API}/updateUser/${newRow.id}`, updatedRow)
      .then(response => {
        console.log('User updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });

    return updatedRow;
  };

  const handleDisableClick = (id) => () => {
    setIdToDisable(id);
    setDialogOpen(true);
  };

  const handleConfirmDisable = () => {
    axios.put(`${URL_API}/disableUser/${idToDisable}`)
      .then(response => {
        console.log('User disabled successfully:', response.data);
        setRows(rows.map(row => row.id === idToDisable ? { ...row, estado: 'Deshabilitado' } : row));
        setDialogOpen(false);
        setIdToDisable(null);
      })
      .catch(error => {
        console.error('Error disabling user:', error);
      });
  };

  const columns = [
    { field: 'nombres', headerName: 'Nombres', flex: 1, minWidth: 100, editable: true },
    { field: 'apellidos', headerName: 'Apellidos', flex: 1, minWidth: 100, editable: true },
    {
      field: 'rol',
      headerName: 'Rol',
      flex: 1,
      minWidth: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: roles.map(role => role.nombre),
    },
    { field: 'email', headerName: 'Correo', flex: 1, minWidth: 150, editable: true },
    { field: 'estado', headerName: 'Estado', flex: 1, minWidth: 130 },
    {
      field: 'acciones',
      type: 'actions',
      headerName: 'Acciones',
      flex: 1,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`${id}-save`}
              icon={<SaveIcon />}
              label="Guardar"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CloseIcon />}
              label="Cancelar"
              onClick={handleCancelClick(id)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            key={`${id}-edit`}
            icon={<EditIcon />}
            label="Editar"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            key={`${id}-delete`}
            icon={<DeleteIcon />}
            label="Deshabilitar"
            onClick={handleDisableClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <TableContainer>
      <DataGridStyled
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={(params, event) => event.defaultMuiPrevented = true}
        onRowEditStop={(params, event) => event.defaultMuiPrevented = true}
        processRowUpdate={processRowUpdate}
      />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas deshabilitar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDisable} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default UserTable;
