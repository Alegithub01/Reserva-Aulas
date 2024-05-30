import { useEffect, useState } from "react";
import TextInput from "../Utils/TextInput";
import Dropdown from "../Utils/Dropdown";
import SelectorMultiple from '../Utils/SelectorMultiple';
import RowPercentage from "../Responsive/RowPercentage";
import MensajeExito from "../Utils/MensajeExito";
import EntradaFecha from "../Utils/EntradaFecha";
import Button from "../Utils/Button";
import CalendarioStore from "../Contexts/CalendarioStore"
import axios from "axios";
import { URL_API } from "../services/const";

const FormularioGrupal = ({ aulaInicial, horaInicial }) => {
  const { aula, dia, horario } = CalendarioStore();
  const [nroPeriodosAul, setNroPeriodosAul] = useState(0);
  const [nroPeriodosAud, setNroPeriodosAud] = useState(0);
  const [nroPeriodosLab, setNroPeriodosLab] = useState(0);
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
    detalles: '',
  });

  const [docenteId, setDocenteId] = useState(null);
  const [cargarBDMateria, setCargarBDMateria] = useState([]);

  const motivos = [
    { value: "Examen final", label: "Examen final" },
    { value: "Examen parcial", label: "Examen parcial" },
    { value: "Examen de mesa", label: "Examen de mesa" },
    { value: "Práctica", label: "Práctica" },
    { value: "Reemplazo ambiente", label: "Reemplazo ambiente" },
    { value: "Taller", label: "Taller" },
    { value: "Otro", label: "Otro" },
  ];

  const [cargarBDGruposGrupal, setCargarBDGruposGrupal] = useState([]);

  const [cargarBDDocentes, setCargarBDDocentes] = useState([]);

  const cargarBDAmbiente = [
    { value: "Aula", label: "Aula", },
    { value: "Auditorio", label: "Auditorio", },
    { value: "Laboratorio", label: "Laboratorio", },
  ];   
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
    } else {
      setMensajeError(previo => ({ ...previo, materia: '' }));
    }
  }

  const validarFecha = () => {
    if (fecha === null || fecha === '') {
      setMensajeError(previo => ({ ...previo, fecha: 'Seleccione una fecha' }));
    } else {
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
      const nroPeriodosA = ambiente === "Aula" ? nroPeriodosAul : ambiente === "Laboratorio" ? nroPeriodosLab : nroPeriodosAud;
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
  };

  const validarTodo = () => {
    validarSeleccionMateria();
    validarGruposDocentes();
    validarFecha();
    validarSeleccionHora();
    validarSeleccionDetalles();
    console.log(mensajeError.hora, mensajeError.fecha, mensajeError.materia, mensajeError.detalles)
    if (materia !== '' && fecha !== '' && hora.length !== 0 && detalles !== ''
      && mensajeError.fecha === '' && mensajeError.hora === '' && mensajeError.materia === '' && mensajeError.detalles === '') {
      console.log("Solicitud enviada");
      const horasEtiqueta = hora.map(hora => horas.filter(hora1 => hora1.value === hora)[0].label);
      const motivoEtiqueta =  motivos.filter(motivo => motivo.value === detalles)[0].label;
      console.log(docentes);
      try {
        const response = axios.post(`${URL_API}/solicitudes-grupales`, {
          "users_id": docentes.map(docente => docente.id_docente),
          "grupos": gruposDocentes,
          "tipo_ambiente": ambiente,
          "materia": materia,
          "horas": horasEtiqueta,
          "servicios": serviciosSolicitados,
          "detalle": motivoEtiqueta,
          "fecha": fecha,
          "estado": "Pendiente",
          "capacidad": capacidad
        });
        console.log(response.data);
        cambiarAbrirDialogo(true);
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
      
    } else {
      cambiarAbrirDialogo(false);
      console.log("Error en la solicitud");
    }
  }

  const obtenerMaterias = async () => {
    const nombreDocente = localStorage.getItem("nombre");
    const nombre =  nombreDocente.split(' ');
    const docenteId = await obtenerDocenteId(nombre.slice(0,-2).join(' '));
    if (docenteId) {
      obtenerMateriasDesdeBackend(docenteId);
    } else {
      console.log('No se pudo obtener el ID del docente');
    }
  }
  const obtenerDocenteId = async (nombreDocente) => {
    try {
      if (docenteId === null) {
        const response = await axios.get(`${URL_API}/users/${nombreDocente}/id`);
        return response.data.id;
      } else {
        return docenteId;
      }
    } catch (error) {
      console.error('Error al obtener el ID del docente desde el backend:', error);
      return null;
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
  }

  const obtenerGruposDocentes = async (materia) => {
    try {
      console.log("holiu3", materia);
      let nombreMateria = materia.replace(/\s+/g, '-');
      // sconst pruebita = encodeURIComponent(nombreMateria);
      console.log("holiuuuuuu3", nombreMateria);
      const response = await axios.get(`${URL_API}/materia-docente/grupos/${nombreMateria}`);
      console.log("holiu4", response.data);
      const gruposFormateados = response.data.map(grupo => ({
        value: grupo,
        label: grupo
      }));
      console.log(gruposFormateados);
      setCargarBDGruposGrupal(gruposFormateados);
      await obtenerDocentesYGrupos(materia);
    } catch (error) {
      console.error('Error al obtener los grupos docentes desde el backend:', error);
    }
  }

  const obtenerDocentesYGrupos = async (materia) => {
    try {
      const response = await axios.get(`${URL_API}/materia-docente/info/${materia}`);
      const docentesFormateados = response.data.map(resultado => ({
        nombre: resultado.nombre_docente,
        grupo: resultado.grupo,
        inscritos: resultado.inscritos,
        docente_id: resultado.docente_id
      }));
      console.log(docentesFormateados);
      setCargarBDDocentes(docentesFormateados);
    } catch (error) {
      console.error('Error al obtener los docentes desde el backend:', error);
    }

  }

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
    const lengthToFill = gruposDocentes.length;
    let capacidadTotal = 0;
    const corresponder = (grupo) => {
      return cargarBDDocentes.filter(docente => docente.grupo === grupo)[0].nombre;
    }
    const initialDocentes = [];
    for (let i = 0; i < lengthToFill; i++) {
      capacidadTotal = capacidadTotal + cargarBDDocentes.filter(docente => docente.grupo === gruposDocentes[i])[0].inscritos;
      const nuevoNombre = corresponder(gruposDocentes[i]);
      if (initialDocentes.some(docente => docente.nombre === nuevoNombre)) {
        initialDocentes.map(docente => docente.nombre === nuevoNombre ? docente.grupo += `, ${gruposDocentes[i]}` : docente);
      } else {
        initialDocentes.push({ nombre: corresponder(gruposDocentes[i]), grupo: gruposDocentes[i], id_docente: cargarBDDocentes.filter(docente => docente.grupo === gruposDocentes[i])[0].docente_id});
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
          cambio={(materia1) => {
            setMateria(materia1);
            //setGruposDocentes([]);
            console.log("holiu", materia1);
            //if(materia !== ''){
            console.log("holiu2", materia1);
            obtenerGruposDocentes(materia1);
            //}
          }}
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
              onChange={() => { }}
              onBlur={() => { }}
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
              onChange={() => { }}
              onBlur={() => { }}
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

export default FormularioGrupal;