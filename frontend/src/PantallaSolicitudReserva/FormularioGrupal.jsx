import { useEffect, useState } from "react";
import TextInput from "../Utils/TextInput";
import Dropdown from "../Utils/Dropdown";
import SelectorMultiple from '../Utils/SelectorMultiple';
import RowPercentage from "../Responsive/RowPercentage";
import MensajeExito from "../Utils/MensajeExito";
import EntradaFecha from "../Utils/EntradaFecha";
import Button from "../Utils/Button";
import CalendarioStore from "../Contexts/CalendarioStore"

const FormularioGrupal = ({aulaInicial, horaInicial}) => {
  const { aula, dia, horario } = CalendarioStore();
  const [materia, setMateria] = useState('');
  const [gruposDocentes, setGruposDocentes] = useState([]); // modo grupal
  const [docentes, setDocentes] = useState([]);
  const [capacidad, setCapacidad] = useState(0);
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

  /*datos de prueba para los dropdowns */
  const cargarBDMateria = [
    { value: 1, label: "Progr. Funcional" },
    { value: 2, label: "Base de datos 2" },
    { value: 3, label: "Taller de Base de Datos" },
  ];

  const motivos = [
    { value: "Examen final", label: "Examen final" },
    { value: "Examen parcial", label: "Examen parcial" },
    { value: "Examen de mesa", label: "Examen de mesa" },
    { value: "Práctica", label: "Práctica" },
    { value: "Reemplazo ambiente", label: "Reemplazo ambiente" },
    { value: "Taller", label: "Taller" },
    { value: "Otro", label: "Otro" },
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
    { id: "1", nombre: "Leticia Coca", inscritos: 60 },
    { id: "2", nombre: "Corina Flores", inscritos: 60},
    { id: "3", nombre: "Vladimir Costas", inscritos: 50},
    { id: "4", nombre: "Patricia Romero", inscritos: 50},
    { id: "5", nombre: "Carla Salazar", inscritos: 50},
    { id: "6", nombre: "Henry Villaroel", inscritos: 30 },
    { id: "7", nombre: "Leticia Coca", inscritos: 40},
    { id: "8", nombre: "Vladimir Costas", inscritos: 40},
    { id: "9", nombre: "Leticia Coca", inscritos: 40},
  ];
  //convertir info de docentes en este diccionario (importa el id creo)

  const cargarBDAmbiente = [
    { value: "Aula", label: "Aula", },
    { value: "Auditorio", label: "Auditorio", },
    { value: "Laboratorio", label: "Laboratorio", },
  ];   //convertir info de ambientes en este diccionario (solo nombres de ambientes)
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
    { value: "100", label: "20:15-21:45" },
  ];


  const validarGruposDocentes = () => {
    if (gruposDocentes.length === 0) {
      setMensajeError(previo => ({ ...previo, gruposDocentes: 'Seleccione grupos' }));
    } else {
      setMensajeError(previo => ({ ...previo, gruposDocentes: '' }));

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

  const validarSeleccionDetalles = () => {
    if (detalles === '') {
      setMensajeError(previo => ({ ...previo, detalles: 'Seleccione un motivo' }));
    } else {
      setMensajeError(previo => ({ ...previo, detalles: '' }));
    }
  };
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
    validarGruposDocentes();
    validarFecha();
    validarSeleccionHora();
    validarSeleccionDetalles();
    if (materia !== '' && fecha !== '' && hora.length !== 0 && detalles !== '') {
      console.log("Solicitud enviada");
      cambiarAbrirDialogo(true);
    } else {
      cambiarAbrirDialogo(false);
      console.log("Error en la solicitud");
    }
  }

  useEffect(() => {
    const lengthToFill = gruposDocentes.length;
    let capacidadTotal = 0;
    const corresponder = (grupo) => {
      return cargarBDDocentes.filter(docente => docente.id === grupo)[0].nombre;
    }
    const initialDocentes = [];
    for (let i = 0; i < lengthToFill; i++) {
      capacidadTotal = capacidadTotal+ cargarBDDocentes.filter(docente => docente.id === gruposDocentes[i])[0].inscritos;
      const nuevoNombre = corresponder(gruposDocentes[i]);
      if (initialDocentes.some(docente => docente.nombre === nuevoNombre)) {
        initialDocentes.map(docente => docente.nombre === nuevoNombre ? docente.grupo += `, ${gruposDocentes[i]}` : docente);
      } else {
        initialDocentes.push({ nombre: corresponder(gruposDocentes[i]), grupo: gruposDocentes[i] });
      }
    }
    setCapacidad(capacidadTotal);
    setDocentes(initialDocentes);
  }, [gruposDocentes]);

  return (<>
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
          etiqueta="Grupos"
          opciones={cargarBDGruposGrupal}
          cambio={setGruposDocentes}
          llenado={validarGruposDocentes}
          esRequerido={true}
          mensajeValidacion={mensajeError.gruposDocentes} />
      </div>
    </RowPercentage>
    {
      docentes.map((docente, index) => (
        <RowPercentage key={index} firstChildPercentage={25} gap="10px">
          <div>
            <TextInput
              label="Nombre del docente"
              fullWidth={true}
              value={docente.nombre}
              onChange={() => {}}
              onBlur={() => {}}
              isRequired={true}
              validationMessage=""
              isFocusedDefault={true}
              isDisabled={true}
            />
          </div>
          <div>
            <TextInput
              label="Grupo"
              fullWidth={true}
              value={docente.grupo}
              onChange={() =>{}}
              onBlur={() => {}}
              validationMessage=""
              isRequired={true}
              isFocusedDefault={true}
              isDisabled={true}
            />
          </div>
        </RowPercentage>
      ))
    }
    <RowPercentage firstChildPercentage={40} gap="10px">
      <div>
        <TextInput
          label="Capacidad"
          fullWidth={true}
          value={capacidad}
          onChange={() => {}}
          onBlur={()=>{}}
          validationMessage={mensajeError.nroDocentes}
          pattern="^[0-9]{1,2}$"
          isRequired={true}
          rango={{ min: 1, max: 15 }}
          isFocusedDefault={true}
          isDisabled={true}
        />
      </div>
      <div>
        <Dropdown
          etiqueta="Tipo de Ambiente"
          opciones={cargarBDAmbiente}
          cambio={setAmbiente}
          onBlur={()=>{}}
          mensajeValidacion=""
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
    <Dropdown
      etiqueta="Motivo de Solicitud"
      opciones={motivos}
      cambio={setDetalles}
      onBlur={validarSeleccionDetalles}
      esRequerido={true}
      mensajeValidacion={mensajeError.detalles}
    />
    <TextInput
      label="Servicios solicitados"
      pattern='^.{0,50}$'
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

export default FormularioGrupal;