import { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '../Contexts/ThemeContext';

function obtenerEstilos(hora, valorSeleccionado, theme) {
  return {
    fontWeight:
      valorSeleccionado.indexOf(hora) === -1
        ? theme.primaryText
        : theme.secondaryText,
  };
}

function SelectorMultiple({ etiqueta, opciones, cambio, valorInicial = [], llenado = null, esRequerido, mensajeValidacion = "" }) {
  const [valorSeleccionado, cambiarValorSeleccionado] = useState(valorInicial|| []);
  const { theme } = useTheme();

  const mensajeValidacionEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    overflow: 'hidden',
  };

  const manejarPresionado = () => {
    if (llenado) {
      llenado(valorSeleccionado);
    }
  };

  const manejarCambio = (event) => {
    const {
      target: { value },
    } = event;
    cambio && cambio(typeof value === 'string' ? value.split(',') : value,);
    cambiarValorSeleccionado(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  return (
    <div>
    <FormControl fullWidth size="small" sx={{}}>
      <InputLabel
        id="demo-multiple-name-label"
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
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={valorSeleccionado}
        // label={etiqueta}
        onChange={manejarCambio}
        onBlur={manejarPresionado}
        input={<OutlinedInput label="Periodos de hora" />}
        // MenuProps={MenuProps}
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
            color: valorSeleccionado ? theme.primaryText : theme.secondary,
            padding: '10px 20px',
            borderColor: theme.highlight,
            height: 'auto',
            whiteSpace: 'normal',
          },
          '.MuiPaper-root': {
            backgroundColor: theme.highlight,
          },
          '& .MuiMenuItem-root:hover': {
            backgroundColor: theme.highlight,
          },
        }}
      >
        {opciones.map((opcion) => (
          <MenuItem
            key={opcion.value}
            value={opcion.value}
            style={{
              backgroundColor: valorSeleccionado.includes(opcion.value) ? '#677FCE' : 'transparent',
              color: valorSeleccionado.includes(opcion.value) ? 'white' : 'black',
            }}
          >
            {opcion.label}
          </MenuItem>
        ))}
      </Select>

      <div style={mensajeValidacionEstilo}>
        {mensajeValidacion}
      </div>

    </FormControl>
    </div>);
}

SelectorMultiple.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  opciones: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  cambio: PropTypes.func.isRequired,
  valorInicial: PropTypes.array,
  llenado: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  esRequerido: PropTypes.bool,
  mensajeValidacion: PropTypes.string,
};
export default SelectorMultiple;