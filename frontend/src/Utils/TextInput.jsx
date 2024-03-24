import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';

const TextInput = ({
  label,
  onChange,
  fullWidth = false,
  isRequired = false,
  validationMessage = '',
  ...otherProps
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState('');
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setShowValidationMessage(isRequired && value.trim() === '');
  };
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
    setValue(event.target.value);
    if (isRequired) {
      setShowValidationMessage(event.target.value.trim() === '');
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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
      {showValidationMessage && (
          <div style={validationMessageStyle}>{validationMessage || 'Este campo es obligatorio'}</div>
        )}
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
