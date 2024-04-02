import { useState } from "react";
import umss from '../umss.jpg';
import StyledText from "../StyledText";
import { css, keyframes } from "@emotion/react";
import Zoom from '@mui/material/Zoom';
import Button from '../Utils/Button';

const PantallaEfecto = () => {

  const deslizamiento = keyframes`
    from {
      transform: translateY(-100px);
    }
    to{
      transform: translateY(10px);
    }
    `;
  const style = {
    container: {
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagenCompleta: {
      backgroundImage: `url(${umss})`,
      //  zIndex: 0,
      // inset: 0,
    },
    card: {
      width: '40%',
      height: '30%',
      backgroundColor: 'rgba(77, 82, 113, 0.78)',
      position: 'absolute',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '20px',
    },
    image: {
    },
    titulo: {
      fontSize: '1.9rem',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    animadooo: {
      animation: css`${deslizamiento} 1s ease-in-out infinite`,
    },
    contenedorBotones:{
      paddingTop: '10px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    }
  };

  return (
    <div style={style.container}>
      <div className="imagenCompleta" style={style.imagenCompleta}>

      </div>
      <Zoom in={true} style={{ transitionDelay: '500ms' }}>
        <div style={style.card}>
          <StyledText boldWhiteText style={style.titulo}>Reservación de Ambientes FCYT</StyledText>
          <div style={style.contenedorBotones}>
            <Button fullWidth={false} onClick={() => { }}>Registrarse</Button>
            <Button fullWidth={false} onClick={() => { }}>Iniciar sesión</Button>
          </div>
        </div>
      </Zoom>
      <img src={umss} alt="umss" style={style.image} />
    </div>
  );
}

export default PantallaEfecto;
