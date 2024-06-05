import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import TextInput from "../Utils/TextInput";
import RowPercentage from "../Responsive/RowPercentage";
import { useTheme } from "../Contexts/ThemeContext";
import axios from "axios";
import Button1 from "../Utils/Button";
import { URL_API } from "../services/const";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const AjustarPeriodos = () => {
  const [mensajeError, cambiarMensajeError] = useState({
    nroPeriodosAud: "",
    nroPeriodosAula: "",
    nroPeriodosLab: "",
  });
  const { theme } = useTheme();
  const [nroPeriodosAula, setNroPeriodosAula] = useState("");
  const [nroPeriodosAuditorio, setNroPeriodosAuditorio] = useState("");
  const [nroPeriodosLaboratorio, setNroPeriodosLaboratorio] = useState("");
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [mensajeDialogo, setMensajeDialogo] = useState({
    mensajeNormal: "¿Estás seguro de que deseas guardar estos cambios?"
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
    validarNroPeriodos(nroPeriodosAuditorio, "nroPeriodosAud");
    validarNroPeriodos(nroPeriodosAula, "nroPeriodosAul");
    validarNroPeriodos(nroPeriodosLaboratorio, "nroPeriodosLab");
  
    const nPeriodos = nroPeriodosAula !== "" && nroPeriodosAuditorio !== "" && nroPeriodosLaboratorio !== "";
    const mensajePeriodos = mensajeError.nroPeriodosAud === "" && mensajeError.nroPeriodosAula === "" && mensajeError.nroPeriodosLab === "";
    if (nPeriodos && mensajePeriodos) {
      const data = {
        nroMaxPeriodAuditorio: nroPeriodosAuditorio,
        nroMaxPeriodAula: nroPeriodosAula,
        nroMaxPeriodLaboratorio: nroPeriodosLaboratorio,
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
    }else{
      console.log(mensajePeriodos);
    }
  };

  const manejarNroPeriodos = (event, pattern, rango, tipo) => {
    const { value } = event.target;
    if (value.match(pattern)) {
      if (value >= rango.min && value <= rango.max) {
        tipo(value);
        cambiarMensajeError(others => ({ ...others, nroPeriodos: "" }));
      } else {
        cambiarMensajeError(others => ({
          ...others,
          nroPeriodos: `El número de periodos debe estar entre ${rango.min} y ${rango.max}`,
        }));
      }
    } else {
      cambiarMensajeError({
        ...mensajeError,
        nroPeriodos: "Ingrese un número válido",
      });
    }
  };

  const validarNroPeriodos = (tipo, errorcorresp) => {
    if (tipo === "") {
      cambiarMensajeError(mensaje => ({
        ...mensaje,
        [errorcorresp]: "Ingrese un número de periodos",
      }));
    } else {
      cambiarMensajeError(mensaje => ({
        ...mensaje,
        [errorcorresp]: "",
      }));
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
              <StyledText boldText>Ajustar número de periodos</StyledText>
            </div>
            <div>
                <StyledText>Define el máximo número de periodos por cada tipo de ambiente, los docentes estarán limitados a este número al solicitar periodos de horas.</StyledText>
            </div>
            <div>
              <RowPercentage firstChildPercentage={50} gap="10px">
                <div>
                  <TextInput
                    label="Máximo nro. periodos aula"
                    fullWidth={true}
                    onChange={(event) =>
                      manejarNroPeriodos(event, "^[0-9]*$", {
                        min: 1,
                        max: 10,
                      }, setNroPeriodosAula)
                    }
                    onBlur={() => { validarNroPeriodos(nroPeriodosAula, "nroPeriodosAul") }}
                    isRequired={true}
                    validationMessage={mensajeError.nroPeriodosAul}
                    pattern="^[0-9]*$"
                    rango={{ min: 1, max: 10 }}
                    defaultValue={nroPeriodosAula}
                  />
                </div>
                <div>
                  <TextInput
                    label="Máximo nro. periodos auditorio"
                    fullWidth={true}
                    onChange={(event) =>
                      manejarNroPeriodos(event, "^[0-9]*$", {
                        min: 1,
                        max: 10,
                      }, setNroPeriodosAuditorio)
                    }
                    onBlur={() => validarNroPeriodos(nroPeriodosAuditorio, "nroPeriodosAud")}
                    isRequired={true}
                    validationMessage={mensajeError.nroPeriodosAud}
                    pattern="^[0-9]*$"
                    rango={{ min: 1, max: 10 }}
                    defaultValue={nroPeriodosAuditorio}
                  />
                </div>
              </RowPercentage>
            </div>
            <div>
              <TextInput
                label="Máximo nro. periodos laboratorio"
                fullWidth={true}
                onChange={(event) =>
                  manejarNroPeriodos(event, "^[0-9]*$", {
                    min: 1,
                    max: 10,
                  }, setNroPeriodosLaboratorio)
                }
                onBlur={() => validarNroPeriodos(nroPeriodosLaboratorio, "nroPeriodosLab")}
                isRequired={true}
                validationMessage={mensajeError.nroPeriodosLab}
                pattern="^[0-9]*$"
                rango={{ min: 1, max: 10 }}
                defaultValue={nroPeriodosLaboratorio}
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

export default AjustarPeriodos;
