import { AppBar, Toolbar, Typography } from '@mui/material';

const BarraSuperior = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Nombre
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default BarraSuperior;
