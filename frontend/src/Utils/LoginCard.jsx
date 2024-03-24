import PropTypes from 'prop-types';

const LoginCard = ({
    minWidth = '500px',
    maxWidth = '800px',
    minHeight = '400px',
    fullWidth = false,
    fullHeight = false,
    borderColor = 'red',
    borderRadius = '10px',
    colorLeft = '#0000FF',
    colorRight = '#FF0000',
  }) => {
    const styles = {
      card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        minWidth: minWidth,
        maxWidth: maxWidth,
        minHeight: minHeight,
        width: fullWidth ? '100%' : 'auto',
        height: fullHeight ? '100%' : 'auto',
        margin: 'auto',
        padding: 0,
        borderRadius: borderRadius,
        borderColor: borderColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',
      },
      half: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        height: '100%',
        padding: '20px',
      },
      left: {
        backgroundColor: colorLeft,
        width: '40%',
      },
      right: {
        backgroundColor: colorRight,
        width: '60%',
      }
    };
  
    return (
      <div style={styles.card}>
        <div style={{ ...styles.half, ...styles.left }}>
          {/* lado izquierdo */}
        </div>
        <div style={{ ...styles.half, ...styles.right }}>
          {/* lado derecho */}
        </div>
      </div>
    );
  };
  
  LoginCard.propTypes = {
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    minHeight: PropTypes.string,
    fullWidth: PropTypes.bool,
    fullHeight: PropTypes.bool,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.string,
    colorLeft: PropTypes.string,
    colorRight: PropTypes.string,
  };

export default LoginCard;
