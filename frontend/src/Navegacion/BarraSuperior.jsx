import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';

const BarraSuperior = () => {
  const [anchorElPerfil, setAnchorElPerfil] = useState(null);
  const abiertoPerfil = Boolean(anchorElPerfil);
  const [anchorElNotificaciones, setAnchorElNotificaciones] = useState(null);
  const abiertoNotificaciones = Boolean(anchorElNotificaciones);
  const navigate = useNavigate(); 

  const manejarCierreSesion = () => {
    navigate('/');
  };

  const manejarAperturaMenuPerfil = (evento) => {
    if (anchorElPerfil) {
      setAnchorElPerfil(null);
    } else {
      setAnchorElPerfil(evento.currentTarget);
    }
  };

  const manejarCierreMenu = () => {
    setAnchorElPerfil(null);
  };

  const manejarAperturaNotificaciones = (evento) => {
    if (anchorElNotificaciones) {
      setAnchorElNotificaciones(null);
    } else {
      setAnchorElNotificaciones(evento.currentTarget);
    }
  };

  const manejarCierreNotificaciones = () => {
    setAnchorElNotificaciones(null);
  };

  return (
    <AppBar elevation={0} sx={{ bgcolor: 'transparent', position: 'absolute', zIndex: 1400 }}>
      <Toolbar variant="dense">
        <IconButton style={{ color: 'white' }} onClick={() => navigate(-1)}>
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
        {localStorage.getItem('rol') === '1' && (
          <Box sx={{display: "flex"}}>
            <Tooltip title="Configuración">
              <IconButton style={{ color: 'white' }} size="large" onClick={() => navigate('/Ajustar-Solicitudes')}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Perfil">
            <IconButton
              edge="end"
              style={{ color: 'white' }}
              size="large"
              onClick={manejarAperturaMenuPerfil}
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElPerfil}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={abiertoPerfil}
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
              {localStorage.getItem('nombre')}
              <br />
              {localStorage.getItem('correo')}
            </Typography>
            <Divider />
            <MenuItem onClick={manejarCierreSesion}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BarraSuperior;
