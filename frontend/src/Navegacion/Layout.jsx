import PropTypes from 'prop-types';
import { Box, CssBaseline } from '@mui/material';
import BarraSuperior from './BarraSuperior';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <BarraSuperior />
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