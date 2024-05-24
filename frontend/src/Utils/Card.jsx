import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

const Card = ({
  children,
  minWidth,
  maxWidth,
  minHeight,
  fullWidth = false,
  fullHeight = false,
  alignCenter = false,
  margin = '5px',
  padding = '20px',
  borderRadius = '10px',
  block = false,
  isLoading = false,
}) => {
  const styles = {
    card: {
      display: block ? 'block' : 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      justifyContent: alignCenter ? 'center' : 'flex-start',
      alignItems: alignCenter ? 'center' : 'stretch',
      minWidth: minWidth,
      maxWidth: maxWidth,
      minHeight: minHeight,
      width: fullWidth ? 'calc(100% - 2 * ' + margin + ')' : 'auto',
      height: fullHeight ? 'calc(100% - 2 * ' + margin + ')' : 'auto',
      margin: margin,
      padding: padding,
      borderRadius: borderRadius,
      boxSizing: 'border-box',
      boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',
      position: 'relative',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }
  };

  return (
    <div style={styles.card}>
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <CircularProgress />
        </div>
      )}
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  alignCenter: PropTypes.bool,
  margin: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  block: PropTypes.bool,
  isLoading: PropTypes.bool, 
};

export default Card;