import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '../Contexts/ThemeContext';

const SelectorHora = ({ etiqueta, esRequerido, ventanaCompleta, mensajeValidacion = '', min = '06:45' }) => {
  const [valorTipeado, ponerValorTipeado] = useState('');
  const [hayMensajeValidacion, ponerMensajeValidacion] = useState({
    noLlenado: false,
    rangoIncumplido: false,
  });

  const manejarPresionado = () => {
    ponerMensajeValidacion({ ...hayMensajeValidacion, noLlenado: esRequerido && valorTipeado === "" });
    console.log(hayMensajeValidacion.noLlenado);
  }
  const manejarCambio = (event) => {
    if (event.target.value < '06:45' || event.target.value > '21:45') {
      ponerMensajeValidacion({ ...hayMensajeValidacion, rangoIncumplido: true });
      return;
    }
    ponerValorTipeado(event.target.value);
    ponerMensajeValidacion({ ...hayMensajeValidacion, rangoIncumplido: false });
  }
  const estiloContenedor = {
    width: ventanaCompleta ? 'calc(100% - 0px)' : 'auto',
  }
  const entradaEtiquetaEstilo = {
    position: 'absolute',
    padding: 0,
    margin: 0,
  };

  const entradaEstilo = {
    marginTop: 0,
    heigh: 'auto',
    border: 0,
    marginLeft: 10,
    display: 'flex',
    padding: 0,
    width: '150px',
    flexDirection: 'column',
    verticalAlign: 'top',
  };

  const mensajeErrorEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    opacity: 1,
    height: 'auto',
    overflow: 'hidden'
  }
  return (
    <div style={estiloContenedor}>
      <form noValidate sx={{ margin: 10 }}>
        <TextField
          id="time"
          label={etiqueta}
          type="time"
          defaultValue="06:45"
          InputLabelProps={{
            shrink: true,
            style: entradaEtiquetaEstilo,
          }}
          inputProps={{
            step: 300,
            style: entradaEstilo,
            onChange: manejarCambio,
            onBlur: manejarPresionado,
          }}
          value={valorTipeado}
        />
      </form>
      {hayMensajeValidacion.rangoIncumplido && (
        <div style={mensajeErrorEstilo}>'La hora ingresada está fuera de servicio.'</div>
      )}

      {hayMensajeValidacion.noLlenado && (
        <div style={mensajeErrorEstilo}>{mensajeValidacion || 'No'}</div>
      )}
    </div>
  )
};

SelectorHora.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
};
export default SelectorHora;