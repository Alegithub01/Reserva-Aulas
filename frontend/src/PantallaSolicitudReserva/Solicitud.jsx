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
  const [materia, setMateria] = useState('');
  const [nroDocentes, setNroDocentes] = useState("1");
  const [nombreDocente, setNombreDocente] = useState('Tatiana Aparicio Yuja'); //nombre del docente loggeado
  const [grupoDocente, setGrupoDocente] = useState(''); //grupo del docente loggeado
  const [gruposDocentes, setGruposDocentes] = useState([]); // modo grupal
  const [docentes, setDocentes] = useState([]);
  const [ambiente, setAmbiente] = useState([]);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [serviciosSolicitados, setServiciosSolicitados] = useState('');
  const [detalles, setDetalles] = useState('');
  const [abrirDialogo, cambiarAbrirDialogo] = useState(false);
  const [mensajeError, setMensajeError] = useState({
    nroDocentes: '',
    grupoDocente: '',
    gruposDocentes: '',
    materia: '',
    ambiente: '',
    fecha: '',
    hora: '',
  });
  const [modo, setModo] = useState('individual');
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  function obtenerValorHora(horaBuscada, listaHoras) {
    for (const slot of listaHoras) {
      const inicioRango = slot.label.split('-')[0].trim();
      if (inicioRango === horaBuscada) {
        return slot.value;
      }
    }
    return null;
  }

  /*---------------------***********************- Para Base de datos con lo de las reglas**********************************/
  const infoDeLaBDReglas = "Reglas para solicitud de reserva de ambientes:\n" +"Mantener la limpieza y orden del ambiente. En caso de ser un laboratorio, registrar cada estudiante con la computadora asignada en la libreta."
  /*datos de prueba para los dropdowns */
  const cargarBDGruposIndividual = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const cargarBDGruposGrupal = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
  ];

  const cargarBDDocentes = [
    { value: "1", label: "Leticia Coca" },
    { value: "2", label: "Corina Flores" },
    { value: "3", label: "Vladimir Costas" },
    { value: "4", label: "Patricia Romero" },
    { value: "5", label: "Carla Salazar" },
    { value: "6", label: "Henry Villaroel" },
    { value: "7", label: "Leticia Coca" },
    { value: "8", label: "Vladimir Costas" },
    { value: "9", label: "Leticia Coca" },
  ];
  const cargarBDMateria = [
    { value: 1, label: "Progr. Funcional" },
    { value: 2, label: "Base de datos 2" },
    { value: 3, label: "Taller de Base de Datos" },
  ];   //convertir info de materias en este diccionario (solo nombres de materias no importa el valor)

  const cargarBDAmbiente = [
    { value: "691A", label: "691A", },
    { value: "691B", label: "691B", },
    { value: "691C", label: "691C", },
    { value: "692A", label: "692A", },
    { value: "692B", label: "692B", },
    { value: "693C", label: "693C", },
    { value: "693A", label: "693A", },
  ];    //convertir info de ambientes en este diccionario (solo nombres de ambientes)
  /* */
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

  const cambiarModo = (event, newModo) => {
    setModo(newModo);
  }

  const validarGrupoDocente = () => {
    if (grupoDocente.length === 0) {
      setMensajeError(previo => ({ ...previo, grupoDocente: 'Seleccione un ambiente' }));
    } else {
      setMensajeError(previo => ({ ...previo, grupoDocente: '' }));

    }
  }
  const validarNombresDocentes = (index) => {
    docentes[index].errorNombre = docentes[index].nombre.trim() === '';
  }

  const validarGruposDocentes = (index) => {
    docentes[index].errorGrupo = docentes[index].grupo.trim() === '';
  }

  const manejarCambioNroDocentes = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      setNroDocentes(valor);
      setMensajeError({ ...mensajeError, nroDocentes: '' });
    }
  }
  const validarVacioNroDocentes = () => {
    if (nroDocentes.trim() === '') {
      setMensajeError(previo => ({ ...previo, nroDocentes: "Ingrese cantidad de docentes" }));
    }
  }
  const validarSeleccionMateria = () => {
    if (materia === '') {
      setMensajeError(previo => ({ ...previo, materia: 'Seleccione una materia' }));
    }
  }

  const validarFecha = () => {
    if (fecha === null || fecha === '') {
      setMensajeError(previo => ({ ...previo, fecha: 'Seleccione una fecha' }));
    }
  }

  const validarSeleccionHora = () => {
    if (hora.length === 0) {
      setMensajeError(previo => ({ ...previo, hora: 'Seleccione una hora' }));
    } else {
      const horaOrdenada = hora.sort();
      for (let i = 1; i < horaOrdenada.length; i++) {
        const before = parseInt(horaOrdenada[i - 1]);
        const current = parseInt(horaOrdenada[i]);
        if (before !== current - 10) {
          setMensajeError(previo => ({ ...previo, hora: 'Seleccione periodos de hora consecutivos' }));
          break;
        } else {
          setMensajeError(previo => ({ ...previo, hora: '' }));
        }
      }
    }
  }

  const validarSeleccionAmbiente = () => {
    if (ambiente.length === 0) {
      setMensajeError(previo => ({ ...previo, ambiente: 'Seleccione un ambiente' }));
    } else {
      for (let i = 1; i < ambiente.length; i++) {
        const before = ambiente[i - 1];
        const current = ambiente[i];
        console.log(before, current);
        if (before.slice(0, 3) !== current.slice(0, 3)) {
          setMensajeError(previo => ({ ...previo, ambiente: 'Seleccione ambientes contiguos' }));
          break;
        } else {
          setMensajeError(previo => ({ ...previo, ambiente: '' }));
        }
      }
    }
  };

  const validarTodo = () => {
    validarSeleccionMateria();
    validarGrupoDocente();
    validarFecha();
    validarSeleccionHora();
    if (materia !== '' && fecha !== '' && hora.length !== 0 && ambiente !== '' && nroDocentes.trim() !== '' && docentes.every(docente => docente.nombre.trim() !== '' && docente.grupo.trim() !== '')) {
      console.log("Solicitud enviada");
      cambiarAbrirDialogo(true);
    } else {
      cambiarAbrirDialogo(false);
      console.log("Error en la solicitud");
    }
  }

  useEffect(() => {
    const lengthToFill = gruposDocentes.length;
    const corresponder = (grupo) => {
      return cargarBDDocentes.filter(docente => docente.value === grupo)[0].label;
    }
    const initialDocentes = [];
    for (let i = 0; i < lengthToFill; i++) {
      const nuevoNombre = corresponder(gruposDocentes[i]);
      if (initialDocentes.some(docente => docente.nombre === nuevoNombre)) {
        initialDocentes.map(docente => docente.nombre === nuevoNombre ? docente.grupo += `, ${gruposDocentes[i]}` : docente);
      } else {
        initialDocentes.push({ nombre: corresponder(gruposDocentes[i]), grupo: gruposDocentes[i], errorNombre: true, errorGrupo: true });
      }

    }
    setDocentes(initialDocentes);
  }, [gruposDocentes]);

  const manejarCambioNombre = (index, event, pattern) => {
    const newDocentes = [...docentes];
    newDocentes[index].nombre = event.target.value;
    if (pattern && RegExp(pattern).test(newDocentes[index].nombre)) {
      newDocentes[index].errorNombre = false;
      setDocentes(newDocentes);
    }
  };

  const manejarCambioGrupo = (index, event, pattern) => {
    const newDocentes = [...docentes];
    newDocentes[index].grupo = event.target.value;
    if (pattern && RegExp(pattern).test(newDocentes[index].grupo)) {
      newDocentes[index].errorGrupo = false;
      setDocentes(newDocentes);
    }
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
