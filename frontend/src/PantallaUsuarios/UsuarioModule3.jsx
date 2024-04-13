import Card from "../Utils/Card";
import { useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import Button from "../Utils/Button";
import StyledText from "../StyledText";
import EntradaArchivo from "../Utils/EntradaArchivo";
import { Cancel } from '@mui/icons-material';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';
const AdminHomeModule3 = () => {
  const [documento, setDocumento] = useState(null);
  const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
  const [snackbarOpenError, setSnackbarOpenError] = useState(false);
  const [detallesArchivo, setDetallesArchivo] = useState({
    nombre: "",
    tamano: "",
    registros: 0,
  });
  const [datosJson, setDatosJson] = useState([]);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);

  const { theme } = useTheme();

  const handleCloseSnackbarSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpenSuccess(false);
  };

  const handleCloseSnackbarError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpenError(false);
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
      console.log("Archivo cargado:", archivo);
    }
  };

  const manejoDocumentoSubido = () => {
    if (!documento) {
      setMensajeError("Seleccione un archivo para procesar.");
      return;
    }
    setCargando(true);
    console.log("Datos para el backend:", datosJson);

    const formData = new FormData();
    formData.append("file", documento);
    console.log(formData);

    axios.post("http://localhost:8000/api/auth/registerMany", datosJson)
      .then(response => {
        console.log(response.data);
        setSnackbarOpenSuccess(true);
        setMensajeExito("Usuarios registrados exitosamente.");
        setMensajeError("");
      })
      .catch(error => {
        console.error(error);
        setSnackbarOpenError(true);
        setMensajeError("Error al procesar el archivo. Intente nuevamente.");
        setMensajeExito("");
      })
      .finally(() => setCargando(false));
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
  const defaultStyle = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      with:'100%',
      background: theme.bgmain,
    },
    container: {
      display: 'flex',
      width: '50%',
      minWidth: '600px',
      minHeight: '450px',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }
  };
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          minWidth="300px"
          minHeight="100px"
          fullWidth
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
            {cargando && (
              <div style={defaultStyle.loadingOverlay}>
                <CircularProgress />
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30%",
              }}
            >
              <StyledText boldText>Registro masivo de usuarios</StyledText>
            </div>
            <div style={{ display: "flex", flexDirection: "column", position: 'relative', gap:20}}>
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
              <div >
                <EntradaArchivo onChange={manejoDocumentoCambio} accept=".csv" />
              </div>
              <div >
                <Button onClick={manejoDocumentoSubido} fullWidth>
                  Procesar
                </Button>            
              </div>
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
            open={snackbarOpenSuccess}
            autoHideDuration={6000}
            onClose={handleCloseSnackbarSuccess}
          >
            <Alert
              onClose={handleCloseSnackbarSuccess}
              severity="success"
              sx={{ width: "100%" }}
            >
              {mensajeExito}
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackbarOpenError}
            autoHideDuration={6000}
            onClose={handleCloseSnackbarError}
          >
            <Alert
              onClose={handleCloseSnackbarError}
              severity="error"
              sx={{ width: "100%" }}
            >
              {mensajeError}
            </Alert>
          </Snackbar>
        </Card>
      </div>
  </div>
  );
};

export default AdminHomeModule3;
