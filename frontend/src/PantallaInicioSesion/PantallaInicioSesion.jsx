import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/CampoValidado";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
import axios from 'axios';


const PantallaInicioSesionProfesor = () => {
  const navegar = useNavigate();
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({ correoElectronico: '', contrasena: '' });

  const validarCorreoElectronico = () => {
    let mensajeError = '';
    if (!correoElectronico) {
      mensajeError = 'Ingrese su correo electrónico.';
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
      mensajeError = 'Ingrese un correo electrónico válido.';
    } 
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      correoElectronico: mensajeError,
    }));
  };

  const validarFormulario = () => {
    let mensajesError = { correoElectronico: '', contrasena: '' };
    let formularioEsValido = true;
    if (!correoElectronico) {
        mensajesError.correoElectronico = 'Ingrese su correo electrónico.';
        formularioEsValido = false;
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
        mensajesError.correoElectronico = 'Ingrese un correo electrónico válido.';
        formularioEsValido = false;
    } 
    if (!contrasena) {
        mensajesError.contrasena = 'Ingrese su contraseña.';
        formularioEsValido = false;
    } 
    setErrores(mensajesError);
    return formularioEsValido;
  };

  const iniciarSesion = () => {
    if (validarFormulario()) {
      axios.post('http://localhost:8000/api/auth/login', {
        email: correoElectronico,
        password: contrasena
      })
      .then(response => {
        if (response.data.access_token) {
          console.log('Token recibido:', response.data.access_token);
          localStorage.setItem('access_token', response.data.access_token);
          navegar('/ModulosAdmin');
        } else {
          console.error('No se recibió token');
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
      });
    }
  };

  const contenidoIzquierdo = (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20%",
      }}
    >
      <StyledText boldWhiteText>
        Reserva de Ambientes
      </StyledText>
    </div>
  );

  const contenidoDerecho = (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          height: "25%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledText boldText>Inicio de Sesión</StyledText>
      </div>
      <TextInput
        label="Correo Electrónico"
        isRequired={true}
        validationMessage={errores.correoElectronico}
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
        onBlur={() => validarCorreoElectronico()}
      />
      <TextInput
        label="Contraseña"
        type="password"
        isRequired={true}
        validationMessage={errores.contrasena}
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <Button onClick={iniciarSesion} fullWidth={true}>Inicio de Sesion</Button>
      
      <div
      style={{
          height: "15%",
          display: "flex",
          justifyContent: 'flex-end',
          alignItems: "center",
          flexDirection: 'column',
          color: 'black',
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: 'flex-end',
            alignItems: "center",
            flexDirection: 'column',
            cursor: 'pointer',
            color: 'black',
          }}
          onClick={() => navegar('/registro')}
          onMouseOver={(e) => e.target.style.color = "#3661EB"}
          onMouseOut={(e) => e.target.style.color = 'black'}
        >
          <StyledText enlaceText> Registrarse como docente </StyledText>
        </div>
      </div>
    </div>
  );

  return <SplitScreenLayout left={contenidoIzquierdo} right={contenidoDerecho} />;
};

export default PantallaInicioSesionProfesor;
