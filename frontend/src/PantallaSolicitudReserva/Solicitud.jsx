import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import { useEffect, useState } from "react";
import TextInput from "../Utils/TextInput";
import Dropdown from "../Utils/Dropdown";
import SelectorMultiple from '../Utils/SelectorMultiple';
import RowPercentage from "../Responsive/RowPercentage";
import MensajeExito from "../Utils/MensajeExito";
import EntradaFecha from "../Utils/EntradaFecha";
import Button from "../Utils/Button";
import CalendarioStore from "../Contexts/CalendarioStore"

const SolicitudMultiple = () => {
  const { theme } = useTheme();
  const { aula, dia, horario } = CalendarioStore();
  const [materia, setMateria] = useState('');
  const [nroDocentes, setNroDocentes] = useState("1");
  const [nombreDocente, setNombreDocente] = useState('Tatiana Aparicio Yuja'); //nombre del docente loggeado
  const [grupoDocente, setGrupoDocente] = useState(''); //grupo del docente loggeado
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
    materia: '',
    ambiente: '',
    fecha: '',
    hora: '',
  });
  // useEffect para imprimir el valor de 'ambiente' cada vez que cambia
  useEffect(() => {
    // console.log("Ambiente seleccionado:", ambiente);
  }, [ambiente]);

  // useEffect para imprimir el valor de 'fecha' cada vez que cambia
  useEffect(() => {
    console.log("Fecha seleccionada:", fecha);
  }, [fecha]);

  // useEffect para imprimir el valor de 'hora' cada vez que cambia
  useEffect(() => {
    // console.log("Hora seleccionada:", hora);
  }, [hora]);

  useEffect(() => {
    console.log("MIdia:", dia);
  }, [dia]);
  
  /*datos de prueba para los dropdowns */
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

  const cambiarGrupoDocente = (event, pattern) => {
    const valor = event.target.value;
    if (pattern && RegExp(pattern).test(valor)) {
      setGrupoDocente(valor);
      setMensajeError(previo => ({ ...previo, grupoDocente: '' }));
    }
  }
  const validarGrupoDocente = () => {
    if (grupoDocente.trim() === '') {
      setMensajeError(previo => ({ ...previo, grupoDocente: "Ingrese grupo" }));
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
    validarVacioNroDocentes();
    validarGrupoDocente();
    validarSeleccionAmbiente();
    validarFecha();
    validarSeleccionHora();
    docentes.forEach((docente, index) => {
      validarNombresDocentes(index);
      validarGruposDocentes(index);
    });
    if (materia !== '' && fecha !== '' && hora.length !== 0 && ambiente !== '' && nroDocentes.trim() !== '' && docentes.every(docente => docente.nombre.trim() !== '' && docente.grupo.trim() !== '')) {
      console.log("Solicitud enviada");
      cambiarAbrirDialogo(true);
    } else {
      cambiarAbrirDialogo(false);
      console.log("Error en la solicitud");
    }
  }

  useEffect(() => {
    const initialDocentes = [];  
    // initialDocentes.push({nombre: "Nombreauto completado", grupo:"", errorNombre:false, errorGrupo: true}); //aca se pasara info del docente loggeado
    for (let i = 0; i < nroDocentes-1; i++) {
      initialDocentes.push({ nombre: "", grupo: "", errorNombre: true, errorGrupo: true });
    }
    setDocentes(initialDocentes);
  }, [nroDocentes]);

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
                <TextInput
                  label="Nro docentes"
                  fullWidth={true}
                  value={nroDocentes}
                  onChange={(event) => manejarCambioNroDocentes(event, "^[0-9]{0,2}$", { min: 1, max: 15 })}
                  onBlur={validarVacioNroDocentes}
                  validationMessage={mensajeError.nroDocentes}
                  pattern="^[0-9]{1,2}$"
                  isRequired={true}
                  rango={{ min: 1, max: 15 }}
                  isFocusedDefault={true}
                />
              </div>
            </RowPercentage>
            <RowPercentage firstChildPercentage={25} gap="10px">
                <div>
                  <TextInput
                    label="Nombre del docente"
                    fullWidth={true}
                    value={nombreDocente}
                    onChange={event => cambiarNombreDocente( event, "^[a-zA-Z ]*$")}
                    pattern="^[a-zA-Z ]*$"
                    isRequired={true}
                    validationMessage={mensajeError.nombreDocente}
                    isFocusedDefault={true}
                    isDisabled={true}
                  />
                </div>
                <div>
                  <TextInput
                    label="Grupo"
                    fullWidth={true}
                    value={grupoDocente}
                    onChange={(event) => cambiarGrupoDocente( event, "^[0-9]{0,2}$")}
                    onBlur={validarGrupoDocente}
                    validationMessage={mensajeError.grupoDocente}
                    pattern="^[0-9]{0,2}$"
                    isRequired={true}
                  />
                </div>
              </RowPercentage>
            {docentes.map((docente, index) => (
              <RowPercentage key={index} firstChildPercentage={25} gap="10px">
                <div>
                  <TextInput
                    label="Nombre del docente"
                    fullWidth={true}
                    value={docente.nombre}
                    onChange={event => manejarCambioNombre(index, event, "^[a-zA-Z ]*$")}
                    onBlur={() => validarNombresDocentes(index)}
                    pattern="^[a-zA-Z ]*$"
                    isRequired={true}
                    validationMessage={docente.errorNombre ? "Ingrese nombre de docente" : ""}
                  />
                </div>
                <div>
                  <TextInput
                    label="Grupo"
                    fullWidth={true}
                    value={docente.grupo}
                    onChange={(event) => manejarCambioGrupo(index, event, "^[0-9]{0,2}$")}
                    onBlur={() => validarGruposDocentes(index)}
                    validationMessage={docente.errorGrupo ? "Ingrese grupo" : ""}
                    pattern="^[0-9]{0,2}$"
                    isRequired={true}
                  />
                </div>
              </RowPercentage>
            ))}
            <RowPercentage firstChildPercentage={40} gap="10px">
              <div>
                <SelectorMultiple
                  etiqueta="Ambiente"
                  opciones={cargarBDAmbiente}
                  cambio={setAmbiente}
                  llenado={validarSeleccionAmbiente}
                  esRequerido={true}
                  mensajeValidacion={mensajeError.ambiente}
                  valorSeleccionado={ambiente}
                  valorInicial={[aula]}
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
            <Button fullWidth={true} onClick={validarTodo}>Enviar Solicitud</Button>
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

export default SolicitudMultiple;
