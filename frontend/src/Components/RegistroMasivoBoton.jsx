import { useState } from 'react';
import Button from '../Utils/Button';
import { useTheme } from '../Contexts/ThemeContext';
import EntradaArchivo from "../Utils/EntradaArchivo";
import { Cancel } from '@mui/icons-material';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const RegistroMasivoBoton = () => {
  const [documento, setDocumento] = useState(null);
  const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
  const [snackbarOpenError, setSnackbarOpenError] = useState(false);
  const [detallesArchivo, setDetallesArchivo] = useState({
    nombre: "",
    tamano: "",
    registros: 0,
  });
  const [mostrarMensaje, cambiarMostrarMensaje] = useState(false);
  const [mostrarMensajeError, cambiarMostrarMensajeError] = useState(false);
  const [datosJson, setDatosJson] = useState([]);
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);
  const { theme } = useTheme();

  const mensajeValidacionEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    overflow: 'hidden',
  };
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

  const manejoDocumentoCambio = (e, valor) => {
    setDocumento(valor ? e.target.files[0] : null);
    setDetallesArchivo({
      nombre: valor ? e.target.files[0].name : "",
      tamano: valor ? (e.target.files[0].size / 1024).toFixed(2) + " KB" : "",
      registros: 0,
    });
  }

  const manejoDocumentoSubido = () => {
    if (documento) {
      const leerArchivo = new FileReader();
      leerArchivo.onload = (e) => {
        const texto = e.target.result;
        if (texto.includes('horas', 'dia', 'servicios', 'ubicacion', 'planta', 'tipo', 'capacidad', 'nombre')) {
          const lineas = texto.split('\n').slice(1);
          const registros = lineas.map((linea) => {
            let campos = linea.split(',');
            if (campos.length > 8) {
              campos[7] = campos.slice(7).join(',');
              campos = campos.slice(0, 8);
            }
            campos[7] = campos[7] ? campos[7].split(',') : []; 
            campos[7] = campos[7].map((hora) => hora.replace(/^\"|\"$/g, '')); // Eliminar comillas dobles alrededor de cada hora
            campos[7] = campos[7].map((hora) => hora.replace(/\\\"/g, '"')); // Eliminar escapes adicionales
            return {
              nombre: campos[0],
              capacidad: parseInt(campos[1]),
              tipo: campos[2],
              planta: campos[3],
              ubicacion: campos[4],
              servicios: campos[5],
              dia: campos[6],
              horas: campos[7],
            };
          });
        }
      };
      leerArchivo.readAsText(documento);
    }
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

  const enviarDatosAlBackend = async (registros) => {
    console.log(registros)
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/importar-ambientes', registros, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      
      setMostrarMensajeExito('Datos registrados exitosamente');
      setSnackbarOpenSuccess(true);
    } catch (error) {
      console.error('Error al enviar los datos al backend:', error);
      
      cambiarMostrarMensajeError(true);
    }
  };

  const defaultStyle = {
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
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }
  };

  return (
    <div style={defaultStyle.container}>
      {cargando && (
        <div style={defaultStyle.loadingOverlay}>
          <CircularProgress />
        </div>
      )}
      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <div>
          <span style={{ color: documento ? 'black' : '#888' }}>Nombre del archivo: {documento ? detallesArchivo.nombre : 'No disponible'}</span>
        </div>
        {documento && (
          <Cancel
            onClick={manejoCancelacion}
            style={{
              cursor: 'pointer',

              color: 'black',
            }}
          />
        )}
      </div>

      <div>
        <span style={{ color: documento ? 'black' : '#888' }}>Cantidad de registros: {documento ? detallesArchivo.registros : 'No disponible'}</span>
      </div>
      <div >
        <EntradaArchivo onChange={e => manejoDocumentoCambio(e, true)} accept=".csv" />
      </div>
      <div >
        <Button onClick={manejoDocumentoSubido} fullWidth>
          Procesar
        </Button>
      </div>
      {mostrarMensaje && <div style={mensajeValidacionEstilo}>Seleccione un archivo con un tamaño menor para registrar</div>}
      <Snackbar open={snackbarOpenSuccess} autoHideDuration={6000} onClose={handleCloseSnackbarSuccess}>
        <Alert onClose={handleCloseSnackbarSuccess} severity="success">
          {mostrarMensajeExito}
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarOpenError} autoHideDuration={6000} onClose={handleCloseSnackbarError}>
        <Alert onClose={handleCloseSnackbarError} severity="error">
          Error al enviar los datos al backend
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegistroMasivoBoton;