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
  //convertir info de docentes en este diccionario (importa el id creo)

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


  const validarGruposDocentes = () => {
    if (gruposDocentes.length === 0) {
      setMensajeError(previo => ({ ...previo, grupoDocente: 'Seleccione grupos' }));
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

  const validarTodo = () => {
    validarSeleccionMateria();
    validarGruposDocentes();
    validarFecha();
    validarSeleccionHora();
    if (materia !== '' && fecha !== '' && hora.length !== 0 && ambiente !== '') {
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
        initialDocentes.push({ nombre: corresponder(gruposDocentes[i]), grupo: gruposDocentes[i] });
      }

    }
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

export default FormularioGrupal;