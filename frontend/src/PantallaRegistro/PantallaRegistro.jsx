import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/CampoValidado";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import RowPercentage from "../Responsive/RowPercentage";

const RegistroDocente = () => {
  const navegar = useNavigate();
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [errores, setErrores] = useState({
    nombres: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  });
  const [camposVacios, setCamposVacios] = useState({
    nombres: false,
    apellido: false,
    correo: false,
    contrasena: false,
  });

  const manejarCambioNombres = (e) => {
    const valor = e.target.value;
    if (valor.length <= 50) {
      setNombres(valor);
    }
  };
  const manejarCambioCorreo = (e) => {
    const valor = e.target.value;
    setCorreo(valor);
  };
  const manejarCambioContrasena = (e) => {
    const valor = e.target.value;
    if (valor.length <= 20) {
      setContrasena(valor);
    }
  };
  const manejarCambioApellido = (e) => {
    const valor = e.target.value;
    if (valor.length <= 50) {
      setApellido(valor);
    }
  };
  const manejarCambioConfirmarContrasena = (e) => {
    const valor = e.target.value;
    if (valor.length <= 20) {
      setConfirmarContrasena(valor);
    }
  };

  const validarCorreo = () => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mensajeError = "";
    if (!correo) {
      mensajeError = "Ingrese su correo.";
    } else if (!regexCorreo.test(correo)) {
      mensajeError = "Ingrese un correo válido.";
    }
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      correo: mensajeError,
    }));
  };
  const validarNombres = () => {
    let mensajeError = "";
    if (!nombres) {
      mensajeError = "Ingrese su nombre.";
    }
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      nombres: mensajeError,
    }));
  };
  const validarContrasena = () => {
    const regexNumeros = /\d.*\d/;
    let mensajeError = "";
    if (!contrasena) {
      mensajeError = "Ingrese su contraseña.";
    } else if (contrasena.length < 8 || !regexNumeros.test(contrasena)) {
      mensajeError = "La contraseña debe tener mínimo 8 caracteres y al menos 2 números.";
    } else if (contrasena.length > 20) {
      mensajeError = "La contraseña no puede exceder los 20 caracteres.";
    }
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      contrasena: mensajeError,
    }));
  };
  const validarApellido = () => {
    let mensajeError = "";
    if (!apellido) {
      mensajeError = "Ingrese su apellido.";
    }
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      apellido: mensajeError,
    }));
  };
  const validarConfirmacionContrasena = () => {
    let mensajeError = "";
    if (confirmarContrasena !== contrasena) {
      mensajeError = "Las contraseñas no coinciden.";
    }
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      confirmarContrasena: mensajeError,
    }));
  };

  // Validar el formulario completo
  const validarFormulario = () => {
    validarNombres();
    validarApellido();
    validarCorreo();
    validarContrasena();
    validarConfirmacionContrasena();

    const campos = {
      nombres: nombres === "",
      apellido: apellido === "",
      correo: correo === "",
      contrasena: contrasena === "",
    };

    setCamposVacios(campos);

    const formularioEsValido =
      Object.values(errores).every((error) => error === "") &&
      !Object.values(campos).some((empty) => empty);

    if (formularioEsValido) {
      // Proceso de registro
      setDialogoAbierto(true);
    } else {
      // Manejar errores
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
      <StyledText boldWhiteText>Reserva de Ambientes</StyledText>
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
          margin: "10px 0",
        }}
      >
        <StyledText boldText>Registro de Docente</StyledText>
      </div>
      <RowPercentage firstChildPercentage={60} gap="10px">
        <TextInput
          label="Nombres"
          isRequired={true}
          validationMessage={
            camposVacios.nombres ? "Ingrese su nombre." : errores.nombres
          }
          value={nombres}
          onChange={manejarCambioNombres}
          onBlur={validarNombres}
        />
        <TextInput
          label="Apellido"
          isRequired={true}
          validationMessage={
            camposVacios.apellido ? "Ingrese su apellido." : errores.apellido
          }
          value={apellido}
          onChange={manejarCambioApellido}
          onBlur={validarApellido}
        />
      </RowPercentage>
      <TextInput
        label="Correo"
        isRequired={true}
        validationMessage={
          camposVacios.correo ? "Ingrese su correo." : errores.correo
        }
        value={correo}
        onChange={manejarCambioCorreo}
        onBlur={validarCorreo}
      />
      <TextInput
        label="Contraseña"
        isRequired={true}
        validationMessage={
          camposVacios.contrasena
            ? "Ingrese su contraseña."
            : errores.contrasena
        }
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
      <Button onClick={validarFormulario} fullWidth={true}>
        Registro
      </Button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={() => navegar("/")}
        onMouseOver={(e) => (e.target.style.color = "#3661EB")}
        onMouseOut={(e) => (e.target.style.color = "black")}
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
          "& .MuiDialog-paper": {
            borderRadius: "20px",
          },
        }}
      >
        <DialogContent
          sx={{
            borderRadius: "20px",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            Registrado exitósamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "8px 24px",
          }}
        >
          <Button
            onClick={() => {
              setDialogoAbierto(false);
              navegar("/");
            }}
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegistroDocente;
