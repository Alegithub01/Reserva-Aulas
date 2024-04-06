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

const AdminHomeModule2 = () => {
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

  const ambientes = [
    { value: "10", label: "Aula" },
    { value: "20", label: "Auditorio" },
    { value: "30", label: "Laboratorio" },
  ];

  const horarios = [
    { value: "10", label: "06:45-08:15" },
    { value: "20", label: "08:30-09:45" },
    { value: "30", label: "10:00-11:15" },
    { value: "40", label: "11:30-12:45" },
    { value: "50", label: "13:00-14:15" },
    { value: "60", label: "14:30-15:45" },
    { value: "70", label: "16:00-17:15" },
    { value: "80", label: "17:30-18:45" },
    { value: "90", label: "19:00-20:15" },
    { value: "100", label: "20:30-21:45" },
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
    
    if(nombre.trim() !== "" && capacidad.trim() !== "" && tipo.trim() !== "" && planta.trim() !== "" && dia.trim() !== "" && horas.length !== 0){
      cambiarAbrirDialogo(true);
    }else{
      cambiarAbrirDialogo(false);
    }
    
    const valorTipo= ambientes.find(opcion => opcion.value === tipo).label;
    const valorPlanta = plantas.find(opcion => opcion.value === planta).label;
    const valorDia = dias.find(opcion => opcion.value === dia).label;
    const valorHoras = horas.map(hora => horarios.find(opcion => opcion.value === hora).label);
    console.log(valorTipo, valorPlanta, valorDia, valorHoras);
    // if(abrirDialogo){
    //   axios.post('http://localhost:5000/ambientes', {
    //     nombre: nombre,
    //     capacidad: capacidad,
    //     tipo: valorTipo,
    //     planta: valorPlanta,
    //     ubicacion: ubicacion,
    //     servicios: servicios,
    //     dia: valorDia,
    //     horas: valorHoras
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  }

  const manejarCambioNombre = (event, pattern) => {
    const valor = event.target.value;
    if(pattern && RegExp(pattern).test(valor)){
      cambiarNombre(valor);
      cambiarMensajeError({ ...mensajeError, nombre: ""});
    }
  };
  const validarVacioNombre = () => {
    if(nombre.trim() === "" ){
      cambiarMensajeError(previo => ({ ...previo, nombre: "Ingrese nombre del ambiente"}));
    }
  }

  const manejarCambioCapacidad = (event, pattern) => {
    const valor = event.target.value;
    if(pattern && RegExp(pattern).test(valor)){
      cambiarCapacidad(valor);
      cambiarMensajeError({ ...mensajeError, capacidad: ""});
    }
  };
  const validarVacioCapacidad= () => {
    if(capacidad.trim() === "" ){
      cambiarMensajeError(previo =>({ ...previo, capacidad: "Ingrese la capacidad del ambiente"}));
    }
  };

  const validarSeleccionTipo = () => {
    if(tipo.trim() === ''){
      cambiarMensajeError(previo => ({ ...previo, tipo: "Seleccione el tipo de ambiente"}));
    }
  };

  const validarSeleccionPlanta = () => {
    if(planta.trim() === ''){
      cambiarMensajeError(previo => ({ ...previo, planta: "Seleccione la planta"}));
    }else{
      cambiarMensajeError(previo => ({ ...previo, planta: ""}));
    }
  };

  const validarSeleccionDia = () => {
    if(dia.trim() === ''){
      cambiarMensajeError(previo => ({ ...previo, dia: "Seleccione el día"}));
    }
  };

  const validarSeleccionHoras = () => {
    if(horas.length === 0){
      cambiarMensajeError(previo => ({ ...previo, horas: "Seleccione los periodos de hora"}));
    }else{
      cambiarMensajeError(previo => ({ ...previo, horas: ""}))    
    }
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
          <StyledText boldText>Ambiente</StyledText>

        </div>
        <RowPercentage firstChildPercentage={60} gap="10px">
          <div>
            <TextInput
              label="Nombre"
              fullWidth={true}
              onChange={(event) => manejarCambioNombre(event, "^[0-9(A-Z)+]*$")}
              onBlur={validarVacioNombre}
              isRequired={true}
              validationMessage={mensajeError.nombre}
              pattern="^[0-9(A-Z)+]{0,8}$"
            />
          </div>
          <div>
            <TextInput
              label="Capacidad"
              fullWidth={true}
              onChange={(event) => manejarCambioCapacidad(event, "^[0-9]*$", {min: 10, max: 300})}
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
          onChange={(event)=> cambiarUbicacion(event.target.value)}
        />
        <TextInput
          label="Servicios"
          pattern='^[A-Za-z0-9, ]{0,50}$'
          onChange={(event)=> cambiarServicios(event.target.value)}
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
          cerrarDialogo={() => {cambiarAbrirDialogo(false); window.location.reload();
          }}
          mensaje="Ambiente registrado con éxito"
        />
        <Button fullWidth={true} onClick={validarInfoOblig}>Guardar Cambios</Button>
      </div>
    </Card>
  );
};

export default AdminHomeModule2;
