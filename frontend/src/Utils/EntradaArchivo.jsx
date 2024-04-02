import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';

const EntradaArchivo = ({ onChange, disabled, ...rest }) => {
  const { theme } = useTheme();

  const styles = {
    label: {
      display: 'inline-block',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '100%',
    },
    input: {
      display: 'none',
    },
    visibleSpan: {
      display: 'block',
      padding: '0.4em 2em',
      letterSpacing: '1px',
      color: theme.primary,
      backgroundColor: theme.highlight,
      borderRadius: '15px',
      width: '100%',
      maxWidth: '100%',
      textAlign: 'center',
    }
  };

  return (
    <label style={styles.label}>
      <input
        type="file"
        onChange={onChange}
        disabled={disabled}
        style={styles.input}
        onMouseOver={(e) => e.currentTarget.nextSibling.style.boxShadow = '0px 5px 20px rgba(54, 97, 235, 0.4)'} 
        onMouseOut={(e) => e.currentTarget.nextSibling.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)'}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        {...rest}
      />
      <span style={styles.visibleSpan}>
        Subir archivo
      </span>
    </label>
  );
};

EntradaArchivo.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default EntradaArchivo;
