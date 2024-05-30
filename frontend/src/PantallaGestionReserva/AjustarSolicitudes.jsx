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


const AjustarSolicitudes = () => {
  const [mensajeError, cambiarMensajeError] = useState({
    nroPeriodosAud: "",
    nroPeriodosAula: "",
    nroPeriodosLab: "",
    fecha1: "",
    fecha2: "",
    maxContiguos: "",
  });
  const { theme } = useTheme();
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [maxContiguos, setMaxContiguos] = useState(2);
  const [nroPeriodosAula, setNroPeriodosAula] = useState("");
  const [nroPeriodosAuditorio, setNroPeriodosAuditorio] = useState("");
  const [nroPeriodosLaboratorio, setNroPeriodosLaboratorio] = useState("");
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
    validarNroPeriodos();
    validarFecha1();
    validarFecha2();
    validarAmbasFechas();
  
    const nPeriodos = nroPeriodosAula !== "" && nroPeriodosAuditorio !== "" && nroPeriodosLaboratorio !== "";
    const mensajePeriodos = mensajeError.nroPeriodosAud === "" && mensajeError.nroPeriodosAula === "" && mensajeError.nroPeriodosLab === "";
    if (nPeriodos && fecha1 !== "" && fecha2 !== "" && mensajePeriodos && mensajeError.fecha1 === "" && mensajeError.fecha2 === "") {
      const data = {
        nroMaxPeriodAuditorio: nroPeriodosAuditorio,
        nroMaxPeriodAula: nroPeriodosAula,
        nroMaxPeriodLaboratorio: nroPeriodosLaboratorio,
        FechaIniSolicitudes: fecha1,
        FechaFinSolicitudes: fecha2,
        NroMaxAmbientContiguos: maxContiguos
      };
      setDialogoAbierto(true);
    
      try {
        const response = await axios.post(`${URL_API}/admin/settings`, data);
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
              <StyledText boldText>Ajustar Solicitudes</StyledText>
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

export default AjustarSolicitudes;
