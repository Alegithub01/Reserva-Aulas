import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '../Contexts/ThemeContext';

const SelectorHora = ({
  etiqueta,
  esRequerido,
  ventanaCompleta,
  mensajeValidacion = "",
  enCambio,
  minimaHora,
  vacio = false,
  onBlur = null
}) => {
  const { theme } = useTheme();
  const [valorTipeado, ponerValorTipeado] = useState('');

  useEffect(() => {
    enCambio && enCambio(valorTipeado);
  }, [valorTipeado, enCambio]);

  const manejarCambio = (event) => {
    const nuevaHora = event.target.value;
    if ((minimaHora && nuevaHora < minimaHora) || nuevaHora < '06:45' || nuevaHora > '21:45') {
      // Se puede añadir una lógica para manejar un mensaje de error aquí
      // o usar una función externa para la validación
    } else {
      ponerValorTipeado(nuevaHora);
    }
  };

  const manejarPresionado = () => {
    onBlur && onBlur(valorTipeado);
  };

  const inputStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '15px',
    transition: 'border-color 0.3s ease',
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box',
    border: `2px solid ${theme.secondary}`,
    color: theme.primaryText,
    '&:hover': {
      borderColor: theme.highlight,
    },
    '&.Mui-focused': {
      borderColor: theme.highlight,
    },
  };

  const mensajeValidacionEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    opacity: esRequerido && !valorTipeado ? 1 : 0,
    height: esRequerido && !valorTipeado ? 'auto' : 0,
    overflow: 'hidden',
  };
  const mostrarMensajeDeError = esRequerido && !valorTipeado;
  return (
    <FormControl fullWidth size="small">
      <TextField
        id="time"
        label={etiqueta}
        type="time"
        defaultValue="06:45"
        value={valorTipeado}
        onChange={manejarCambio}
        onBlur={manejarPresionado}
        InputLabelProps={{
          shrink: true,
          style: {
            color: theme.secondary,
            '&.Mui-focused': {
              color: theme.highlight,
            },
            '&:hover': {
      borderColor: theme.highlight,
    },
          },
        }}
        inputProps={{
          step: 300, // 5 minutos
        }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '15px',
            borderWidth: '2px',
            borderColor: theme.secondary,
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: theme.highlight,
            },
            
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.highlight,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.highlight,
          },
          '&:active .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.highlight,
          },

          '.MuiInputBase-input': {
            color: valorTipeado ? 'black' : 'black',
            padding: '10px 20px',
            borderColor: theme.highlight,
          },
          '.MuiPaper-root': {
            backgroundColor: theme.highlight,
          },
          '& .MuiMenuItem-root:hover': {
            backgroundColor: theme.highlight,
          }
        }}
        variant="outlined"
      />
      {mostrarMensajeDeError && (
        <div style={{
          color: 'red',
          fontSize: '12px',
          transition: 'opacity 0.3s ease',
          opacity: 1,
          height: 'auto',
          overflow: 'hidden'
        }}>
          {mensajeValidacion}
        </div>
      )}
    </FormControl>
  );
};

SelectorHora.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  esRequerido: PropTypes.bool,
  ventanaCompleta: PropTypes.bool,
  mensajeValidacion: PropTypes.string,
  enCambio: PropTypes.func,
  minimaHora: PropTypes.string,
  vacio: PropTypes.bool,
  onBlur: PropTypes.func,
};

export default SelectorHora;
