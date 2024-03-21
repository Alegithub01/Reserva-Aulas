import { AppBar, Toolbar, IconButton, Typography, Tooltip, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '../Contexts/ThemeContext';

const BarraSuperior = () => {
  const { theme } = useTheme();
  return (
    <AppBar 
      elevation={2} 
      sx={{ bgcolor: theme.highlight }}
    >
      <Toolbar variant="dense">
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

export default BarraSuperior;
