import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../Contexts/ThemeContext';
import StarBorder from '@mui/icons-material/StarBorder';

const Modulo = ({ text = 'Texto Predeterminado', Icon = StarBorder, onClick }) => {
  const [sobre, setSobre] = useState(false);
  const { theme } = useTheme();

  const estilosBase = {
    card: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      width: 'calc(100% - 40px)',
      padding: '5px 20px',
      backgroundColor: '#fff',
      borderRadius: '15px',
      border: '1px solid #CDCDCD',
      textDecoration: 'none',
      zIndex: 0,
      overflow: 'hidden',
    },
    text: {
      fontSize: '17px',
      fontWeight: 400,
      lineHeight: '20px',
      color: '#666',
      transition: 'all 0.3s ease-out',
    },
    icon: {
      transition: 'color 0.3s ease-out',
      color: '#666',
    },
    before: {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      top: '-16px',
      left: '0',
      background: theme.highlight,
      height: '32px',
      width: '32px',
      borderRadius: '32px',
      transform: 'scale(1)',
      transformOrigin: '50% 50%',
      transition: 'transform 0.25s ease-out',
    }
  };

  // Estilos cuando el mouse está encima
  const estilosSobre = {
    ...estilosBase,
    text: {
      ...estilosBase.text,
      color: sobre ? 'rgba(255, 255, 255, 0.8)' : estilosBase.text.color,
    },
    icon: {
      ...estilosBase.icon,
      color: sobre ? 'rgba(255, 255, 255, 0.8)' : estilosBase.icon.color,
    },
    before: {
      ...estilosBase.before,
      transform: sobre ? 'scale(21)' : 'scale(0)',
    },
  };

  return (
    <div
      className="card"
      style={estilosBase.card}
      onMouseEnter={() => setSobre(true)}
      onMouseLeave={() => setSobre(false)}
      onClick={onClick}
    >
      <p style={estilosSobre.text}>{text}</p>
      <Icon style={estilosSobre.icon} />
      <div style={estilosSobre.before} />
    </div>
  );
};

Modulo.propTypes = {
  text: PropTypes.string,
  Icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired
};

export default Modulo;
