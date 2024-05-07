import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import ButtonEstilizado from "../Utils/Button";
import MensajeExito from "../Utils/MensajeExito";
import axios from 'axios';
import { URL_API } from "../services/const";

const TextAreaP = ({ onChange, value }) => {
  const [valor, setValor] = useState(value);

  useEffect(() => {
    onChange && onChange(valor);
  }, [valor, onChange]);

  const cambio = (e) => {
    if (e && e.target) {
      if (onChange) {
        onChange(valor)
      }
      if (valor.length < 219) {
        setValor(e.target.value);
      }
    }
  };
  return (
    <textarea
      style={{
        width: '100%',
        height: '40%',
        borderRadius: '20px',
        formSizing: 'border-box',
        padding: '15px',
        fontFamily: 'Arial',
        fontSize: '16px',
      }}
      onChange={cambio}
      value={value}
    />
  );
};
TextAreaP.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};


const AdminHomeModule3 = () => {
  const { theme } = useTheme();
  const [reglas, setReglas] = useState('');
  const [publicado, setPublicado] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const guardarBaseDatos = async() => {
    console.log(reglas);
    if (reglas.length < 10) {
      return;
    } else {
      //PARA BACKEND --------------------------------------------*****************--------------------
      //aca guardar en la base de datos reglas, considerando el estado publicado false
      if (!reglas) {
        console.log("No hay regla para guardar.");
        return;
      }
      try {
        const response = await axios.post(`${URL_API}/agregar-regla`, {
          newRule: reglas 
        });
        console.log(response);
        setGuardado(true);
      } catch (error) {
        console.error('Error al guardar la regla:', error);
      }
    }
      
  }

  const publicar = async () => {
    if (reglas.length < 10) {
      return;
    } else {
      //PARA BACKEND --------------------------------------------*****************--------------------
      //aca actualizar el estado de publicado a true
      try {
        const response = await axios.post(`${URL_API}/enviar-correo-notificacion`);
        console.log(response);
        setPublicado(true);
      } catch (error) {
        console.error('Error al publicar la regla:', error);
      }
    }
  }

  const defaultStyle = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      with: '100%',
      background: theme.bgmain,
    },
    container: {
      display: 'flex',
      width: '50%',
      minWidth: '600px',
      minHeight: '450px',
    },
    buttonsField: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '20px',
      marginTop: '20px',
    },
  };
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          minWidth="300px"
          minHeight="100px"
          fullWidth
          alignCenter
          padding="30px 60px"
          borderColor="blue"
          borderRadius="15px"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",

            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30%',
              }}
            >
              <StyledText boldText >Reglas de Reserva</StyledText>
            </div>
            <TextAreaP
              onChange={setReglas}
              value={reglas}
            />
            <div style={defaultStyle.buttonsField}>
              <ButtonEstilizado fullWidth={true} onClick={guardarBaseDatos} >Guardar</ButtonEstilizado>
              <ButtonEstilizado fullWidth={true} onClick={publicar} >Publicar</ButtonEstilizado>
            </div>
            <MensajeExito
              abrirDialogo={guardado}
              cerrarDialogo={() => {
                setGuardado(false);
              }}
              mensaje="Regla guardada con éxito"
            />
            <MensajeExito
              abrirDialogo={publicado}
              cerrarDialogo={() => {
                setPublicado(false);
              }}
              mensaje="Publicado con éxito"
            />
          </div>

        </Card>
      </div >
    </div >
  );
};

export default AdminHomeModule3;
