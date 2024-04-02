import Card from "../Utils/Card";
import { useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import Button from "../Utils/Button";
import StyledText from "../StyledText";
import EntradaArchivo from "../Utils/EntradaArchivo";
import RowPercentage from '../Responsive/RowPercentage';

const AdminHomeModule3 = () => {
  const [documento, setDocumento] = useState(null);
  const [detallesArchivo, setDetallesArchivo] = useState({
    nombre: "",
    tamano: "",
    registros: 0,
  });
  const [abrirDialogo, cambiarAbrirDialogo] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const { theme } = useTheme();

  const manejoDocumentoCambio = (e) => {
    setMensajeError("");
    const archivo = e.target.files[0];
    if (archivo) {
      setDocumento(archivo);
      setDetallesArchivo({
        nombre: archivo.name,
        tamano: (archivo.size / 1024).toFixed(2) + " KB",
        registros: 0,
      });

      const leerArchivo = new FileReader();
      leerArchivo.onload = (e) => {
        const contenido = e.target.result;
        const registros = contenido.split("\n").length;
        setDetallesArchivo((detalles) => ({
          ...detalles,
          registros: registros - 1,
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
    
    const formData = new FormData();
    formData.append("file", documento);

    fetch("http://localhost:5173/api/usuarios/masivo", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        cambiarAbrirDialogo(true);
        setMensajeError("");
      })
      .catch((error) => {
        console.error(error);
        setMensajeError("Error al subir el archivo. Intente nuevamente.");
      });
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <span style={{ color: documento ? 'black' : '#888' }}>Nombre del archivo: {documento ? detallesArchivo.nombre : 'No disponible'}</span>
          </div>
          <div>
            <span style={{ color: documento ? 'black' : '#888' }}>Cantidad de registros: {documento ? detallesArchivo.registros : 'No disponible'}</span>
          </div>
        </div>
        <RowPercentage firstChildPercentage={50} gap="20px">
          <div>
            <EntradaArchivo onChange={manejoDocumentoCambio} />
          </div>
          <div>
            <Button onClick={manejoDocumentoSubido}>
              Procesar
            </Button>            
          </div>
        </RowPercentage>
      </div>
    </Card>
  );
};

export default AdminHomeModule3;
