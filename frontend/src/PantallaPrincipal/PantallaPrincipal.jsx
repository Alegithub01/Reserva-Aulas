import React, { useState } from 'react';
import PantallaEfecto from '../PantallaPrincipal/PantallaEfecto';
import { css, keyframes } from "@emotion/react";
import { useTheme } from '../Contexts/ThemeContext';

const PantallaPrincipal = () => {
  const {theme} = useTheme();
  const style = {
    texto: {
      width: '70%',
      textAlign: 'center',
      margin: '100px',
      textWrap: 'balance',
      lineHeight: 2,
      fontSize: '1.1rem',
    },
    footer:{
      backgroundColor: theme.highlight,
      color: 'white',
      display: 'flex',
      justifyContent: 'space-around',
      
      width: '100%',
      fontSize: '1.03rem',

    }
  }
  return (
    <div>
      <PantallaEfecto />
      <div style={{ width: '100%', backgroundColor: '#161112', color: 'white', display: 'flex', justifyContent: 'center' }}>
        <p style={style.texto}>¡Bienvenido al sistema de reservas de ambientes de la Facultad de Ciencias y Tecnología de la UMSS!<br/>

          Nuestro sistema simplifica el proceso de reserva de aulas para docentes y administrativos, eliminando la tediosa tarea manual y los problemas asociados con la organización tradicional.
          Ahora, los docentes pueden realizar solicitudes de reserva de aulas de manera eficiente, asegurando una gestión más fluida y efectiva de los espacios disponibles. Por otro lado, los administrativos tienen la capacidad de gestionar las reservas de manera centralizada, facilitando la coordinación y optimizando el uso de los ambientes.<br/>

          Descubre cómo nuestro sistema hace que reservar ambientes sea más fácil y eficaz para todos los usuarios. ¡Haz tu reserva ahora y experimenta la comodidad de nuestro sistema de reservas en línea!</p>
      </div>
      <div style={style.footer}>
        <p style={{padding:10}}>© 2024 Eureka Solutions S.R.L</p>
        <p style={{padding:10}}>eurekasolutionssrl@gmail.com</p>
      </div>
    </div>
  );
};
export default PantallaPrincipal;
