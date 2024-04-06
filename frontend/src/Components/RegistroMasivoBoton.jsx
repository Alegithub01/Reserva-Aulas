import { useState } from 'react';
import Button from '../Utils/Button';
import MensajeExito from '../Utils/MensajeExito';
import { useTheme } from '../Contexts/ThemeContext';

const RegistroMasivoBoton = () => {
  const [documento, setDocumento] = useState(null);
  const [abrirDialogo, cambiarAbrirDialogo] = useState(false);
  const [mostrarMensaje, cambiarMostrarMensaje] = useState(false);
  const { theme } = useTheme();

  const mensajeValidacionEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    overflow: 'hidden',
  };

  const manejoDocumentoCambio = (e, valor) => {
    setDocumento(valor? e.target.files[0]: null);

  }

  const manejoDocumentoSubido = () => {
    if (documento) {
      const leerArchivo = new FileReader();
      leerArchivo.onload = (e) => {
        const texto = e.target.result;

        if (texto.includes('Nombre') && texto.includes('Capacidad') && texto.includes('Tipo') && texto.includes('Planta')
          && texto.includes('Ubicacion') && texto.includes('Servicios') && texto.includes('Dia') && texto.includes('Periodos')) {
          console.log('Archivo válido');
            localStorage.setItem('texto', texto);
          fetch('http://localhost:5173/api/usuarios/masivo', {  //cambiar a la ruta de la API laravel
            method: 'POST',
            body: documento
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.log(error);
            });
          cambiarAbrirDialogo(true);
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



return (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <input
      accept=".csv"
      style={{ padding: '10px', margin: '20px', border: `1px solid ${theme.secondary}`, backgroundColor: theme.secondary, borderRadius: '15px', fontSize: '0.98rem' }}
      type="file"
      onChange={(e)=>{manejoDocumentoCambio(e, true)}}
    />
    <MensajeExito
      abrirDialogo={abrirDialogo}
      cerrarDialogo={() => cambiarAbrirDialogo(false)}
      mensaje="Registros subidos con éxito"
    />
    <Button onClick={manejoDocumentoSubido}>Procesar CSV</Button>
    {mostrarMensaje && <div style={mensajeValidacionEstilo}>Seleccione un archivo con el formato correcto para registrar</div>}
    <div style={{margin: 5}}></div>
    <Button onClick={(e)=>{manejoDocumentoCambio(e, false); cambiarMostrarMensaje(false)}}>Cancelar</Button>
  </div>
);
};

export default RegistroMasivoBoton;