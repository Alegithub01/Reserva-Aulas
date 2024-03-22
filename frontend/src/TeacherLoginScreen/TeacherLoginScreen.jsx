import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/ValidationTextInput";
import StyledText from "../StyledText";
import Button from "../Utils/Button";

const PantallaInicioSesionProfesor = () => {
  const navegar = useNavigate();
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({ correoElectronico: '', contrasena: '' });

  // Datos de usuario para validar
  const usuariosValidos = [
    { email: 'JhonDoe@gmail.com', password: '12345678' },
    { email: 'SeleneDelgado@gmail.com', password: 'martillo' }
  ];

  // Valida el campo de correo electrónico
  const validarCorreoElectronico = () => {
    let mensajeError = '';
    if (!correoElectronico) {
      mensajeError = 'Ingrese su correo electrónico.';
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
      mensajeError = 'Ingrese un correo electrónico válido.';
    } else if (!usuariosValidos.some(usuario => usuario.email === correoElectronico)) {
      mensajeError = 'Correo electrónico no registrado.';
    }
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      correoElectronico: mensajeError,
    }));
  };

  // Valida el formulario completo
  const validarFormulario = () => {
    let mensajesError = { correoElectronico: '', contrasena: '' };
    let formularioEsValido = true;

    // Valida el correo electrónico
    if (!correoElectronico) {
        mensajesError.correoElectronico = 'Ingrese su correo electrónico.';
        formularioEsValido = false;
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
        mensajesError.correoElectronico = 'Ingrese un correo electrónico válido.';
        formularioEsValido = false;
    } else if (!usuariosValidos.some(usuario => usuario.email === correoElectronico)) {
        mensajesError.correoElectronico = 'Correo electrónico no registrado.';
        formularioEsValido = false;
    }

    // Valida la contraseña
    if (!contrasena) {
        mensajesError.contrasena = 'Ingrese su contraseña.';
        formularioEsValido = false;
    } else {
        const usuario = usuariosValidos.find(usuario => usuario.email === correoElectronico);
        if (usuario && usuario.password !== contrasena) {
            mensajesError.contrasena = 'Contraseña incorrecta.';
            formularioEsValido = false;
        }
    }

    setErrores(mensajesError);
    return formularioEsValido;
  };

  // Inicia sesión si el formulario es válido
  const iniciarSesion = () => {
    if (validarFormulario()) {  // Desactivado para no afectar el flujo de la aplicacion en desarrollo
      navegar('/dashboard');
    }
  };

  // Contenido del lado izquierdo
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

  // Contenido del lado derecho
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
        }}
      >
        <StyledText enlaceText> Registrarse </StyledText>
      </div>
    </div>
  );

  // Renderiza el diseño dividido con los contenidos izquierdo y derecho
  return <SplitScreenLayout left={contenidoIzquierdo} right={contenidoDerecho} />;
};

export default PantallaInicioSesionProfesor;
