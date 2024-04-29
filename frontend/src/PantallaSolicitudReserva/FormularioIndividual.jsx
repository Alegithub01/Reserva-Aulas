import { useState, useEffect } from "react";
import TextInput from "../Utils/TextInput";
import Dropdown from "../Utils/Dropdown";
import SelectorMultiple from '../Utils/SelectorMultiple';
import RowPercentage from "../Responsive/RowPercentage";
import MensajeExito from "../Utils/MensajeExito";
import EntradaFecha from "../Utils/EntradaFecha";
import Button from "../Utils/Button";
import CalendarioStore from "../Contexts/CalendarioStore";
import axios from 'axios';

const FormularioIndividual = ({ aulaInicial, horaInicial }) => {
  const { aula, dia, horario } = CalendarioStore();
  const [materia, setMateria] = useState('');
  const [nombreDocente, setNombreDocente] = useState('user'); //nombre del docente loggeado
  const [grupoDocente, setGrupoDocente] = useState(''); //grupo del docente loggeado
  const [capacidad, setCapacidad] = useState(0); //capacidad del aula
  const [ambiente, setAmbiente] = useState([]);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState([]);
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

  /*datos de prueba para los dropdowns */
  const cargarBDGruposIndividual = [
    { value: "1", label: "1", inscritos: 40 },
    { value: "2", label: "2", inscritos: 30},
    { value: "3", label: "3", inscritos: 25},
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

  const cambiarNombreDocente = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      setNombreDocente(valor);
      setMensajeError(previo => ({ ...previo, nombreDocente: '' }));
    }
  }

  const validarGrupoDocente = () => {
    if (grupoDocente.length === 0) {
      setMensajeError(previo => ({ ...previo, grupoDocente: 'Seleccione un grupo' }));
    } else {
      setMensajeError(previo => ({ ...previo, grupoDocente: '' }));

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

  const validarTodo = async () => {
    validarSeleccionMateria();
    validarGrupoDocente();
    validarFecha();
    validarSeleccionHora();
    if (materia !== '' && fecha !== '' && hora.length !== 0 && ambiente !== '' && grupoDocente !== '') {
      console.log("Solicitud enviada");
      
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/solicitudes', {
          nombre_usuario: nombreDocente,
          grupo: grupoDocente, 
          nombre_ambiente: ambiente,
          materia: materia, 
          horas: hora,
          servicios: serviciosSolicitados, 
          detalle: detalles,
          fecha: fecha,
        });
        console.log(response.data);
        cambiarAbrirDialogo(true);
      } catch (error) {
        console.error('Error al registrar ambiente:', error);
      }
  
      cambiarAbrirDialogo(true);
    } else {
      cambiarAbrirDialogo(false);
      console.log("Error en la solicitud");
    }
  }
  

  
  useEffect(() => {
    let capacidadTotal = 0;
    const lengthRecorrer = grupoDocente.length;
    for (let i = 0; i < lengthRecorrer; i++) {
      capacidadTotal += cargarBDGruposIndividual.filter(grupo => grupo.value === grupoDocente[i])[0].inscritos;
    }
    setCapacidad(capacidadTotal);
  },[grupoDocente]);
  return (
    <>
      <RowPercentage firstChildPercentage={35} gap="10px">
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
          <SelectorMultiple
            etiqueta="Grupo/grupos"
            opciones={cargarBDGruposIndividual}
            cambio={setGrupoDocente}
            llenado={validarGrupoDocente}
            esRequerido={true}
            mensajeValidacion={mensajeError.grupoDocente}
          />
        </div>
      </RowPercentage>
      <RowPercentage firstChildPercentage={25} gap="10px">
        <div>
          <TextInput
            label="Nombre del docente"
            fullWidth={true}
            value={nombreDocente}
            onChange={event => cambiarNombreDocente(event, "^[a-zA-Z ]*$")}
            pattern="^[a-zA-Z ]*$"
            isRequired={true}
            validationMessage={mensajeError.nombreDocente}
            isFocusedDefault={true}
            isDisabled={true}
          />
        </div>
      </RowPercentage>
      <RowPercentage firstChildPercentage={40} gap="10px">
        <div>
          <TextInput
            label="Capacidad"
            fullWidth={true}
            value={capacidad}
            onChange={() => { }}
            onBlur={() => { }}
            validationMessage={mensajeError.nroDocentes}
            pattern="^[0-9]{1,2}$"
            isRequired={true}
            rango={{ min: 1, max: 15 }}
            isFocusedDefault={true}
            isDisabled={true}
          />
        </div>
        <div>
          <SelectorMultiple
            etiqueta="Ambiente posible"
            opciones={cargarBDAmbiente}
            cambio={setAmbiente}
            llenado={validarSeleccionAmbiente}
            mensajeValidacion={mensajeError.ambiente}
            valorSeleccionado={ambiente}
            valorInicial={aulaInicial}
          />
        </div>
      </RowPercentage>
      <RowPercentage firstChildPercentage={50} gap="10px">
        <div>
          <EntradaFecha
            etiqueta="Fecha"
            enCambio={setFecha}
            onBlur={validarFecha}
            mensajeValidacion={fecha === "" ? mensajeError.fecha : ""}
            valorInicial={dia}
          />
        </div>
        <div>
          <SelectorMultiple
            etiqueta="Periodos de hora"
            opciones={horas}
            cambio={setHora}
            llenado={validarSeleccionHora}
            esRequerido={true}
            mensajeValidacion={mensajeError.hora}
            valorInicial={horaInicial}
          />
        </div>
      </RowPercentage>
      <TextInput
        label="Detalles de Solicitud"
        pattern='^[A-Za-z0-9, ]{0,50}$'
        onChange={(event) => setDetalles(event.target.value)}
      />
      <TextInput
        label="Servicios solicitados"
        pattern='^[A-Za-z0-9, ]{0,50}$'
        onChange={(event) => setServiciosSolicitados(event.target.value)}
      />
      <MensajeExito
        abrirDialogo={abrirDialogo}
        cerrarDialogo={() => {
          cambiarAbrirDialogo(false); window.location.reload();
        }}
        mensaje="Solicitud registrada con éxito"
      />
      <Button fullWidth={true} onClick={validarTodo}>Enviar Solicitud</Button></>);
}

export default FormularioIndividual;