// esp
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
import { useTheme } from "../Contexts/ThemeContext";

const BarraSuperior = () => {
  const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const abierto = Boolean(anchorEl);

  const manejarAperturaMenuPerfil = (evento) => {
    setAnchorEl(evento.currentTarget);
  };

  const manejarCierreMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar elevation={2} sx={{ bgcolor: theme.highlight }}>
      <Toolbar variant="dense">
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
              Cuenta de Usuario
            </Typography>
            <Divider />
            <MenuItem onClick={manejarCierreMenu}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BarraSuperior;
