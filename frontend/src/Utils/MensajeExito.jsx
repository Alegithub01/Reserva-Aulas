import { useState, forwardRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../Utils/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MensajeExito({mensaje, cerrarDialogo, abrirDialogo}) {

  return (
      <>
      <Dialog
        open={abrirDialogo}
        TransitionComponent={Transition}
        keepMounted
        onClose={cerrarDialogo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"¡ÉXITO!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {mensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarDialogo}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

MensajeExito.propTypes = {
    mensaje: PropTypes.string.isRequired,
    cerrarDialogo: PropTypes.func.isRequired,
    abrirDialogo: PropTypes.func.isRequired,
}

export default MensajeExito;