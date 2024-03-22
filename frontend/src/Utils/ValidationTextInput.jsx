import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';

const ValidationTextInput = ({
  label,
  onChange,
  onBlur,
  fullWidth = false,
  isRequired = false,
  validationMessage = '',
  ...otherProps
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) { // Asegúrate de invocar onBlur solo si se proporciona
      onBlur(value); // Pasa el valor actual del input a la función onBlur
    }
  };
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
    setValue(event.target.value);
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: `2px solid ${isFocused ? theme.highlight : theme.secondary}`,
    borderRadius: '15px',
    transition: 'all 0.3s ease 0s',
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    position: 'absolute',
    left: '15px',
    top: isFocused || value ? '0px' : '50%',
    transform: 'translateY(-50%)',
    backgroundColor: theme.primary,
    padding: '5px',
    color: isFocused ? theme.highlight : theme.secondary,
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
    fontSize: isFocused || value ? '12px' : '16px',
  };

  const validationMessageStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px', // Ajuste para mantener el espacio
  };

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          required={isRequired}
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          style={inputStyle}
          {...otherProps}
        />
        <label style={labelStyle}>{label}</label>
      </div>
      <div style={validationMessageStyle}>
        {validationMessage || ' '} {/* Muestra un espacio en blanco si no hay mensaje */}
      </div>
    </div>
  );
};

ValidationTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  fullWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  validationMessage: PropTypes.string,
};

export default ValidationTextInput;
