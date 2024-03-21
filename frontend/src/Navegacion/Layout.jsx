import PropTypes from 'prop-types';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import BarraSuperior from './BarraSuperior';
import BarraLateral from './BarraLateral';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BarraSuperior />
      <BarraLateral />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0 }}
      >
        <Toolbar variant="dense"/>
        {children}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
