import PropTypes from 'prop-types';

const regularTextSize = 22;
const styles = {
  base: {},
  boldText: {
    fontWeight: 'medium',
    fontSize: regularTextSize,
    color: '#333',
  },
  boldWhiteText: {
    fontWeight: 'medium',
    fontSize: regularTextSize,
    color: '#fff',
    textAlign: 'center',
  },
  enlaceText: {
    fontSize: 13,
    color: '#333',
    textDecorationLine: 'underline',
  },
};

const StyledText = ({
  children,
  style,
  boldText,
  enlaceText,
  boldWhiteText,
  ...rest
}) => {
  const customStyles = [
    styles.base,
    boldText && styles.boldText,
    enlaceText && styles.enlaceText,
    boldWhiteText && styles.boldWhiteText,
    style,
  ].filter(Boolean);

  return (
    <span style={Object.assign({}, ...customStyles)} {...rest}>
      {children}
    </span>
  );
};

StyledText.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  boldText: PropTypes.bool,
  boldTextUpper: PropTypes.bool,
  regularText: PropTypes.bool,
  enlaceText: PropTypes.bool,
  boldWhiteText: PropTypes.bool,
};

export default StyledText;
