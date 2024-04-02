import React, { useState } from 'react';
import PantallaEfecto from '../PantallaPrincipal/PantallaEfecto';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '../Contexts/ThemeContext';
import imagen1 from '../assets/imgs/img1.jpg';
import imagen2 from '../assets/imgs/img2.jpg';
import imagen3 from '../assets/imgs/img3.jpg';
import imagen4 from '../assets/imgs/img4.jpg';
import imagen5 from '../assets/imgs/img5.jpg';
import imagen6 from '../assets/imgs/img6.jpg';

const PantallaPrincipal = () => {
  const imagenes = [
    {
      img: imagen1,
      title: '1',
    },
    {
      img: imagen2,
      title: '2',
    },
    {
      img: imagen3,
      title: '3',
    },
    {
      img: imagen4,
      title: '4',
    },
    {
      img: imagen5,
      title: '5',
    },
    {
      img: imagen6,
      title: '6',
    }
  ];

  const { theme } = useTheme();
  const style = {
    cuerpo: {
      width: '100%',
      backgroundColor: '#161112',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    texto: {
      width: '70%',
      textAlign: 'center',
      margin: '100px',
      textWrap: 'balance',
      lineHeight: 2,
      fontSize: '1.1rem',
    },
    footer: {
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
      <div style={style.cuerpo}>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          <p style={style.texto}>¡Bienvenido al sistema de reservas de ambientes de la Facultad de Ciencias y Tecnología de la UMSS!<br />

            Nuestro sistema simplifica el proceso de reserva de aulas para docentes y administrativos, eliminando la tediosa tarea manual y los problemas asociados con la organización tradicional.
            Ahora, los docentes pueden realizar solicitudes de reserva de aulas de manera eficiente, asegurando una gestión más fluida y efectiva de los espacios disponibles. Por otro lado, los administrativos tienen la capacidad de gestionar las reservas de manera centralizada, facilitando la coordinación y optimizando el uso de los ambientes.<br />

            Descubre cómo nuestro sistema hace que reservar ambientes sea más fácil y eficaz para todos los usuarios. ¡Haz tu reserva ahora y experimenta la comodidad de nuestro sistema de reservas en línea!</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 120 }}>
          <ImageList sx={{ width: 800, height: 800 }} variant="woven" cols={3} gap={8}>
            {imagenes.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=280&fit=crop&auto=format&dpr=2 2x`}
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>

      <div style={style.footer}>
        <p style={{ padding: 10 }}>© 2024 Eureka Solutions S.R.L</p>
        <p style={{ padding: 10 }}>eurekasolutionssrl@gmail.com</p>
      </div>
    </div>
  );
};
export default PantallaPrincipal;
