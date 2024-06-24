import PropTypes from 'prop-types';
import { Box, CssBaseline, Drawer, List } from '@mui/material';
import { useState } from 'react';
import BarraSuperior from './BarraSuperior';
import MenuItem from './MenuItem';
import IconoPersonas from '@mui/icons-material/PeopleAlt';
import IconoAmbientes from '@mui/icons-material/RoomPreferences';
import IconoReservas from '@mui/icons-material/EventNote';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AssessmentIcon from '@mui/icons-material/Assessment';

const menuItems = [
  {
    text: 'Gestión de Usuarios',
    icon: <IconoPersonas />,
    route: '/Panel-Gestion-Usuarios',
  },
  {
    text: 'Registro masivo',
    route: '/Registro-Masivo-Usuarios',
  },
  {
    text: 'Usuarios registrados',
    route: '/Lista-Usuarios',
  },
  {
    text: 'Creación de rol',
    route: '/Crear-Rol-Nuevo',
  },
  {
    text: 'Gestión de Ambientes',
    icon: <IconoAmbientes />,
    route: '/Panel-Gestion-Ambientes',
  },
  {
    text: 'Registro individual',
    route: '/Registro-Ambiente',
  },
  {
    text: 'Registro masivo',
    route: '/Registro-Masivo-Ambientes',
  },
  {
    text: 'Ambientes registrados',
    route: '/Lista-Ambientes',
  },
  {
    text: 'Publicar Reglas',
    route: '/Publicacion-Reglas',
  },
  {
    text: 'Gestión de Reservas',
    icon: <IconoReservas />,
    route: '/Panel-Gestion-Reservas',
  },
  {
    text: 'Buscar Ambientes',
    route: '/Buscar-Ambiente',
  },
  {
    text: 'Administrar Solicitudes',
    route: '/Solicitudes',
  },
  {
    text: 'Informes',
    icon: <AssessmentIcon />,
    route: '/Panel-Informes',
  },
  {
    text: 'Informe de Ambientes',
    route: '/Ambientes-Solicitados',
  },
  {
    text: 'Informe de Fechas',
    route: '/Fechas-Demandadas',
  },
];

const Layout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <CssBaseline />
      <BarraSuperior />
      <Drawer
        variant="permanent"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: 'fixed',
          zIndex: 1300,
          width: isExpanded ? 'auto' : 60,
          '& .MuiDrawer-paper': {
            width: isExpanded ? 300 : 60,
            transition: 'width 0.3s',
            justifyContent: 'center',
            backgroundColor: '#892B39',
            color: 'white',
            overflowX: 'hidden',
            boxSizing: 'border-box',
          },
        }}
      >
        <List sx={{ padding: 0 }}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.text}
              route={item.route}
              isExpanded={isExpanded}
            />
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0, position: 'relative' }}>
        {children}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
