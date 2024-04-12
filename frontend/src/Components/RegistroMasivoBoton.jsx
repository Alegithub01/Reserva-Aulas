import { useState } from 'react';
import Button from '../Utils/Button';
import { useTheme } from '../Contexts/ThemeContext';
import EntradaArchivo from "../Utils/EntradaArchivo";
import { Cancel } from '@mui/icons-material';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';

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
        if (texto.includes('Periodos', 'Dia', 'Servicios', 'Ubicacion', 'Planta', 'Tipo', 'Capacidad', 'Nombre')) {
          const lineas = texto.split('\n').slice(1);
          const registros = lineas.map((linea) => {
            const campos = linea.split(',').map(campo => campo.trim());
            return {
              nombre: campos[0],
              capacidad: parseInt(campos[1]),
              tipo: campos[2],
              planta: campos[3],
              ubicacion: campos[4],
              servicios: campos[5],
              dia: campos[6],
              horas: JSON.stringify(campos[7]),
            };
          });

          localStorage.setItem('registros', JSON.stringify(registros));

          //acá se debería hacer la petición POST
          setDatosJson(registros);
          setDetallesArchivo((detalles) => ({ ...detalles, registros: registros.length }));

          cambiarMostrarMensaje(false);
        } else {
          cambiarMostrarMensaje(true);
        }
      };
      leerArchivo.readAsText(documento);
    } else {
      cambiarMostrarMensaje(true);
    }
  }
  const manejoCancelacion = () => {
    setDocumento(null);
    setDetallesArchivo({
      nombre: "",
      tamano: "",
      registros: 0,
    });
    setDatosJson([]);
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

    </div>
  );
};

export default RegistroMasivoBoton;