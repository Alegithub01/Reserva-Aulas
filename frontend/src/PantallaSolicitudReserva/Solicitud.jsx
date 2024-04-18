import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import { useState } from "react";
import ButtonEstilizado from "../Utils/Button";
import TextInput from "../Utils/TextInput";
import Dropdown from "../Utils/Dropdown";
import RowPercentage from "../Responsive/RowPercentage";
import MensajeExito from "../Utils/MensajeExito";

/*datos de prueba para los dropdowns */
const cargarBDMateria = [
  { value: 1, label: "Progr. Funcional" },
  { value: 2, label: "Base de datos 2" },
  { value: 3, label: "Taller de Base de Datos" },
];

const cargarBDGrupo = [  //cambiamos a numeros para texto?
  { value: 1, label: "Grupo 1" },
  { value: 2, label: "Grupo 2" },
  { value: 3, label: "Grupo 3" },
];

const cargarBDAmbiente = [
  { value: 1, label: "691A", },
  { value: 2, label: "691B", },
  { value: 3, label: "691C", },
  { value: 4, label: "692A", },
  { value: 5, label: "692B", },
  { value: 6, label: "693C", },
  { value: 7, label: "693A", },
];
/* */


const Solicitud = () => {
  const { theme } = useTheme();
  const [nombreDocente, setNombreDocente] = useState('');
  const [materia, setMateria] = useState('');
  const [grupo, setGrupo] = useState('');
  const [ambiente, setAmbiente] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [serviciosSolicitados, setServiciosSolicitados] = useState('');
  const [detalles, setDetalles] = useState('');
  const [abrirDialogo, cambiarAbrirDialogo] = useState(false);
  const [mensajeError, setMensajeError] = useState({
    nombreDocente: '',
    materia: '',
    grupo: '',
    ambiente: '',
    capacidad: '',
    fecha: '',
    hora: '',
    serviciosSolicitados: '',
    detalles: '',
  });

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
  const manejarCambioNombreDocente = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      setNombreDocente(valor);
      setMensajeError({ ...mensajeError, nombreDocente: '' });
    }
  }
  const validarNombreDocente = () => {
    //falta lo de verificar si esta realmente en la base de datos(trabajo mio)
    if (nombreDocente.trim() === '') {
      setMensajeError({ ...mensajeError, nombreDocente: 'Ingrese el nombre del docente' });
    }
  }

  const manejarCambioCapacidad = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      setCapacidad(valor);
      setMensajeError + ({ ...mensajeError, capacidad: "" });
    }
  };
  const validarVacioCapacidad = () => {
    if (capacidad.trim() === "") {
      setMensajeError(previo => ({ ...previo, capacidad: "Ingrese la capacidad del ambiente" }));
    }
  };

  const validarSeleccionMateria = () => {
    if (materia === '') {
      setMensajeError({ ...mensajeError, materia: 'Seleccione una materia' });
    }
  }

  const validarSeleccionGrupo = () => {
    if (grupo === '') {
      setMensajeError({ ...mensajeError, grupo: 'Seleccione un grupo' });
    }
  }

  const manejarCambioFecha = (event) => {
    setFecha(event.target.value);
    setMensajeError({ ...mensajeError, fecha: '' });
  }
  const validarFecha = () => {
    if (fecha === '') {
      setMensajeError({ ...mensajeError, fecha: 'Seleccione una fecha' });
    }
  }

  const validarSeleccionHora = () => {
    if (hora === '') {
      setMensajeError({ ...mensajeError, hora: 'Seleccione una hora' });
    }
  }


  const validarTodo = () => {
    validarNombreDocente();
    validarSeleccionMateria();
    validarSeleccionGrupo();
    validarFecha();
    validarSeleccionHora();
    validarVacioCapacidad();
    if (nombreDocente.trim() !== '' && materia !== '' && grupo !== '' && fecha !== '' && hora !== '' && capacidad.trim() !== '') {
      console.log("Solicitud enviada");
      cambiarAbrirDialogo(true);
    } else {
      cambiarAbrirDialogo(false);
      console.log("Error en la solicitud");
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
  };
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

            <RowPercentage firstChildPercentage={0}>
              <TextInput
                label="Nombre del docente"
                fullWidth={true}
                onChange={(event) => manejarCambioNombreDocente(event, "^[a-zA-Z ]*$")}
                onBlur={validarNombreDocente}
                isRequired={true}
                validationMessage={mensajeError.nombreDocente}
                pattern="^[a-zA-Z ]*$"
              />
            </RowPercentage>
            <RowPercentage firstChildPercentage={40} gap="10px">
              <div>
                <Dropdown
                  etiqueta="Materia"
                  opciones={cargarBDMateria}
                  cambio={setMateria}
                  onBlur={validarSeleccionMateria}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.materia}
                />
              </div>
              <div>
                <Dropdown
                  etiqueta="Grupo"
                  opciones={cargarBDGrupo}
                  cambio={setGrupo}
                  onBlur={validarSeleccionGrupo}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.grupo}
                />
              </div>
            </RowPercentage>
            <RowPercentage firstChildPercentage={40} gap="10px">
              <div>
                <Dropdown
                  etiqueta="Ambiente"
                  opciones={cargarBDAmbiente}
                  cambio={setAmbiente}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.ambiente}  //ref
                />
              </div>
              <div>
                <TextInput
                  label="Capacidad"
                  fullWidth={true}
                  onChange={(event) => manejarCambioCapacidad(event, "^[0-9]*$", { min: 10, max: 300 })}
                  onBlur={validarVacioCapacidad}
                  isRequired={true}
                  validationMessage={mensajeError.capacidad}
                  pattern="^[0-9]*$"
                  rango={{ min: 10, max: 300 }}
                />
              </div>
            </RowPercentage>
            <RowPercentage firstChildPercentage={50} gap="10px">
              <div>
                <TextInput
                  label="Fecha"
                  fullWidth={true}
                  onChange={(event) => manejarCambioFecha(event)}
                  onBlur={validarFecha}
                  isRequired={true}
                  validationMessage={mensajeError.fecha}
                  type="date"
                />
              </div>
              <div>
                <Dropdown
                  etiqueta="Hora"
                  opciones={horas}
                  cambio={setHora}
                  onBlur={validarSeleccionHora}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.hora}
                />
              </div>
            </RowPercentage>
            <TextInput
              label="Servicios solicitados"
              pattern='^[A-Za-z0-9, ]{0,50}$'
              onChange={(event) => setServiciosSolicitados(event.target.value)}
            />
            <TextInput
              label="Detalles de Solicitud"
              pattern='^[A-Za-z0-9, ]{0,50}$'
              onChange={(event) => setDetalles(event.target.value)}
            />
            <MensajeExito
              abrirDialogo={abrirDialogo}
              cerrarDialogo={() => {
                cambiarAbrirDialogo(false); window.location.reload();
              }}
              mensaje="Solicitud registrada con éxito"
            />
            <ButtonEstilizado fullWidth={true} onClick={() => { validarTodo }}>Enviar Solicitud</ButtonEstilizado>
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
    </div>
  );
};

export default Solicitud;
