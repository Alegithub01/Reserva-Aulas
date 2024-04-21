import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '../Contexts/ThemeContext';

const EntradaFecha = ({etiqueta, enCambio, onBlur = null, mensajeValidacion}) => {
  const [valor, setValor] = useState(null);
  const { theme } = useTheme();
  let mostrarMensajeDeError = true;

  const manejarCambio = (event) => {
    console.log(event.target.value, typeof event.target.value)
    if(enCambio){
        enCambio(event.target.value);
    }
    setValor(event.target.value);
    mostrarMensajeDeError = false;
  };
  
  const manejarPresionado = () => {
    onBlur && onBlur(valor);
    mostrarMensajeDeError = false;
  };
  return (
    <FormControl fullWidth size="small">
    
    <TextField
        id="date"
        label={etiqueta}
        type="date"
        value={valor}
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
        
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '15px',
            borderWidth: '2px',
            borderColor: theme.secondary,
            color: theme.secondary,
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: theme.highlight,
            },
          },
          '&.MuiFocused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.highlight,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.highlight,
          },
          '&:active .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.highlight,
          },

          '.MuiInputBase-input': {
            color: valor? 'black' : theme.secondary,
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
}

EntradaFecha.propTypes = {
  etiqueta: PropTypes.string,
  enCambio: PropTypes.func,
  onBlur: PropTypes.func,
  mensajeValidacion: PropTypes.string
};

export default EntradaFecha;