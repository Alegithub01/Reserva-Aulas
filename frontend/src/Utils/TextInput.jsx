import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';

const TextInput = ({
  label,
  onChange,
  onBlur = null,
  fullWidth = false,
  isRequired = false,
  validationMessage = '',
  pattern = ".*",
  rango,
  cambio,
  ...otherProps
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState('');
  const [showValidationMessage, setShowValidationMessage] = useState({
    noLlenado: false,
    rangoIncumplido: false
  });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(value);
    }
    // setShowValidationMessage({ ...showValidationMessage, noLlenado: isRequired && value.trim() === ''});
  };

  const handleChange = (event) => {
    const valor = event.target.value;
    if (onChange) {
      onChange(event);
    }
    if (pattern && RegExp(pattern).test(valor)) {
      setValue(valor);
    }
    if (rango) {
      setShowValidationMessage(previo => ({ ...previo, rangoIncumplido: (rango.min > parseInt(valor) || rango.max < parseInt(valor)) }));
    }
    if (isRequired) {
      setShowValidationMessage(previo => ({ ...previo, noLlenado: valor.trim() === '' }));
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    cambio && cambio(value);
  }, [value, cambio]);

  const containerStyle = {
    width: fullWidth ? 'calc(100% - 0px)' : 'auto',
    boxSizing: 'border-box',
  };

  const inputGroupStyle = {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: `2px solid ${isFocused || isHovered ? theme.highlight : theme.secondary}`, // Cambiado a theme.highlight
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
    color: isFocused ? theme.highlight : (value ? theme.secondaryText : theme.secondary),
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
    fontSize: isFocused || value ? '12px' : '16px',

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
    <div style={containerStyle}>
      <div style={inputGroupStyle}>
        <input
          type="text"
          required={isRequired}
          pattern={pattern}
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          value={value}
          style={inputStyle}
          {...otherProps}
        />
        <label style={labelStyle}>{label}</label>
      </div>
      {
        showValidationMessage.rangoIncumplido ?
          (
            <div style={validationMessageStyle}>La cantidad debe ser mayor a {rango.min} y menor a {rango.max}.</div>
          ) : (
            <div style={validationMessageStyle}>{validationMessage}</div>
          )
      }
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  validationMessage: PropTypes.string,
};

export default TextInput;
