import {useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import { Select as BaseSelect, selectClasses } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '../Contexts/ThemeContext';

const MultiSelect = forwardRef(function CustomMultiSelect(props, ref) {
  const slots = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} multiple ref={ref} slots={slots} />;
});

SelectorMultiple.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popup: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
};

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Button = forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const StyledButton = styled('button', { shouldForwardProp: () => true })(
  ({ theme }) => `
  
  font-size: 0.875rem;
  height: auto;
  min-height: 40px;
  padding: 10px 20px;
  border-radius: 15px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 2px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  position: relative;

  transition: all 0.3s ease;
  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 15px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  `,
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  transition: border-radius 300ms ease;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  @supports selector(:has(*)) {
    &.${optionClasses.selected} {
      & + .${optionClasses.selected} {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }

      &:has(+ .${optionClasses.selected}) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const Popup = styled('div')`
  z-index: 1;
`;

function SelectorMultiple({etiqueta, opciones, cambio, llenado=null, esRequerido, mensajeValidacion="", ...otherProps}) {
  const [valorSeleccionado, cambiarValorSeleccionado] = useState([]);
  const [deslizManual, cambiarDeslizManual] = useState(false);
  const {theme} = useTheme();
  
  const manejarPresionado = () => {
    if(llenado){
      llenado(valorSeleccionado);
    }
    cambiarDeslizManual(true);
  };

  const manejarCambio = (event) => {
    const valor = event.target.value;
    console.log("valoooor", valor);
    if(!valorSeleccionado.includes(event.target.value)){
      cambiarValorSeleccionado([...valorSeleccionado, event.target.value]);
    }
    console.log("aca funciona", valorSeleccionado);
  };
  const mensajeValidacionEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    overflow: 'hidden',
  };
  return(
    <FormControl fullWidth size="small" sx={{}}>
      <InputLabel 
        id="custom-dropdown-label" 
        sx={{
          height: 'auto',
          padding: '0px',
          color: deslizManual? theme.highlight : theme.secondary,
          transform: deslizManual ? 'translate(14px, -6px) scale(0.75)': 'translate(14px, 16px) scale(1)',
          
        }}
      >
        {etiqueta}
      </InputLabel>
       <MultiSelect
         labelid="custom-dropdown-label"
         id="custom-dropdown"
         //value={valorSeleccionado}
         label={etiqueta}
        onChange={manejarCambio}
        onBlur={manejarPresionado}
        InputLabelProps={{
          shrink: true,
          style: {
            height: 'auto',
            padding: '0px',
            color: theme.secondary,
            transform: 'translate(14px, -6px) scale(0.75)',
          },

        }}
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
          <Option value={opcion.value}>
            {opcion.label}
          </Option>
        ))}
        </MultiSelect> 

       <div style={mensajeValidacionEstilo}>
        {mensajeValidacion}
        </div> 
  {/* <MultiSelect >
       <Option value={10}>Ten</Option>
      <Option value={20}>Twenty</Option>
      <Option value={30}>Thirty</Option>
      <Option value={40}>Forty</Option>
      <Option value={50}>Fifty</Option>
    </MultiSelect> */}

    </FormControl>); 
}

SelectorMultiple.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  opciones: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  cambio: PropTypes.func.isRequired,
  llenado: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  esRequerido: PropTypes.bool,
  mensajeValidacion: PropTypes.string,
};
export default SelectorMultiple;