import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/CampoValidado";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
import axios from 'axios';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PantallaInicioSesionProfesor = () => {
  const navegar = useNavigate();
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({ correoElectronico: '', contrasena: '' });
  const [snackbarAbierto, setSnackbarAbierto] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');

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
      console.error('Estas aqui');
      axios.post('http://localhost:8000/api/auth/login', {
        email: correoElectronico,
        password: contrasena
      })
      .then(response => {
        console.log(response.data); 
        navegar('/ModulosAdmin');
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        manejarAbrirSnackbar('Las credenciales ingresadas no son válidas.');
      });
    }
  };

  const manejarAbrirSnackbar = (mensaje) => {
    setMensajeSnackbar(mensaje);
    setSnackbarAbierto(true);
  };
  
  const manejarCerrarSnackbar = (evento, razon) => {
    if (razon === 'clickaway') {
      return;
    }
    setSnackbarAbierto(false);
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarAbierto}
        autoHideDuration={6000}
        onClose={manejarCerrarSnackbar}
        message={mensajeSnackbar}
        action={
          <IconButton size="small" aria-label="cerrar" color="inherit" onClick={manejarCerrarSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );

  return <SplitScreenLayout left={contenidoIzquierdo} right={contenidoDerecho} />;
};

export default PantallaInicioSesionProfesor;
