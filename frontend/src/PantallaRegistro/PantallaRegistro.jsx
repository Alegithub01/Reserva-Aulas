import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/ValidationTextInput";
import StyledText from "../StyledText";
import Button from "../Utils/Button";

const RegistroDocente = () => {
  const navegar = useNavigate();
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errores, setErrores] = useState({ nombre: '', contrasena: '', confirmarContrasena: '' });

  // Valida el campo de nombre
  const validarNombre = () => {
    const regexNombre = /^[a-zA-Z\s]*$/;
    let mensajeError = '';
    if (nombre.length > 50) {
      mensajeError = 'El nombre no puede exceder los 50 caracteres.';
    } else if (!regexNombre.test(nombre)) {
      mensajeError = 'El nombre solo puede contener letras y espacios.';
    }
    setErrores(erroresActuales => ({ ...erroresActuales, nombre: mensajeError }));
  };

  // Valida la contraseña
  const validarContrasena = () => {
    const regexNumeros = /\d.*\d/;
    let mensajeError = '';
    if (contrasena.length < 8 || !regexNumeros.test(contrasena)) {
      mensajeError = 'La contraseña debe tener más de 8 caracteres y contener al menos dos dígitos numéricos.';
    } else if (contrasena.length > 20) {
      mensajeError = 'La contraseña no puede exceder los 20 caracteres.';
    }
    setErrores(erroresActuales => ({ ...erroresActuales, contrasena: mensajeError }));
  };

  // Valida la confirmación de la contraseña
  const validarConfirmacionContrasena = () => {
    let mensajeError = '';
    if (confirmarContrasena !== contrasena) {
      mensajeError = 'Las contraseñas no coinciden.';
    }
    setErrores(erroresActuales => ({ ...erroresActuales, confirmarContrasena: mensajeError }));
  };

  // Valida el formulario completo
  const validarFormulario = () => {
    validarNombre();
    validarContrasena();
    validarConfirmacionContrasena();

    // Comprobar errores
    const formularioEsValido = Object.values(errores).every(error => error === '');

    if (formularioEsValido) {
      // Lógica para registrar en la base de datos y mostrar mensaje de éxito
      alert('Registrado exitósamente');
      navegar('/inicio-sesion-docente'); // Redirecciona a inicio de sesión docente
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
        Bienvenido al Sistema de Registro
      </StyledText>
    </div>
  );
  //
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <StyledText boldText>Registro de Docente</StyledText>
      </div>
      <TextInput
        label="Nombre Completo"
        isRequired={true}
        validationMessage={errores.nombre}
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        onBlur={validarNombre}
      />
      <TextInput
        label="Contraseña"
        isRequired={true}
        validationMessage={errores.contrasena}
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        onBlur={validarContrasena}
      />
      <TextInput
        label="Confirmar Contraseña"
        isRequired={true}
        validationMessage={errores.confirmarContrasena}
        value={confirmarContrasena}
        onChange={(e) => setConfirmarContrasena(e.target.value)}
        onBlur={validarConfirmacionContrasena}
      />
      <Button onClick={validarFormulario} fullWidth={true}>Registro</Button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        <StyledText
          enlaceText
          onClick={() => navegar('/inicio-sesion-admin')}
        >
          Iniciar sesión como administrador
        </StyledText>
        <StyledText
          enlaceText
          onClick={() => navegar('/inicio-sesion-docente')}
          style={{ marginTop: "10px" }}
        >
          Iniciar Sesión
        </StyledText>
      </div>
    </div>
  );

  return <SplitScreenLayout left={contenidoIzquierdo} right={contenidoDerecho} />;
};


export default RegistroDocente;