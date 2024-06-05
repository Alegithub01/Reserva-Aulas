import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import TextInput from "../Utils/TextInput";
import { useTheme } from "../Contexts/ThemeContext";
import axios from "axios";
import Button1 from "../Utils/Button";
import { URL_API } from "../services/const";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const AjustarContiguos = () => {
  const [mensajeError, cambiarMensajeError] = useState({
    fecha1: "",
    fecha2: "",
    maxContiguos: "",
  });
  const { theme } = useTheme();
  const [maxContiguos, setMaxContiguos] = useState(2);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [mensajeDialogo, setMensajeDialogo] = useState({
    mensajeNormal: "¿Estás seguro de que deseas guardar estos cambios?",
  });
  const [mostrarMensaje, setMostrarMensaje] = useState({
    mensajeNormal: true,
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
    validarMaxAulasContiguas();

    if (mensajeError.maxContiguos === "" && maxContiguos !== "") {
      const data = {
        NroMaxAmbientContiguos: maxContiguos
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

  const validarMaxAulasContiguas = () => {
    if (maxContiguos === "") {
      cambiarMensajeError(previo => ({
        ...previo,
        maxContiguos: "Ingrese un número de aulas contiguas",
      }));
    } else {
      cambiarMensajeError(previo => ({
        ...previo,
        maxContiguos: "",
      }));
    }
  }

  const manejarMaxAulasContiguas = (event, pattern, rango) => {
    const { value } = event.target;
    if (value.match(pattern)) {
      if (value >= rango.min && value <= rango.max) {
        setMaxContiguos(value);
        cambiarMensajeError(others => ({ ...others, maxContiguos: "" }));
      } else {
        cambiarMensajeError(others => ({
          ...others,
          maxContiguos: `El número de aulas contiguas debe estar entre ${rango.min} y ${rango.max}`,
        }));
      }
    } else {
      cambiarMensajeError({
        ...mensajeError,
        maxContiguos: "Ingrese un número válido",
      });
    }
  }
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
              <StyledText boldText>Ajustar Número de Amb. Contiguos</StyledText>
            </div>
            <div>
                <StyledText>Define el máximo número de ambientes contiguos que pueden solicitarse, los docentes estarán limitados a este número al solicitar más de un ambiente.</StyledText>
            </div>
            <div>
              <TextInput
                label="Máximo nro. aulas contiguas"
                fullWidth={true}
                onChange={(event) =>
                  manejarMaxAulasContiguas(event, "^[0-9]*$", {
                    min: 1,
                    max: 5,
                  })
                }
                onBlur={ validarMaxAulasContiguas }
                isRequired={true}
                validationMessage={mensajeError.maxContiguos}
                pattern="^[0-9]*$"
                rango={{ min: 1, max: 10 }}
                defaultValue={maxContiguos}
              />
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
                  {mensajeDialogo.mensajeNormal}
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

export default AjustarContiguos;
