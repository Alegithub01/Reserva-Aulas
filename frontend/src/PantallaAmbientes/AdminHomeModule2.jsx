import { useState } from 'react';
import Card from "../Utils/Card";
import Button from "../Utils/Button";
import TextInput from "../Utils/TextInput";
import RowPercentage from "../Responsive/RowPercentage";
import StyledText from "../StyledText";
import Dropdown from "../Utils/Dropdown";
import SelectorMultiple from '../Utils/SelectorMultiple';
import MensajeExito from '../Utils/MensajeExito';
import axios from 'axios';
import { useTheme } from '../Contexts/ThemeContext';
import { URL_API } from '../services/const';

const AdminHomeModule2 = () => {
  const { theme } = useTheme();
  const [nombre, cambiarNombre] = useState("");
  const [capacidad, cambiarCapacidad] = useState("");
  const [tipo, cambiarTipo] = useState("");
  const [planta, cambiarPlanta] = useState("");
  const [servicios, cambiarServicios] = useState("");
  const [ubicacion, cambiarUbicacion] = useState("");
  const [dia, cambiarDia] = useState("");
  const [horas, cambiarHoras] = useState([]);
  const [abrirDialogo, cambiarAbrirDialogo] = useState(false);
  const [mensajeError, cambiarMensajeError] = useState({
    nombre: "",
    capacidad: "",
    tipo: "",
    planta: "",
    dia: "",
    horas: "",
  });

  const registrarAmbiente = async () => {
    const valorTipo = ambientes.find(opcion => opcion.value === tipo).label;
    const valorPlanta = plantas.find(opcion => opcion.value === planta).label;
    const valorDia = dias.find(opcion => opcion.value === dia).label;
    const valorHoras = horas.map(hora => horarios.find(opcion => opcion.value === hora).label);
    console.log(valorTipo, valorPlanta, valorDia, valorHoras);
    try {
      const response = await axios.post(`${URL_API}/ambientes`, {
        nombre: nombre,
        capacidad: capacidad,
        tipo: valorTipo,
        planta: valorPlanta,
        ubicacion: ubicacion,
        servicios: servicios,
        dia: valorDia,
        horas: valorHoras,
      });
      console.log(response.data);
      cambiarAbrirDialogo(true);
    } catch (error) {
      console.error('Error al registrar ambiente:', error);

    }
  };



  const ambientes = [
    { value: "10", label: "Aula" },
    { value: "20", label: "Auditorio" },
    { value: "30", label: "Laboratorio" },
  ];

  const horarios = [
    { value: "10", label: "06:45-08:15" },
    { value: "20", label: "08:15-09:45" },
    { value: "30", label: "09:45-11:15" },
    { value: "40", label: "11:15-12:45" },
    { value: "50", label: "12:45-14:15" },
    { value: "60", label: "14:15-15:45" },
    { value: "70", label: "15:45-17:15" },
    { value: "80", label: "17:15-18:45" },
    { value: "90", label: "18:45-20:15" },
    { value: "100", label: "20:15-21:45" },
  ];

  const dias = [
    { value: "10", label: "Lunes" },
    { value: "20", label: "Martes" },
    { value: "30", label: "Miércoles" },
    { value: "40", label: "Jueves" },
    { value: "50", label: "Viernes" },
    { value: "60", label: "Sábado" },
    { value: "70", label: "Domingo" },
  ];

  const plantas = [
    { value: "10", label: "Planta 0" },
    { value: "20", label: "Planta 1" },
    { value: "30", label: "Planta 2" },
    { value: "40", label: "Planta 3" },
  ];

  const validarInfoOblig = () => {
    console.log(nombre, capacidad, tipo, planta, ubicacion, servicios, dia, horas);
    validarVacioNombre();
    validarVacioCapacidad();
    validarSeleccionTipo();
    validarSeleccionPlanta();
    validarSeleccionDia();
    validarSeleccionHoras();

    if (nombre.trim() !== "" && capacidad.trim() !== "" && tipo.trim() !== "" && planta.trim() !== "" && dia.trim() !== "" && horas.length !== 0) {
      registrarAmbiente();
      cambiarAbrirDialogo(true);
    } else {
      cambiarAbrirDialogo(false);
    }

  }

  const manejarCambioNombre = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      cambiarNombre(valor);
      cambiarMensajeError({ ...mensajeError, nombre: "" });
    }
  };
  const validarVacioNombre = () => {
    if (nombre.trim() === "") {
      cambiarMensajeError(previo => ({ ...previo, nombre: "Ingrese nombre del ambiente" }));
    }
  }

  const manejarCambioCapacidad = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      cambiarCapacidad(valor);
      cambiarMensajeError({ ...mensajeError, capacidad: "" });
    }
  };
  const validarVacioCapacidad = () => {
    if (capacidad.trim() === "") {
      cambiarMensajeError(previo => ({ ...previo, capacidad: "Ingrese la capacidad del ambiente" }));
    }
  };

  const validarSeleccionTipo = () => {
    if (tipo.trim() === '') {
      cambiarMensajeError(previo => ({ ...previo, tipo: "Seleccione el tipo de ambiente" }));
    }
  };

  const validarSeleccionPlanta = () => {
    if (planta.trim() === '') {
      cambiarMensajeError(previo => ({ ...previo, planta: "Seleccione la planta" }));
    } else {
      cambiarMensajeError(previo => ({ ...previo, planta: "" }));
    }
  };

  const validarSeleccionDia = () => {
    if (dia.trim() === '') {
      cambiarMensajeError(previo => ({ ...previo, dia: "Seleccione el día" }));
    }
  };

  const validarSeleccionHoras = () => {
    if (horas.length === 0) {
      cambiarMensajeError(previo => ({ ...previo, horas: "Seleccione los periodos de hora" }));
    } else {
      cambiarMensajeError(previo => ({ ...previo, horas: "" }))
    }
  };
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
          minWidth="300px"
          minHeight="100px"
          fullWidth
          alignCenter
          padding="30px 60px"
          borderColor="blue"
          borderRadius="15px"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: '10px'
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText boldText>Registro de Ambiente</StyledText>

            </div>
            <RowPercentage firstChildPercentage={60} gap="10px">
              <div>
                <TextInput
                  label="Nombre"
                  fullWidth={true}
                  onChange={(event) => manejarCambioNombre(event, "^[0-9A-Z]*$")}
                  onBlur={validarVacioNombre}
                  isRequired={true}
                  validationMessage={mensajeError.nombre}
                  pattern="^[0-9A-Z]{0,8}$"
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
            <RowPercentage firstChildPercentage={40} gap="10px">
              <div>
                <Dropdown
                  etiqueta="Tipo de Ambiente"
                  opciones={ambientes}
                  cambio={cambiarTipo}
                  onBlur={validarSeleccionTipo}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.tipo}
                />
              </div>
              <div>
                <Dropdown
                  etiqueta="Planta"
                  opciones={plantas}
                  cambio={cambiarPlanta}
                  onBlur={validarSeleccionPlanta}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.planta}
                />
              </div>
            </RowPercentage>
            <TextInput
              label="Ubicación"
              pattern='^[A-Za-z0-9, ]{0,50}$'
              onChange={(event) => cambiarUbicacion(event.target.value)}
            />
            <TextInput
              label="Servicios"
              pattern='^[A-Za-z0-9, ]{0,50}$'
              onChange={(event) => cambiarServicios(event.target.value)}
            />

            <RowPercentage firstChildPercentage={60} gap="10px">
              <div>
                <Dropdown
                  etiqueta="Día"
                  opciones={dias}
                  cambio={cambiarDia}
                  onBlur={validarSeleccionDia}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.dia}
                />
              </div>
              <div>
                <SelectorMultiple
                  etiqueta="Periodos de hora"
                  opciones={horarios}
                  cambio={cambiarHoras}
                  llenado={validarSeleccionHoras}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.horas}
                />
              </div>
            </RowPercentage>
            <MensajeExito
              abrirDialogo={abrirDialogo}
              cerrarDialogo={() => {
                cambiarAbrirDialogo(false); window.location.reload();
              }}
              mensaje="Ambiente registrado con éxito"
            />
            <Button fullWidth={true} onClick={validarInfoOblig}>Guardar</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminHomeModule2;
