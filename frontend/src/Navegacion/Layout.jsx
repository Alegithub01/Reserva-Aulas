import PropTypes from 'prop-types';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import BarraSuperior from './BarraSuperior';

const Layout = ({ children }) => {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BarraSuperior/>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Toolbar variant="dense" />
        {children}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;