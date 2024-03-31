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
import MenuIcon from "@mui/icons-material/Menu";
import UsuarioStore from '../Contexts/UsuarioStore';
import { useTheme } from "../Contexts/ThemeContext";
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const BarraSuperior = ({ onToggleSidebar }) => {
  const { theme } = useTheme();
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
    <AppBar elevation={2} sx={{ bgcolor: theme.highlight }}>
      <Toolbar variant="dense">
        <IconButton color="inherit" onClick={() => navigate('/ModulosAdmin')}>
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
          <Typography variant="h6" noWrap>
            GESTIÓN DE AMBIENTES
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Notificaciones">
            <IconButton color="inherit" size="large">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Perfil">
            <IconButton
              edge="end"
              color="inherit"
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
  onToggleSidebar: PropTypes.func.isRequired,
};

export default BarraSuperior;
