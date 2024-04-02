import { useState } from "react";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import CampoValidado from "../Utils/CampoValidado";
import Button from "../Utils/Button";
import Casilla from "../Utils/Casilla";
import RowPercentage from "../Responsive/RowPercentage";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AdminHomeModule2 = () => {
  const [nombreDelRol, setNombreDelRol] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [casillas, setCasillas] = useState({
    gestionDeUsuario: false,
    gestionDeAmbientes: false,
    gestionDeReservas: false,
    solicitudDeReservas: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCasillas((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleSave = () => {
    console.log("Nombre del rol:", nombreDelRol);
    console.log("Casillas seleccionadas:");
    Object.entries(casillas).forEach(([key, value]) => {
      if (value) console.log(key.replace(/([A-Z])/g, " $1").trim());
    });
    // guaradr rol
    setSnackbarOpen(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Card
      minWidth="300px"
      minHeight="100px"
      fullWidth
      fullHeight
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
            onChange={(e) => setNombreDelRol(e.target.value)}
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
  );
};

export default AdminHomeModule2;