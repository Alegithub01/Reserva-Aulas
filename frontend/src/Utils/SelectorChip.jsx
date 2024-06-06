import { useState } from 'react';
import { useTheme } from '../Contexts/ThemeContext';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Proptypes from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 'auto',
    },
  },
};



function getStyles(name, valorName, theme) {
  return {
    fontWeight:
      valorName.indexOf(name) === -1
        ? theme.primaryText
        : theme.secondaryText,
  };
}

function SelectorChip({ options, changeValor, label, mensajeValidacion = "", llenado}) {
  const theme = useTheme();
  const [valorName, setvalorName] = useState([]);

  const mensajeValidacionEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    overflow: 'hidden',
  };

  const manejarPresionado = () => {
    if (llenado) {
      llenado(valorName);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setvalorName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    changeValor(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <FormControl sx={{ my: 1, width: '100%' }}>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{
            '&.Mui-focused': {
              color: theme.highlight,
              backgroundColor: 'white',
            },
            backgroundColor: 'white',
          }}
        >{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={valorName}
          onChange={handleChange}
          onBlur={manejarPresionado}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          sx={{
            '.MuiOutlinedInput-notchedOutline': {
              borderRadius: '15px',
              borderWidth: '2px',
              borderColor: theme.highlight,
              transition: 'all 0.3s ease 0s',
              '&:hover': {
                borderColor: theme.highlight,
              },
            },
            '.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.highlight,
            },

          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, valorName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <div style={mensajeValidacionEstilo}>
          {mensajeValidacion}
        </div>
      </FormControl>
    </div>
  );
}

SelectorChip.propTypes = {
  options: Proptypes.array.isRequired,
  changeValor: () => { },
  label: Proptypes.string.isRequired,
};
export default SelectorChip;