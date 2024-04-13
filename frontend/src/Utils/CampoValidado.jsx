import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ValidationTextInput = ({
  label,
  onChange,
  onBlur,
  fullWidth = false,
  isRequired = false,
  validationMessage = '',
  type = 'text',
  ...otherProps
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(value);
    }
  };
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
    setValue(event.target.value);
  };

  const toggleStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const inputStyle = {
    padding: '10px 40px 10px 10px',
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
    paddingLeft: '5px',
    paddingRight: '5px',
    color: isFocused ? theme.highlight : theme.secondary,
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
    fontSize: isFocused || value ? '12px' : '16px',
  };

  const validationMessageStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px',
  };

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type={inputType}
          required={isRequired}
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          style={inputStyle}
          {...otherProps}
        />
        {type === 'password' && (
          <span style={toggleStyle} onClick={togglePasswordVisibility}>
            {inputType === 'password' ? (
              <Visibility style={{ color: theme.secondary }} />
            ) : (
              <VisibilityOff style={{ color: theme.secondary }} />
            )}
          </span>
        )}
        <label style={labelStyle}>{label}</label>
      </div>
      <div style={validationMessageStyle}>
        {validationMessage || ' '} 
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
  type: PropTypes.string,
};

export default ValidationTextInput;
