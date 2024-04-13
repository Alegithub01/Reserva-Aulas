import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/CampoValidado";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const PantallaInicioSesionProfesor = () => {
  const navegar = useNavigate();
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({
    correoElectronico: "",
    contrasena: "",
  });
  const [cargando, setCargando] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const validarCorreoElectronico = () => {
    let mensajeError = "";
    if (!correoElectronico) {
      mensajeError = "Ingrese su correo electrónico.";
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
      mensajeError = "Ingrese un correo electrónico válido.";
    }
    setErrores((erroresActuales) => ({
      ...erroresActuales,
      correoElectronico: mensajeError,
    }));
  };

  const validarFormulario = () => {
    let mensajesError = { correoElectronico: "", contrasena: "" };
    let formularioEsValido = true;
    if (!correoElectronico) {
      mensajesError.correoElectronico = "Ingrese su correo electrónico.";
      formularioEsValido = false;
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
      mensajesError.correoElectronico = "Ingrese un correo electrónico válido.";
      formularioEsValido = false;
    }
    if (!contrasena) {
      mensajesError.contrasena = "Ingrese su contraseña.";
      formularioEsValido = false;
    }
    setErrores(mensajesError);
    return formularioEsValido;
  };

  const iniciarSesion = () => {
    if (validarFormulario()) {
      setCargando(true);
      axios
        .post("http://localhost:8000/api/auth/login", {
          email: correoElectronico,
          password: contrasena,
        })
        .then((response) => {
          if (response.data.access_token) {
            console.log("Token recibido:", response.data.access_token);
            localStorage.setItem("access_token", response.data.access_token);
            navegar("/ModulosAdmin");
            setSnackbarMessage("Inicio de sesión exitoso");
            setSnackbarSeverity("success");
          } else {
            console.error("No se recibió token");
            setSnackbarMessage("Inicio de sesión fallido");
            setSnackbarSeverity("error");
          }
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error);
          setSnackbarMessage("Inicio de sesión fallido");
          setSnackbarSeverity("error");
        })
        .finally(() => {
          setCargando(false);
          setSnackbarOpen(true);
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
      <StyledText boldWhiteText>Reserva de Ambientes</StyledText>
    </div>
  );

  const contenidoDerecho = (
    <div
      style={{
        position: "relative",
        width: "100%",
        flexDirection: "column",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {cargando && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </div>
      )}
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
      <Button onClick={iniciarSesion} fullWidth={true}>
        Inicio de Sesion
      </Button>

      <div
        style={{
          height: "15%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "column",
          color: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
            color: "black",
          }}
          onClick={() => navegar("/registro")}
          onMouseOver={(e) => (e.target.style.color = "#3661EB")}
          onMouseOut={(e) => (e.target.style.color = "black")}
        >
          <StyledText enlaceText> Registrarse como docente </StyledText>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );

  return (
    <SplitScreenLayout
      left={contenidoIzquierdo}
      right={contenidoDerecho}
    ></SplitScreenLayout>
  );
};

export default PantallaInicioSesionProfesor;
