// Nuevo componente para la barra lateral
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

const BarraLateral = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List>
        <ListItem button>
          <ListItemText primary="a" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="b" />
        </ListItem>
      </List>
    </Drawer>
  );
};

BarraLateral.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default BarraLateral;