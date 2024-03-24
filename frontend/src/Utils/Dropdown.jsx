import { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '../Contexts/ThemeContext';

function Dropdown({ etiqueta, opciones, mensajeValidacion = '', esRequerido }) {
  const [valorSeleccionado, cambiarValorSeleccionado] = useState('');
  const [presionado, cambiarPresionado] = useState(false);
  const { theme } = useTheme();

  const manejarCambio = (event) => {
    cambiarValorSeleccionado(event.target.value);
  }
  const manejarPresionado = () => {
    cambiarPresionado(true);
  }
  const mostrarMensajeDeError = esRequerido && presionado && !valorSeleccionado;
  
  const mensajeValidacionEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    opacity: mostrarMensajeDeError ? 1 : 0,
    height: mostrarMensajeDeError ? 'auto' : 0,
    overflow: 'hidden',
  };

  return (
    <FormControl fullWidth size="small" sx={{}}>
      <InputLabel 
        id="custom-dropdown-label" 
        sx={{
          height: 'auto',
          padding: '0px',
          color: theme.secondary,
          '.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
            color: theme.highlight,
          },
        }}
      >
        {etiqueta}
      </InputLabel>
      <Select
        labelId="custom-dropdown-label"
        id="custom-dropdown"
        value={valorSeleccionado}
        label={etiqueta}
        onChange={manejarCambio}
        onBlur={manejarPresionado}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '15px',
            borderWidth: '2px',
            borderColor: theme.secondary,
            transition: 'all 0.3s ease 0s',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.highlight,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.highlight,
          },
          '.MuiSelect-select': {
            color: valorSeleccionado ? theme.primaryText : theme.secondary,
            padding: '10px 20px',
          },
          '.MuiPaper-root': {
            backgroundColor: theme.highlight,
          },
          '& .MuiMenuItem-root:hover': {
            backgroundColor: theme.highlight,
          }
        }}
      >
        {opciones.map((opcion) => (
          <MenuItem 
            key={opcion.value} 
            value={opcion.value}
            style={{ color: theme.primaryText, padding: '10px 20px' }}>
            {opcion.label}
          </MenuItem>
        ))}
      </Select>
      {mostrarMensajeDeError && (
          <div style={mensajeValidacionEstilo}>{mensajeValidacion || 'Este campo es obligatorio'}</div>
        )}
    </FormControl>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default Dropdown;