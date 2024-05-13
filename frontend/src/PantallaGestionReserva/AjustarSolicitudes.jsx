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
import useAjusteStore from "../Contexts/AjusteStore";
import { set } from "date-fns";


const AjustarSolicitudes = () => {
  const [mensajeError, cambiarMensajeError] = useState({
    nroPeriodos: "",
    fecha1: "",
    fecha2: "",
  });
  const { theme } = useTheme();
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [nroPeriodos, setNroPeriodos] = useState("");
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const navigate = useNavigate();
  const {setFechaInicio, setFechaFin, setNroPeriodosAmbiente} = useAjusteStore();

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

  const handleConfirm = () => {
    validarNroPeriodos();
    validarFecha1();
    validarFecha2();
    if (nroPeriodos !== "" && fecha1 !== "" && fecha2 !== ""
      && mensajeError.nroPeriodos === "" && mensajeError.fecha1 === "" && mensajeError.fecha2 === ""
    ) {
      setDialogoAbierto(true);
      //backend acaa o no
      //console.log(nroPeriodos, fecha1, fecha2)
    } else {
      console.log("No se puede guardar cambios");
    }

  };
  const manejarNroPeriodos = (event, pattern, rango) => {
    const { value } = event.target;
    if (value.match(pattern)) {
      if (value >= rango.min && value <= rango.max) {
        setNroPeriodos(value);
        setNroPeriodosAmbiente(value);
        cambiarMensajeError({ ...mensajeError, nroPeriodos: "" });
      } else {
        cambiarMensajeError({
          ...mensajeError,
          nroPeriodos: `El número de periodos debe estar entre ${rango.min} y ${rango.max}`,
        });
      }
    } else {
      cambiarMensajeError({
        ...mensajeError,
        nroPeriodos: "Ingrese un número válido",
      });
    }
  };

  const validarNroPeriodos = () => {
    if (nroPeriodos === "") {
      cambiarMensajeError({
        ...mensajeError,
        nroPeriodos: "Ingrese un número de periodos",
      });
    }
  }

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
      console.log("por que no se ajusta", fecha1);
      setFechaInicio(fecha1);
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
      setFechaFin(fecha2);
    }
  }

  const manejoDialogoCerrar = () => {
    setDialogoAbierto(false);
  }

  const guardarTodo = () => {
    //backend acaaa
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
              <StyledText boldText>Ajustar Solicitudes</StyledText>
            </div>
            <div>
              <TextInput
                label="Máximo nro. periodos aula - auditorio"
                fullWidth={true}
                onChange={(event) =>
                  manejarNroPeriodos(event, "^[0-9]*$", {
                    min: 1,
                    max: 10,
                  })
                }
                onBlur={validarNroPeriodos}
                isRequired={true}
                validationMessage={mensajeError.nroPeriodos}
                pattern="^[0-9]*$"
                rango={{ min: 1, max: 10 }}
                defaultValue={nroPeriodos}
              />
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
                  ¿Estás seguro de que deseas guardar estos cambios?
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

export default AjustarSolicitudes;
