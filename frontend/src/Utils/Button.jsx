// src/components/Button.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';

const Button = ({ children, onClick, disabled, fullWidth, ...rest }) => {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const styles = {
    button: {
      padding: '0.6em 3em',
      fontSize: '16px',
      letterSpacing: '1px',
      fontWeight: '500',
      color: theme.primary,
      backgroundColor: theme.highlight,
      border: 'none',
      borderRadius: '15px',
      boxShadow: isPressed ? '0px 5px 20px rgba(54, 97, 235, 0.4)' : '0px 8px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease 0s',
      cursor: 'pointer',
      outline: 'none',
      transform: isPressed ? 'translateY(4px)' : 'none',
      width: fullWidth ? '100%' : 'auto'
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={styles.button}
      onMouseOver={(e) => e.currentTarget.style.boxShadow = '0px 5px 20px rgba(54, 97, 235, 0.4)'} 
      onMouseOut={(e) => e.currentTarget.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)'}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default Button;

{/* <Button onClick={miFuncionManejadora} fullWidth={true}>Mi Botón</Button> */}

