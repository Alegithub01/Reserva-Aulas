import { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '../Contexts/ThemeContext';

function Dropdown({ label, options, validationMessage = '', isRequired }) {
  const [selectedValue, setSelectedValue] = useState('');
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const { theme } = useTheme();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (isRequired){
      setShowValidationMessage(event.target.value.trim() === '' || event.target.value === None);
      console.log(event.target.value);
    }
  };

  const validationMessageStyle = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    opacity: showValidationMessage ? 1 : 0,
    height: showValidationMessage ? 'auto' : 0,
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
        {label}
      </InputLabel>
      <Select
        labelId="custom-dropdown-label"
        id="custom-dropdown"
        value={selectedValue}
        label={label}
        onChange={handleChange}
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
            color: selectedValue ? theme.primaryText : theme.secondary,
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
        {options.map((option) => (
          <MenuItem 
            key={option.value} 
            value={option.value}
            style={{ color: theme.primaryText, padding: '10px 20px' }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {showValidationMessage && (
          <div style={validationMessageStyle}>{validationMessage || 'Este campo es obligatorio'}</div>
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