import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '../Contexts/ThemeContext';

function Dropdown({ etiqueta, opciones, mensajeValidacion = '', esRequerido, cambio, valorInicial = [], onBlur = null, multiple = false, ...otherProps }) {
  const { theme } = useTheme();

  const manejarCambio = (event) => {
    const valor = event.target.value;
    cambio && cambio(valor);
  };

  const manejarPresionado = () => {
    if (onBlur) {
      onBlur(valorInicial);
    }
  };

  const mostrarMensajeDeError = esRequerido && (!valorInicial || valorInicial.length === 0);

  return (
    <FormControl fullWidth size="small" sx={{}}>
      <InputLabel id="custom-dropdown-label" shrink={!!valorInicial.length}>
        {etiqueta}
      </InputLabel>
      <Select
        labelId="custom-dropdown-label"
        id="custom-dropdown"
        multiple={multiple}
        value={valorInicial}
        label={etiqueta}
        onChange={manejarCambio}
        onBlur={manejarPresionado}
        renderValue={selected => typeof selected === 'string' ? selected : selected.join(', ')}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '15px',
            borderWidth: '2px',
            borderColor: theme.secondary,
            transition: 'all 0.3s ease 0s',
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
          '.MuiSelect-select': {
            color: valorInicial.length ? theme.primaryText : theme.secondary,
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
      >
        {opciones.map(opcion => (
          <MenuItem key={opcion.value} value={opcion.value}>
            {opcion.label}
          </MenuItem>
        ))}
      </Select>
      <div style={{ color: 'red', opacity: mostrarMensajeDeError ? 1 : 0 }}>
        {mensajeValidacion}
      </div>
    </FormControl>
  );
}

Dropdown.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  opciones: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  mensajeValidacion: PropTypes.string,
  esRequerido: PropTypes.bool,
  valorInicial: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  multiple: PropTypes.bool,
  cambio: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Dropdown;
