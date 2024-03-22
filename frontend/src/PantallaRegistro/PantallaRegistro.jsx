import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/ValidationTextInput";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const RegistroDocente = () => {
  const navegar = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errores, setErrores] = useState({ nombre: '', contrasena: '', confirmarContrasena: '' });
  const [camposVacios, setCamposVacios] = useState({ nombre: false, contrasena: false });
  const [dialogoAbierto, setDialogoAbierto] = useState(false);

  const manejarCambioNombre = (e) => {
    const valor = e.target.value;
    const regexNombre = /^[a-zA-Z\s]*$/;
    if (valor.length <= 50 && regexNombre.test(valor)) {
      setNombreCompleto(valor);
    }
  };

  const manejarCambioContrasena = (e) => {
    const valor = e.target.value;
    if (valor.length <= 20) {
      setContrasena(valor);
    }
  };

  const manejarCambioConfirmarContrasena = (e) => {
    const valor = e.target.value;
    if (valor.length <= 20) {
      setConfirmarContrasena(valor);
    }
  };

  const validarNombreCompleto = () => {
    const regexNombre = /^[a-zA-Z\s]*$/;
    let mensajeError = '';
    if (nombreCompleto.length > 50) {
      mensajeError = 'El nombre no puede exceder los 50 caracteres.';
    } else if (!regexNombre.test(nombreCompleto)) {
      mensajeError = 'El nombre solo puede contener letras y espacios.';
    }
    setErrores(erroresActuales => ({ ...erroresActuales, nombre: mensajeError }));
  };

  const validarContrasena = () => {
    const regexNumeros = /\d.*\d/;
    let mensajeError = '';
    if (contrasena.length < 8 || !regexNumeros.test(contrasena)) {
      mensajeError = 'mínimo 8 caracteres y al menos 2 números.';
    } else if (contrasena.length > 20) {
      mensajeError = 'La contraseña no puede exceder los 20 caracteres.';
    }
    setErrores(erroresActuales => ({ ...erroresActuales, contrasena: mensajeError }));
  };

  const validarConfirmacionContrasena = () => {
    let mensajeError = '';
    if (confirmarContrasena !== contrasena) {
      mensajeError = 'Las contraseñas no coinciden.';
    }
    setErrores(erroresActuales => ({ ...erroresActuales, confirmarContrasena: mensajeError }));
  };

  // Validar el formulario completo
  const validarFormulario = () => {
    validarNombreCompleto();
    validarContrasena();
    validarConfirmacionContrasena();

    // Verificar campos vacíos
    const campos = { nombre: nombreCompleto === '', contrasena: contrasena === '' };
    setCamposVacios(campos);

    // Comprobar errores
    const formularioEsValido = Object.values(errores).every(error => error === '') && !Object.values(campos).some(empty => empty);

    if (formularioEsValido) {
      // BACKEND
      setDialogoAbierto(true);
    } else {
      // no
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
        validationMessage={camposVacios.nombre ? 'Ingrese su nombre.' : errores.nombre}
        value={nombreCompleto}
        onChange={manejarCambioNombre}
        onBlur={validarNombreCompleto}
      />
      <TextInput
        label="Contraseña"
        isRequired={true}
        validationMessage={camposVacios.contrasena ? 'Ingrese su contraseña.' : errores.contrasena}
        value={contrasena}
        onChange={manejarCambioContrasena}
        onBlur={validarContrasena}
      />
      <TextInput
        label="Confirmar Contraseña"
        isRequired={true}
        validationMessage={errores.confirmarContrasena}
        value={confirmarContrasena}
        onChange={manejarCambioConfirmarContrasena}
        onBlur={validarConfirmacionContrasena}
        maxLength={20}
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
        onClick={() => navegar('/')}
        onMouseOver={(e) => e.target.style.color = "#3661EB"}
        onMouseOut={(e) => e.target.style.color = 'black'}
      >
        <StyledText enlaceText> Iniciar sesion </StyledText>
      </div>
    </div>
  );

  return (
    <>
      <SplitScreenLayout left={contenidoIzquierdo} right={contenidoDerecho} />
      <Dialog
        open={dialogoAbierto}
        onClose={() => setDialogoAbierto(false)}
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '20px',
          }
        }}
      >
        <DialogContent
          sx={{
            borderRadius: '20px',
          }}
        >
          <DialogContentText id="alert-dialog-description">
            Registrado exitósamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            padding: '8px 24px', 
          }}
        >
          <Button onClick={() => {
            setDialogoAbierto(false);
            navegar('/');
          }} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegistroDocente;
