import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';
import Umss from '../UMSS.png'

const ShieldImage = ({ src }) => {
  const style = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // height: '100%',
      padding: '0px',
    },
    image: {
      maxWidth: '100%',
      maxHeight: '200px',
      objectFit: 'contain',
    }
  };

  return (
    <div style={style.container}>
      <img src={src} alt="Escudo" style={style.image} />
    </div>
  );
};

ShieldImage.propTypes = {
  src: PropTypes.string.isRequired,
};

const SplitScreenLayout = ({ left, right, style }) => {
  const { theme } = useTheme();
  const defaultStyle = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: theme.bgmain,
    },
    container: {
      display: 'flex',
      width: '80%',
      minWidth: '500px',
      minHeight: '450px',
      maxWidth: '700px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
      borderRadius: '20px',
      overflow: 'hidden',
      ...style?.container,

    },
    side: {
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftSection: {
      width: '40%',
      backgroundColor: theme.highlight,
    },
    rightSection: {
      width: '60%',
      backgroundColor: theme.primary,
      // padding: '50px 20px',
    },
  };

  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <div style={{ ...defaultStyle.side, ...defaultStyle.leftSection }}>
          <ShieldImage src={Umss} alt="Escudo"/>
          {left}
        </div>
        <div style={{ ...defaultStyle.side, ...defaultStyle.rightSection }}>
          {right}
        </div>
      </div>
    </div>
  );
};

SplitScreenLayout.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default SplitScreenLayout;
