// esp
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import UsuarioStore from '../Contexts/UsuarioStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BarraSuperior = () => {
  const { nombre, correo } = UsuarioStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const abierto = Boolean(anchorEl);
  const navigate = useNavigate();

  const manejarCierreSesion = () => {
    navigate('/');
  };

  const manejarAperturaMenuPerfil = (evento) => {
    setAnchorEl(evento.currentTarget);
  };

  const manejarCierreMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar elevation={0} sx={{ bgcolor: 'transparent', position: 'absolute', zIndex: 1400 }}>
      <Toolbar variant="dense">
        <IconButton style={{ color: '#333' }} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            marginLeft: 2,
            marginRight: 2,
          }}
        >
        </Box>
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Notificaciones">
            <IconButton style={{ color: '#333' }} size="large">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Perfil">
            <IconButton
              edge="end"
              style={{ color: '#333' }}
              size="large"
              onClick={manejarAperturaMenuPerfil}
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={abierto}
            onClose={manejarCierreMenu}
          >
            <Typography
              color="textSecondary"
              display="block"
              variant="body1"
              sx={{
                paddingX: 2,
                paddingY: 1,
              }}
            >
              {nombre}
              <br />
              {correo}
            </Typography>
            <Divider />
            <MenuItem onClick={manejarCierreSesion}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

BarraSuperior.propTypes = {
};

export default BarraSuperior;
