import { useState } from 'react';
import { IconButton, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import MailIcon from '@mui/icons-material/Mail';


const drawerWidth = 240;

const BarraLateral = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: open ? drawerWidth : 0, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {/* {open ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            {/* <MailIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Correo" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default BarraLateral;
