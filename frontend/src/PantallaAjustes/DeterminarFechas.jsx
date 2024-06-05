import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import TextInput from "../Utils/TextInput";
import RowPercentage from "../Responsive/RowPercentage";
import { useTheme } from "../Contexts/ThemeContext";
import axios from "axios";
import Button1 from "../Utils/Button";
import EntradaFecha from "../Utils/EntradaFecha";
import { URL_API } from "../services/const";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const DeterminarFechas = () => {
  const [mensajeError, cambiarMensajeError] = useState({
    fecha1: "",
    fecha2: "",
  });
  const { theme } = useTheme();
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [mensajeDialogo, setMensajeDialogo] = useState({
    mensajeNormal: "¿Estás seguro de que deseas guardar estos cambios?",
    mensajeFechas: "El rango de fechas no puede ser menor a 30 días, ¿Desea continuar?",
  });
  const [mostrarMensaje, setMostrarMensaje] = useState({
    mensajeNormal: true,
    mensajeFechas: false,
  });
  const navigate = useNavigate();

  const defaultStyle = {
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      background: theme.bgmain,
    },
    container: {
      display: "flex",
      width: "40%",
      gap: "20px",
    },
    cardStyle: {
      minHeight: "600px",
      padding: "30px 50px",
      borderColor: "blue",
      borderRadius: "15px",
    },
    fechas: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  };

  const handleConfirm = async () => {
    validarFecha1();
    validarFecha2();
    validarAmbasFechas();
  
    if (fecha1 !== "" && fecha2 !== "" && mensajeError.fecha1 === "" && mensajeError.fecha2 === "") {
      const data = {
        FechaIniSolicitudes: fecha1,
        FechaFinSolicitudes: fecha2,
      };
      setDialogoAbierto(true);
    
      try {
        const response = await axios.patch(`${URL_API}/admin/settings1`, data);
        if (response.status === 200) {
          console.log("Cambios guardados");
        }
      } catch (error) {
        console.error(error);
      } 
    }
  };

  const validarFecha1 = () => {
    if (fecha1 === "") {
      cambiarMensajeError(previo => ({
        ...previo,
        fecha1: "Seleccione una fecha de inicio",
      }));
    } else {
      cambiarMensajeError(previo => ({
        ...previo,
        fecha1: "",
      }));
    }
  }

  const validarFecha2 = () => {
    if (fecha2 === "") {
      cambiarMensajeError(previo => ({
        ...previo,
        fecha2: "Selecciona una fecha de fin",
      }));
    } else if (fecha1 !== "" && fecha2 !== "" && fecha1 > fecha2) {
      cambiarMensajeError(previo => ({
        ...previo,
        fecha2: "Seleccione una fecha fin mayor a la fecha de inicio",
      }));
    } else {
      cambiarMensajeError(previo => ({
        ...previo,
        fecha2: "",
      }));
    }
  }

  const validarAmbasFechas = () => {
    const fechita1 = fecha1.split("-");
    const fechita2 = fecha2.split("-");
    const diferencia = fechita2[2] - fechita1[2];
    if (diferencia < 30 && fechita1[1] === fechita2[1] && fechita1[0] === fechita2[0]
      || fechita1[1] !== fechita2[1] && (30 - parseInt(fechita1[2])) + parseInt(fechita2[2]) < 30) {
      setMostrarMensaje({ mensajeNormal: false, mensajeFechas: true });
    } else {
      setMostrarMensaje({ mensajeNormal: true, mensajeFechas: false });
    }
  };

  const manejoDialogoCerrar = () => {
    setDialogoAbierto(false);
  }

  const guardarTodo = () => {
    //backend acaaa si hace falta
    console.log("Guardando cambios");
    navigate("/Panel-Gestion-Reservas");
  }
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          style={{ ...defaultStyle.cardStyle, position: "relative" }}
          minWidth="100px"
          maxHeight="600px"
          fullWidth
          alignCenter
          padding="30px 50px"
          borderColor="blue"
          borderRadius="15px"
          overlayStyle={{
            backgroundColor: "rgba(0, 0, 255, 0.5)",
          }}
        >
          <div
            style={{
              width: "100%",
              flexDirection: "column",
              height: "100%",
              display: "flex",
              gap: "25px",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <div
              style={{
                height: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText boldText>Delimitar fechas</StyledText>
            </div>
            <div>
                <StyledText>Define el inicio de fecha para que los docentes puedan realizar solicitudes y también el fin para un mejor control de estas solicitudes.</StyledText>
            </div>
            <div style={defaultStyle.fechas}>
              <StyledText>Delimitar fechas de solicitudes</StyledText>
              <RowPercentage firstChildPercentage={50} gap="10px">
                <div>
                  <EntradaFecha
                    etiqueta="Fecha inicio"
                    enCambio={setFecha1}
                    mensajeValidacion={mensajeError.fecha1}
                    onBlur={validarFecha1}
                    valorInicial={fecha1}
                  />
                </div>
                <div>
                  <EntradaFecha
                    etiqueta="Fecha fin"
                    enCambio={setFecha2}
                    mensajeValidacion={mensajeError.fecha2}
                    onBlur={validarFecha2}
                    valorInicial={fecha2}
                  />
                </div>
              </RowPercentage>
            </div>
            <Button1 onClick={handleConfirm}>Guardar Cambios</Button1>
            <div
              style={{
                height: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
            <Dialog
              open={dialogoAbierto}
              onClose={manejoDialogoCerrar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {mostrarMensaje.mensajeNormal ? mensajeDialogo.mensajeNormal : mensajeDialogo.mensajeFechas}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={manejoDialogoCerrar}>Cancelar</Button>
                <Button onClick={guardarTodo} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeterminarFechas;
