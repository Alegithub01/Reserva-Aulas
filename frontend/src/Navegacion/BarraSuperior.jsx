import { AppBar, Toolbar, IconButton, Typography, Tooltip, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../Contexts/ThemeContext';
import PropTypes from 'prop-types';

const BarraSuperior = ({ onToggleSidebar }) => {
  const { theme } = useTheme();

  return (
    <AppBar 
      elevation={2} 
      sx={{ bgcolor: theme.highlight }}
    >
      <Toolbar variant="dense">
        <IconButton color="inherit" onClick={onToggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', marginLeft: 2, marginRight: 2 }}>
          <Typography variant="h6" noWrap>
            GESTIÓN DE AMBIENTES
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Notificaciones">
            <IconButton color="inherit" size="large">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Perfil">
            <IconButton color="inherit" size="large">
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

BarraSuperior.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired
};

export default BarraSuperior;
