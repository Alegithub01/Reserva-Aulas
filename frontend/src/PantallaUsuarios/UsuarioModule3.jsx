import Card from "../Utils/Card";
import { useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import Button from "../Utils/Button";
import StyledText from "../StyledText";
import EntradaArchivo from "../Utils/EntradaArchivo";
import RowPercentage from '../Responsive/RowPercentage';
import { Cancel } from '@mui/icons-material';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AdminHomeModule3 = () => {
  const [documento, setDocumento] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [detallesArchivo, setDetallesArchivo] = useState({
    nombre: "",
    tamano: "",
    registros: 0,
  });
  const [datosJson, setDatosJson] = useState([]);
  const [abrirDialogo, cambiarAbrirDialogo] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const { theme } = useTheme();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const manejoDocumentoCambio = (e) => {
    setMensajeError("");
    const archivo = e.target.files[0];
    if (archivo) {
      const extensionArchivo = archivo.name.split('.').pop().toLowerCase();
      if(extensionArchivo !== 'csv') {
        setMensajeError("Por favor, seleccione un archivo CSV.");
        return;
      }
  
      setDocumento(archivo);
      setDetallesArchivo({
        nombre: archivo.name,
        tamano: (archivo.size / 1024).toFixed(2) + " KB",
        registros: 0,
      });
  
      const leerArchivo = new FileReader();
      leerArchivo.onload = (e) => {
        const contenido = e.target.result;
        const json = csvAJson(contenido);
        setDatosJson(json);
        setDetallesArchivo((detalles) => ({
          ...detalles,
          registros: json.length,
        }));
      };
      leerArchivo.readAsText(archivo);
    }
  };

  const manejoDocumentoSubido = () => {
    if (!documento) {
      setMensajeError("Seleccione un archivo para procesar.");
      return;
    }
    console.log("Datos para el backend:", datosJson);

    const formData = new FormData();
    formData.append("file", documento);
    console.log(formData);

    axios.post("http://localhost:8000/api/auth/registerMany", datosJson)
      .then(response => {
        console.log(response.data);
        cambiarAbrirDialogo(true);
        setSnackbarOpen(true);
        setMensajeError("");
      })
      .catch(error => {
        console.error(error);
        setMensajeError("Error al subir el archivo. Intente nuevamente.");
      });

    // fetch("http://127.0.0.1:8000/api/auth/registerMany", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     cambiarAbrirDialogo(true);
    //     setMensajeError("");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setMensajeError("Error al subir el archivo. Intente nuevamente.");
    //   });
  };

  const manejoCancelacion = () => {
    setDocumento(null);
    setDetallesArchivo({
      nombre: "",
      tamano: "",
      registros: 0,
    });
    setDatosJson([]);
  };

  const csvAJson = (csv) => {
    const lineas = csv.split("\n");
    const encabezados = lineas[0].split(",");
    const json = lineas.slice(1).map((linea) => {
      const datos = linea.split(",");
      return encabezados.reduce((objeto, claveActual, indice) => {
        objeto[claveActual] = datos[indice];
        return objeto;
      }, {});
    });
    return json;
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30%",
          }}
        >
          <StyledText boldText>Registro masivo</StyledText>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: 'relative'}}>
          <div>
            <span style={{ color: documento ? 'black' : '#888' }}>Nombre del archivo: {documento ? detallesArchivo.nombre : 'No disponible'}</span>
          </div>
          <div>
            <span style={{ color: documento ? 'black' : '#888' }}>Cantidad de registros: {documento ? detallesArchivo.registros : 'No disponible'}</span>
          </div>
          {documento && (
              <Cancel 
                onClick={manejoCancelacion} 
                style={{ 
                  cursor: 'pointer',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'black',
                }} 
              />
            )}
        </div>
        <RowPercentage firstChildPercentage={40} gap="20px">
          <div >
            <EntradaArchivo onChange={manejoDocumentoCambio} accept=".csv" />
          </div>
          <div >
            <Button onClick={manejoDocumentoSubido} fullWidth>
              Procesar
            </Button>            
          </div>
        </RowPercentage>
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
          Usuarios registrados exitosamente.
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AdminHomeModule3;
