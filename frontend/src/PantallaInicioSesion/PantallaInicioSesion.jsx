import { useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/CampoValidado";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { URL_API } from "../services/const";
import UsuarioStore from "../Contexts/UsuarioStore";

const PantallaInicioSesionProfesor = () => {
  const navegar = useNavigate();
  const { actualizarNombre, actualizarCorreo } = UsuarioStore();
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
      .post(`${URL_API}/auth/login`, {
        email: correoElectronico,
        password: contrasena,
      })
      .then(async (response) => {
        if (response.data.access_token) {
          console.log("Token recibido:", response.data.access_token);
          localStorage.setItem("access_token", response.data.access_token);
          // Después de iniciar sesión con éxito, obtén el rol del usuario
          await obtenerRolUsuario();
        } else {
          console.error("No se recibió token");
          setSnackbarMessage("Inicio de sesión fallido");
          setSnackbarSeverity("error");
          throw new Error("No se recibió token");
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

  const obtenerRolUsuario = async () => {
    // Llama a tu backend para obtener el rol del usuario usando el token
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No se encontró el token");
      return;
    }
  
    axios
      .post(`${URL_API}/auth/get-role-name`, {
        email: correoElectronico
      })
      .then(async (response) => {
        console.log("Respuesta del servidor:", response.data);
        const nombreRol = response.data.role_name;
        console.log("Nombre del rol:", nombreRol);
        await obtenerDatosUsuario();
        navegar("/ModulosAdmin");
      })
      .catch((error) => {
        console.error("Error al obtener el rol del usuario:", error);
      });
      
  };

  const controlStore = async () => {
    try {
      const response = await axios.post(`${URL_API}/auth/me`, {}, {
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      actualizarNombre(response.data.nombres);
      actualizarCorreo(response.data.email);
      localStorage.setItem('nombre', response.data.nombres + ' ' + response.data.apellidos);
      localStorage.setItem('correo', response.data.email);
      console.log('Datos del usuario:', response.data.rol_id);
      //BACKEND
      const rolNoNulo = response.data.rol_id || "2"; 
      localStorage.setItem('rol', rolNoNulo);  
    } catch (error) {
      console.error(error);
    }
  };
  const obtenerDatosUsuario = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("No se enconto el token");
      return Promise.reject(new Error("No se enconto el token"));
    }
    await controlStore();
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
