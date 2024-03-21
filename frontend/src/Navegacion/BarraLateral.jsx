import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  BookOnline,
  RoomService,
  Group,
  ChevronRight,
} from "@mui/icons-material";
import PropTypes from "prop-types";

const BarraLateral = ({ isOpen, onClose, username }) => {
  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div style={{ padding: 16, textAlign: "center" }}>
        <AccountCircle style={{ fontSize: 60 }} />
        <p>{username}</p>
      </div>
      <Divider />

      <List>
        <ListItem button onClick={handleListItemClick}>
          <ListItemIcon>
            <BookOnline />
          </ListItemIcon>
          <ListItemText primary="Gestión de reservas" />
          <ChevronRight />
        </ListItem>
        <ListItem button onClick={handleListItemClick}>
          <ListItemIcon>
            <RoomService />
          </ListItemIcon>
          <ListItemText primary="Gestión de ambientes" />
          <ChevronRight />
        </ListItem>
        <ListItem button onClick={handleListItemClick}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Gestión de Usuarios" />
          <ChevronRight />
        </ListItem>
      </List>
    </Drawer>
  );
};

BarraLateral.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default BarraLateral;
