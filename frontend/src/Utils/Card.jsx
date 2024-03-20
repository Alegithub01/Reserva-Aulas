import PropTypes from 'prop-types';

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
  borderRadius = '10px'
}) => {
  const styles = {
    card: {
      display: 'flex',
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
    },
  };

  return <div style={styles.card}>{children}</div>;
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
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string
};

export default Card;

{/* <Card
  minWidth="300px"
  maxWidth="500px"
  minHeight="300px"
  fullWidth
  fullHeight
  alignCenter
  margin="20px"
  padding="20px"
  borderRadius="0"
>
</Card> */}