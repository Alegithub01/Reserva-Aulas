import { useState } from "react";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import CampoValidado from "../Utils/CampoValidado";
import Button from "../Utils/Button";
import Casilla from "../Utils/Casilla";
import RowPercentage from "../Responsive/RowPercentage";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTheme } from '../Contexts/ThemeContext';

const AdminHomeModule2 = () => {
  const { theme } = useTheme();
  const [nombreDelRol, setNombreDelRol] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [casillas, setCasillas] = useState({
    gestionDeUsuario: false,
    gestionDeAmbientes: false,
    gestionDeReservas: false,
    solicitudDeReservas: false,
  });
  const [errores, setErrores] = useState({
    nombreDelRol: "",
    casillas: "",
  });

  const mensajeErrorEstilo = {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCasillas((prevState) => ({ ...prevState, [name]: checked }));
  };

  const validarNombreRol = () => {
    if (nombreDelRol === "") {
      setErrores((prevState) => ({ ...prevState, nombreDelRol: "Por favor, ingrese el nombre del rol." }));
    }else{
      setErrores((prevState) => ({ ...prevState, nombreDelRol: "" }));
    }
  }

  const manejarCambioNombreRol = (event, patron) => {
    const valor = event.target.value;
    if(patron && RegExp(patron).test(valor)){
      setNombreDelRol(valor);
      setErrores((prevState) => ({ ...prevState, nombreDelRol: "" }));
    }
  }

  const validarCasillas = () => {
    if (!Object.values(casillas).some((value) => value === true)) {
      setErrores((prevState) => ({ ...prevState, casillas: "Seleccione al menos un módulo de acceso para el rol." }));
    }else{
      setErrores((prevState) => ({ ...prevState, casillas: "" }));
    }
  }
  const handleSave = () => {
    validarNombreRol();
    validarCasillas();

    if(nombreDelRol !== "" && Object.values(casillas).some((value) => value === true)){
      setSnackbarOpen(true);
      setNombreDelRol("");
      setCasillas({
        gestionDeUsuario: false,
        gestionDeAmbientes: false,
        gestionDeReservas: false,
        solicitudDeReservas: false,
      });
    }else{
      setSnackbarOpen(false);
    }
    
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const defaultStyle = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      with:'100%',
      backgroundColor: theme.secondary,
    },
    container: {
      display: 'flex',
      width: '50%',
      minWidth: '600px',
      minHeight: '450px',
    },
  };
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          minWidth="200px"
          minHeight="200px"
          fullWidth
          alignCenter
          padding="30px 60px"
          borderColor="blue"
          borderRadius="15px"
        >
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
                height: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText boldText>Crear Nuevo Rol</StyledText>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <CampoValidado
                label="Nombre del rol"
                value={nombreDelRol}
                validationMessage={errores.nombreDelRol}
                onChange={(event)=>manejarCambioNombreRol(event, "^[0-9(a-zA-Z)+]*$")}
                onBlur={validarNombreRol}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <RowPercentage firstChildPercentage={45} gap="20px">
                <div>
                  <Casilla
                    label="Gestión de Usuario"
                    name="gestionDeUsuario"
                    checked={casillas.gestionDeUsuario}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </div>
                <div>
                  <Casilla
                    label="Gestión de Ambientes"
                    name="gestionDeAmbientes"
                    checked={casillas.gestionDeAmbientes}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </div>
              </RowPercentage>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <RowPercentage firstChildPercentage={45} gap="20px">
                <div>
                  <Casilla
                    label="Gestión de Reservas"
                    name="gestionDeReservas"
                    checked={casillas.gestionDeReservas}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </div>
                <div>
                  <Casilla
                    label="Solicitud de Reservas"
                    name="solicitudDeReservas"
                    checked={casillas.solicitudDeReservas}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </div>
              </RowPercentage>
              {errores.casillas && <div style={mensajeErrorEstilo}>{errores.casillas}</div>}
            </div>
            <Button fullWidth={true} onClick={handleSave}>
              Guardar
            </Button>
            <div
              style={{
                height: "0%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
          </div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Rol creado con éxito
            </Alert>
          </Snackbar>
        </Card>
      </div>
    </div>
  );
};

export default AdminHomeModule2;
