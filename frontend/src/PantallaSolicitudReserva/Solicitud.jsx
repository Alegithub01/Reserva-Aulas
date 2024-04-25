import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import { useEffect, useState } from "react";
import Button from "../Utils/Button";
import CalendarioStore from "../Contexts/CalendarioStore"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormularioIndividual from "./FormularioIndividual";
import FormularioGrupal from "./FormularioGrupal";
import { Tooltip, IconButton } from "@mui/material";
import RuleIcon from '@mui/icons-material/Rule';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const SolicitudMultiple = () => {
  const { theme } = useTheme();
  const { aula, dia, horario } = CalendarioStore();
  const [modo, setModo] = useState('individual');
  
  const horas = [
    { value: "10", label: "06:45-08:15" },
    { value: "20", label: "08:15-09:45" },
    { value: "30", label: "09:45-11:15" },
    { value: "40", label: "11:15-12:45" },
    { value: "50", label: "12:45-14:15" },
    { value: "60", label: "14:15-15:45" },
    { value: "70", label: "15:45-17:15" },
    { value: "80", label: "17:15-18:45" },
    { value: "90", label: "18:45-20:15" },
    { value: "100", label: "20:30-21:45" },
  ];
  function obtenerValorHora(horaBuscada, listaHoras) {
    for (const slot of listaHoras) {
      const inicioRango = slot.label.split('-')[0].trim();
      if (inicioRango === horaBuscada) {
        return slot.value;
      }
    }
    return null;
  }

  const cambiarModo = (event, newModo) => {
    setModo(newModo);
  }

  const defaultStyle = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      with: '100%',
      background: theme.bgmain,
    },
    container: {
      display: 'flex',
      width: '50%',
      minWidth: '600px',
      minHeight: '450px',
    },
    reglitas: {
      position: 'absolute',
      bottom: '80px',
      left: '80px',
    }
  };

  const valorDeHora = obtenerValorHora(horario, horas);
  const horaInicial = valorDeHora ? [valorDeHora] : null;
  const aulaInicial = aula ? [aula] : null;
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          minWidth="100px"
          minHeight="100px"
          fullWidth
          alignCenter
          padding="30px 50px"
          borderColor="blue"
          borderRadius="15px"
        >
          <div
            style={{
              width: "100%",
              flexDirection: "column",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
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
              <StyledText boldText>Solicitud de Reserva</StyledText>
            </div>
            <ToggleButtonGroup
              color="secondary"
              value={modo}
              exclusive
              onChange={cambiarModo}
              aria-label="Platform"
            >
              <ToggleButton value="individual" sx={{ width: '50%', fontWeight: 'bold', border: `2px solid`, color: theme.secondary }}>Individual</ToggleButton>
              <ToggleButton value="grupal" sx={{ width: '50%', fontWeight: 'bold', border: `2px solid`, color: theme.secondary }}>Grupal</ToggleButton>
            </ToggleButtonGroup>
            {modo === 'individual' ?
              (
                <FormularioIndividual
                  aulaInicial={aulaInicial}
                  horaInicial={horaInicial}
                />
              ) : (
                <FormularioGrupal
                  aulaInicial={aulaInicial}
                  horaInicial={horaInicial}
                />
              )}
            <Dialog
              open={dialogoAbierto}
              onClose={()=>{setDialogoAbierto(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {infoDeLaBDReglas}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>{setDialogoAbierto(false)}}>Entendido</Button>
              </DialogActions>
            </Dialog>
            <div
              style={{
                height: "0%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
            
          </div>
        </Card>
      </div>
      <div style={defaultStyle.reglitas}>
        <Tooltip title="Reglas para solicitud">
          <IconButton style={{ color: 'white', border: '2px solid white' }} size="large" onClick={()=>{setDialogoAbierto(true)}}>
            <RuleIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default SolicitudMultiple;
