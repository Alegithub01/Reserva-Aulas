import { useState } from 'react';
import Button from '../Utils/Button';
import MensajeExito from '../Utils/MensajeExito';
import { useTheme } from '../Contexts/ThemeContext';

const RegistroMasivoBoton = () => {
  const [documento, setDocumento] = useState(null);
  const [abrirDialogo, cambiarAbrirDialogo] = useState(false);
  const { theme } = useTheme();

  const mensajeValidacionEstilo = {
    color: 'red',
    fontSize: '12px',
    transition: 'opacity 0.3s ease',
    overflow: 'hidden',
  };

  const manejoDocumentoCambio = (e) => {
    setDocumento(e.target.files[0]);
  }

  const manejoDocumentoSubido = () => {
    const documentos = new FormData();
    documentos.append('file', documento);

    fetch('http://localhost:5173/api/usuarios/masivo', {  //cambiar a la ruta de la API laravel
      method: 'POST',
      body: documentos
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    if (documento) {
      const leerArchivo = new FileReader();
      leerArchivo.onload = (e) => {
        const texto = e.target.result;
        console.log(texto);
        localStorage.setItem('texto', texto);
      };
      leerArchivo.readAsText(documento);
      cambiarAbrirDialogo(true);
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <input
        accept=".csv"
        style={{ padding: '10px', margin: '20px', border: `1px solid ${theme.secondary}`, backgroundColor: theme.secondary, borderRadius: '15px', fontSize: '0.98rem' }}
        type="file"
        onChange={manejoDocumentoCambio}
      />
      <MensajeExito
        abrirDialogo={abrirDialogo}
        cerrarDialogo={() => cambiarAbrirDialogo(false)}
        mensaje="Registros subidos con éxito"
      />
      <Button onClick={manejoDocumentoSubido}>Procesar CSV</Button>
      {!documento && <div style={mensajeValidacionEstilo}>Seleccione un archivo correcto para registrar</div>}
    </div>
  );
};

export default RegistroMasivoBoton;