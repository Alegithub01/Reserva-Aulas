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
import { URL_API } from "../services/const";

const FormularioIndividual = ({ aulaInicial, horaInicial }) => {
  const { aula, dia, horario } = CalendarioStore();
  const [nroPeriodosAul, setNroPeriodosAul] = useState(0);
  const [nroPeriodosAud, setNroPeriodosAud] = useState(0);
  const [nroPeriodosLab, setNroPeriodosLab] = useState(0);
  const [materia, setMateria] = useState('');
  const nombre = localStorage.getItem('nombre');
  const [nombreDocente, setNombreDocente] = useState(nombre); //nombre del docente loggeado
  const [grupoDocente, setGrupoDocente] = useState(''); //grupo del docente loggeado
  const [capacidad, setCapacidad] = useState(0); //capacidad del aula
  const [ambiente, setAmbiente] = useState('');
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
  const [docenteId, setDocenteId] = useState(null);
  /*datos de prueba para los dropdowns */

  const motivos = [
    { value: "Examen parcial", label: "Examen parcial" },
    { value: "Examen final", label: "Examen final" },
    { value: "Examen de mesa", label: "Examen de mesa" },
    { value: "Práctica", label: "Práctica" },
    { value: "Reemplazo ambiente", label: "Reemplazo ambiente" },
    { value: "Taller", label: "Taller" },
    { value: "Otro", label: "Otro" },
  ]

  /*
  const cargarBDMateria = [
    { value: 1, label: "Progr. Funcional" },
    { value: 2, label: "Base de datos 2" },
    { value: 3, label: "Taller de Base de Datos" },
  ];   //convertir info de materias en este diccionario (solo nombres de materias no importa el valor)
  */

  const [cargarBDMateria, setCargarBDMateria] = useState([]);
  const [cargarBDGruposIndividual, setCargarBDGruposIndividual] = useState([]);

  const cargarBDAmbiente = [
    { value: "Aula", label: "Aula", },
    { value: "Auditorio", label: "Auditorio", },
    { value: "Laboratorio", label: "Laboratorio", },
  ];
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
    }else {
      setMensajeError(previo => ({ ...previo, materia: '' }));
    }
  }

  const validarFecha = () => {
    if (fecha === null || fecha === '') {
      setMensajeError(previo => ({ ...previo, fecha: 'Seleccione una fecha' }));
    } else{
      setMensajeError(previo => ({ ...previo, fecha: '' }));
    }
  }

  const validarSeleccionHora = () => {
    setMensajeError(previo => ({ ...previo, hora: '' }));
    if (hora.length === 0) {
      setMensajeError(previo => ({ ...previo, hora: 'Seleccione una hora' }));
    } else {
      const horaOrdenada = hora.sort();
      let contador = 1;
      for (let i = 1; i < horaOrdenada.length; i++) {
        const before = parseInt(horaOrdenada[i - 1]);
        const current = parseInt(horaOrdenada[i]);
        if (before !== current - 10) {
          setMensajeError(previo => ({ ...previo, hora: 'Seleccione periodos de hora consecutivos' }));
          break;
        } else {
          setMensajeError(previo => ({ ...previo, hora: '' }));
          contador++;
        }
      }
      const nroPeriodosA = ambiente === "Aula" ? nroPeriodosAul : ambiente === "Laboratorio" ? nroPeriodosLab: nroPeriodosAud;
      if (contador > parseInt(nroPeriodosA)) {
        setMensajeError(previo => ({ ...previo, hora: `Seleccione menos periodos de hora, este ambiente no lo permite` }));
      }
    }
  }

  const validarSeleccionDetalles = () => {
    if (detalles === '') {
      setMensajeError(previo => ({ ...previo, detalles: 'Seleccione un motivo' }));
    } else {
      setMensajeError(previo => ({ ...previo, detalles: '' }));
    }
  }

  const obtenerLabelsHora = (valores) => {
    return valores.map(valor => {
      const horaEncontrada = horas.find(hora => hora.value === valor);
      return horaEncontrada ? horaEncontrada.label : valor;
    });
  };

  const validarTodo = async () => {
    validarSeleccionMateria();
    validarGrupoDocente();
    validarFecha();
    validarSeleccionHora();
    validarSeleccionDetalles();
    if (materia !== '' && fecha !== '' && hora.length !== 0 && detalles !== '' && grupoDocente !== ''
      && mensajeError.materia === '' && mensajeError.grupoDocente === '' && mensajeError.fecha === '' && mensajeError.hora === '' && mensajeError.detalles === ''
    ) {
      console.log("Solicitud enviada");
      try {
        const horasLabels = obtenerLabelsHora(hora);
        const response = await axios.post(`${URL_API}/solicitudes`, {
          nombre_usuario: nombreDocente,
          grupo: grupoDocente,
          tipo_ambiente: ambiente,
          materia: materia,
          horas: horasLabels,
          servicios: serviciosSolicitados,
          detalle: detalles,
          fecha: fecha,
          capacidad: capacidad,
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
  };

  const obtenerMateriasDesdeBackend = async (docenteId) => {
    try {
      const response = await axios.get(`${URL_API}/docentes/${docenteId}/materias`);
      const materiasFormateadas = response.data.materias.map(materia => ({
        value: materia,
        label: materia
      }));
      setCargarBDMateria(materiasFormateadas);
    } catch (error) {
      console.error('Error al obtener las materias desde el backend:', error);
    }
  };

  const obtenerGrupoEInscritosPorIdDocenteYMateria = async (docenteId, materia) => {
    try {
      const response = await axios.get(`${URL_API}/docentes/${docenteId}/materias/${materia}/grupos-inscritos`);
      const gruposEInscritos = response.data.resultados.map(resultado => ({
        value: resultado.grupo,
        label: resultado.grupo,
        inscritos: resultado.inscritos
      }));
      setCargarBDGruposIndividual(gruposEInscritos);
    } catch (error) {
      console.error('Error al obtener los grupos e inscritos desde el backend:', error);
    }
  };

  const obtenerDocenteId = async (nombreDocente) => {
    try {
      if (docenteId === null) {
        const response = await axios.get(`${URL_API}/users/${nombreDocente}/id`);
        setDocenteId(response.data.id); 
        return response.data.id;
      } else {
        return docenteId; 
      }
    } catch (error) {
      console.error('Error al obtener el ID del docente desde el backend:', error);
      return null; 
    }
  };

  const obtenerMaterias = async () => {
    const nombre =  nombreDocente.split(' ');
    const docenteId = await obtenerDocenteId(nombre.slice(0,-2).join(' '));
    console.log(docenteId)
    if (docenteId) {
      obtenerMateriasDesdeBackend(docenteId);
    } else {
      console.log('No se pudo obtener el ID del docente');
    }
  };

  useEffect(() => {
    const obtenerData = async () => {
    try{
      const response = await axios.get(`${URL_API}/admin/settings`);
      setNroPeriodosAul(response.data.setting.nroMaxPeriodAula);
      setNroPeriodosAud(response.data.setting.nroMaxPeriodAuditorio);
      setNroPeriodosLab(response.data.setting.nroMaxPeriodLaboratorio);
    }catch (error) {
      console.log(error);
    }}
    obtenerData();
  },[]);

  useEffect(() => {
    obtenerMaterias();

    let capacidadTotal = 0;
    const lengthRecorrer = grupoDocente.length;
    for (let i = 0; i < lengthRecorrer; i++) {
      capacidadTotal += cargarBDGruposIndividual.filter(grupo => grupo.value === grupoDocente[i])[0].inscritos;
    }
    setCapacidad(capacidadTotal);
  }, [grupoDocente]);
  return (
    <>
      <RowPercentage firstChildPercentage={35} gap="10px">
        <div>
          <Dropdown
            etiqueta="Materia"
            opciones={cargarBDMateria}
            cambio={(materia) => {
              setMateria(materia);
              obtenerDocenteId(nombreDocente).then((docenteId) => {
                if (docenteId) {
                  obtenerGrupoEInscritosPorIdDocenteYMateria(docenteId, materia);
                } else {
                  console.log('No se pudo obtener el ID del docente');
                }
              });
            }}
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
          <Dropdown
            etiqueta="Tipo de Ambiente"
            opciones={cargarBDAmbiente}
            cambio={setAmbiente}
            onBlur={() => { }}
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

export default FormularioIndividual;