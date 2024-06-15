import { useState, useEffect } from "react";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import RowPercentage from "../Responsive/RowPercentage";
import aula from '../assets/imgs/aula.jpg';
import auditorio from '../assets/imgs/auditorio.jpg';
import laboratorio from '../assets/imgs/laboratorio.jpg';

import { useNavigate } from 'react-router-dom';
import TextInput from "../Utils/TextInput";
import SearchIcon from '@mui/icons-material/Search';
import { DialogTitle, IconButton, TextField } from "@mui/material";
import Button1 from "../Utils/Button";
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useLocation } from 'react-router-dom';
import useAmbienteStore from "../Contexts/AmbienteStore";
import Button from '@mui/material/Button';
import useNavegacionStore from "../Contexts/NavegacionStore";
import axios from "axios";
import { URL_API } from "../services/const";
import SelectorChip from "../Utils/SelectorChip";
import ParaCorreo from "../Components/ParaCorreo";

const SolicitudAdmin = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { dataRow } = location.state || {};
  console.log("DataRow:", dataRow);
  const [nombreDocente, setNombreDocente] = useState(''); //nombre del docente loggeado
  const [usersNombresGrupo, setUsersNombresGrupo] = useState([]);
  const [tipo, setTipo] = useState(dataRow.tipo_ambiente || "aula");
  const [sugerido, setSugerido] = useState({
    aceptar: false,
    rechazar: false,
    cancelar: false,
  });
  const nClick = useNavegacionStore((state) => state).nClick;
  const { setClicks } = useNavegacionStore();
  const ambientesSeleccionados = useAmbienteStore(state => state.ambientesSeleccionados);
  const setAmbientesSeleccionados = useAmbienteStore(state => state.setAmbientesSeleccionados);
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState(
    " " + ambientesSeleccionados.map(amb => amb.nombre).join(', ')
  );
  const [dialogoAbierto, setDialogoAbierto] = useState({
    aceptar: false,
    rechazar: false,
  });

  const dateFinal = new Date(dataRow.fecha).toISOString().split('T')[0];
  console.log("Fecha final:", dateFinal);
  const [razones, setRazones] = useState([]);
  const [especificaciones, setEspecificaciones] = useState('');
  const [mensajeError, setMensajeError] = useState({
    razones: '',
    especificaciones: '',
  });
  const [mostrarPasoCorreo, setMostrarPasoCorreo] = useState(false);
  const [seAceptoSolicitud, setSeAceptoSolicitud] = useState(false);
  const [mensajeCorreo, setMensajeCorreo] = useState('');
  const [tipoCorreo, setTipoCorreo] = useState('')

  useEffect(() => {
    setAmbienteSeleccionado(ambientesSeleccionados.map(amb => amb.nombre).join(', '));
    console.log("Ambientes recibidos:", ambientesSeleccionados);
    setAmbientesSeleccionados([]);
    if (ambienteSeleccionado.trim() === "") {
      setSugerido({ aceptar: false, rechazar: nClick !== 0, cancelar: nClick === 0 });
    } else {
      setSugerido({ aceptar: true, rechazar: false, cancelar: nClick === 0 });
    }
    console.log("Ambientes seleccionados:", ambientesSeleccionados);

    const fetchAll = async () => {
      console.log(dataRow.tipoDado);
      if (dataRow.tipoDado === "individual") {
        try {
          const response = await axios.get(`${URL_API}/users/${dataRow.user_id}/nombre`);
          setNombreDocente(response.data.nombre);
        } catch (error) {
          console.error("Error al obtener el nombre del docente:", error);
        }
      }
      if (dataRow.tipoDado === "grupal") {
        const users = JSON.parse(dataRow.users_id);

        try {
          const userPromises = users.map(user =>
            axios.get(`${URL_API}/users/${user}/nombre`)
          );
          const userResponses = await Promise.all(userPromises);
          const userNames = userResponses.map(response => ({ nombre: response.data.nombre }));
          setUsersNombresGrupo(userNames);

        } catch (error) {
          console.error("Error al obtener los nombres de los usuarios:", error);
        }
      }
    };

    fetchAll();
  }, []);

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
      minHeight: '600px',
    },
    infoCompleta: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    titles: {
      color: theme.text,
      fontWeight: 'bold',
      marginRight: '15px',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    imagee: {
      width: '280px',
      height: '180px',
      clipPath: 'inset(0% 0% 0% 0% round 5%)',
      objectFit: 'cover',
    },
    textSubtitle: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '50%',
    },
    botonConfirmar: {
      padding: '0.6em 3em',
      fontSize: '16px',
      letterSpacing: '1px',
      color: 'rgb(255, 255, 255)',
      backgroundColor: sugerido.aceptar ? theme.green : theme.disabled,
      border: 'none',
      borderRadius: '15px',
      transition: 'all 0.3s ease 0s',
      cursor: 'pointer',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 15px',
    },
    botonRechazar: {
      padding: '0.6em 3em',
      fontSize: '16px',
      letterSpacing: '1px',
      color: 'rgb(255, 255, 255)',
      backgroundColor: sugerido.rechazar ? theme.red : theme.disabled,
      border: 'none',
      borderRadius: '15px',
      transition: 'all 0.3s ease 0s',
      cursor: 'pointer',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 15px',
    },
    botonCancelar: {
      padding: '0.6em 3em',
      fontSize: '16px',
      letterSpacing: '1px',
      color: 'rgb(255, 255, 255)',
      backgroundColor: sugerido.cancelar ? theme.highlight : theme.disabled,
      border: 'none',
      borderRadius: '15px',
      transition: 'all 0.3s ease 0s',
      cursor: 'pointer',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 15px',
    },
  };

  const navegarPreload = () => {
    setClicks(nClick + 1);
    const dataToSend = {
      seleccion: true,
      fecha: dateFinal,
      capacidad: dataRow.capacidad,
      horario: dataRow.horas,
      servicios: dataRow.servicios,
      tipoAmbiente: dataRow.tipo_ambiente
    };

    navigate('/Buscar-Ambiente', { state: dataToSend });
  };
  const manejoConfirmarAceptar = () => {
    console.log("se confirma");
    setDialogoAbierto({ ...dialogoAbierto, aceptar: false });
    const ambientesFormato = ambienteSeleccionado.split(', ');
    try{
      if(dataRow.tipoDado === "individual"){
        if(ambientesFormato.length > 1){
        axios.post(`${URL_API}/asignarIndividual`, {
          id: dataRow.id,
          aulas: ambientesFormato,
        });}
        else{
          axios.post(`${URL_API}/aceptar/${dataRow.id}`, {
            id: dataRow.id,
            aulas: ambientesFormato,
          });
        }
      }else{
        if(ambientesFormato.length > 1){
        axios.post(`${URL_API}/asignarGrupal`, {
          id: dataRow.id,
          aulas: ambientesFormato,
        });
        }else {
          axios.post(`${URL_API}/aceptarGrupal/${dataRow.id}`, {
            id: dataRow.id,
            aulas: ambientesFormato,
          });
        }
      }
      setSeAceptoSolicitud(true);
      setMostrarPasoCorreo(true);
      if(ambientesFormato.length > 1){
        setTipoCorreo('oferta');
        setMensajeCorreo(`Se le informa que su solicitud ha sido aceptada. Los ambientes asignados son: ${ambientesFormato.join(', ')}, por favor indique si acepta o no esta oferta de ambientes.\n\nLos horarios elegidos son: ${dataRow.horas.join(', ')}. con fecha ${dateFinal} para la materia ${dataRow.materia} con capacidad de ${dataRow.capacidad} estudiantes.\n\nServicios solicitados: ${dataRow.servicios}.`);
      }else{
        setTipoCorreo('confirmacionDirecta');
        setMensajeCorreo(`Se le informa que su solicitud ha sido aceptada. El ambiente asignado es: ${ambientesFormato.join(', ')}.\n\nLos horarios elegidos son: ${dataRow.horas.join(', ')}, con fecha ${dateFinal} para la materia ${dataRow.materia} con capacidad de ${dataRow.capacidad} estudiantes.\n\nServicios solicitados: ${dataRow.servicios}.`);
      }
    }catch(error){
      console.error("Error al aceptar la solicitud:", error);
    }
    //navigate('/Solicitudes');
  }

  const manejoCancelarAceptar = () => {
    setDialogoAbierto({ ...dialogoAbierto, aceptar: false })
  }

  const manejoConfirmarRechazar = () => {
    console.log("se rechaza");
    console.log("Razones:", razones);
    console.log("Especificaciones:", especificaciones);
    
    validarRazones();
    if(mensajeError.razones === ''){
      setDialogoAbierto({ ...dialogoAbierto, rechazar: false });
      //backend acaa
      try{
        if(dataRow.tipoDado === "individual"){
          axios.post(`${URL_API}/rechazarIndividual/${dataRow.id}`);
        }else{
          axios.post(`${URL_API}/rechazarGrupal/${dataRow.id}`);
        }
      }catch(error){
        console.error("Error al rechazar la solicitud:", error);
      }
      setMostrarPasoCorreo(true);
      setTipoCorreo('rechazo');
      setMensajeCorreo(`Se le informa que su solicitud ha sido rechazada por las siguientes razones: \n\n${razones}\n\n. ${especificaciones}`)
    }else{
      console.log("Error en razones:", mensajeError.razones);
      setDialogoAbierto({ ...dialogoAbierto, rechazar: true });
    }
  }

  const manejoCancelarRechazar = () => {
    setDialogoAbierto({ ...dialogoAbierto, rechazar: false })
  }

  const navegarBuscar = () => {
    navigate('/Solicitudes');
  }

  const manipularBotonAceptar = () => {
    if (sugerido.aceptar) {
      setDialogoAbierto({ ...dialogoAbierto, aceptar: true })
    }
  }

  const manipularBotonRechazar = () => {
    if (sugerido.rechazar) {
      setDialogoAbierto({ ...dialogoAbierto, rechazar: true })
    }
  }

  const validarRazones = () => {
    if (razones.length === 0) {
      setMensajeError(message => ({ ...message, razones: 'Seleccione las razones generales' }));
    }else{
      setMensajeError(message => ({ ...message, razones: '' }));
    }
  }

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
            }}
          >
            <div
              style={{
                height: "10%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText boldText>Solicitud</StyledText>
              <StyledText boldText>{dataRow.materia}, {dataRow.capacidad}</StyledText>
            </div>

            <div className="infoCompleta" style={defaultStyle.infoCompleta}>
              <div className="Info" style={defaultStyle.info}>
                <RowPercentage firstChildPercentage={50} >
                  <div style={defaultStyle.textSubtitle}>
                    <StyledText style={defaultStyle.titles}>Motivo:</StyledText>
                  </div>
                  <div>
                    <StyledText >{dataRow.motivo}</StyledText>
                  </div>
                </RowPercentage>

                <RowPercentage firstChildPercentage={50} >
                  <div style={defaultStyle.textSubtitle}>
                    <StyledText style={defaultStyle.titles}>Fecha:</StyledText>
                  </div>
                  <div>
                    <StyledText >{dateFinal}</StyledText>
                  </div>
                </RowPercentage>

                <RowPercentage firstChildPercentage={50} >
                  <div style={defaultStyle.textSubtitle}>
                    <StyledText style={defaultStyle.titles}>Horario:</StyledText>
                  </div>
                  <div>
                    <StyledText>{dataRow.horas.join(', ')}</StyledText>
                  </div>
                </RowPercentage>

                <RowPercentage firstChildPercentage={50} >
                  <div style={defaultStyle.textSubtitle}>
                    <StyledText style={defaultStyle.titles}>Solicitantes:</StyledText>
                  </div>
                  <div>

                    {dataRow.tipoDado === "individual" ? (
                      <RowPercentage firstChildPercentage={50} >
                        <div>
                          <StyledText >{nombreDocente}</StyledText>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <StyledText >{JSON.parse(dataRow.grupo).join(', ')}</StyledText>
                        </div>
                      </RowPercentage>
                    ) :
                      (usersNombresGrupo.map((user) => (
                        <RowPercentage firstChildPercentage={50} key={user}>
                          <div>
                            <StyledText >{user.nombre}</StyledText>
                          </div>
                        </RowPercentage>
                      ))
                      )}

                  </div>
                </RowPercentage>
                {dataRow.tipoDado === "grupal" &&
                <RowPercentage firstChildPercentage={50} >
                <div style={defaultStyle.textSubtitle}>
                  <StyledText style={defaultStyle.titles}>Grupos:</StyledText>
                </div>
                <div>
                    <StyledText >{JSON.parse(dataRow.grupos).join(', ')}</StyledText>
                </div>
              </RowPercentage>} 
                <RowPercentage firstChildPercentage={50}  >
                  <div style={defaultStyle.textSubtitle}>
                    <StyledText style={defaultStyle.titles}>Servicios:</StyledText>
                  </div>
                  <div>
                    <StyledText >{dataRow.servicios}</StyledText>
                  </div>
                </RowPercentage>
              </div>

              <div className="tipo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {tipo.toLowerCase() === "aula" ? (
                  <img src={aula} alt="aula" style={defaultStyle.imagee} />
                ) : tipo.toLowerCase() === "auditorio" ? (
                  <img src={auditorio} alt="auditorio" style={defaultStyle.imagee} />
                ) : tipo.toLowerCase() === "laboratorio" ? (
                  <img src={laboratorio} alt="laboratorio" style={defaultStyle.imagee} />
                ) : null
                }
                <StyledText style={{ textTransform: 'uppercase' }} >{tipo}</StyledText>
              </div>
              <RowPercentage firstChildPercentage={40} gap={10}>
                <div style={{ marginBlock: '40px' }}>
                  
                </div>
                <div style={{ marginBlock: '40px' }}>
                  <RowPercentage firstChildPercentage={10} gap="10px">
                    <div >
                      <TextInput
                        label="Ambiente"
                        fullWidth={true}
                        value={ambienteSeleccionado}
                        onChange={e => setAmbienteSeleccionado(e.target.value)}
                        defaultValue=" "
                      // isRequired={true}
                      // validationMessage=""
                      />
                    </div>
                    <div style={defaultStyle.iconContainer} onClick={() => { }}>
                      <IconButton onClick={navegarPreload} style={{ color: "black" }}>
                        <SearchIcon style={{ fontSize: 30, color: theme.highlight }} />
                      </IconButton>
                    </div>
                  </RowPercentage>
                </div>
              </RowPercentage>
            </div>

            <div style={defaultStyle.buttonsContainer}>
              <Button1 onClick={manipularBotonAceptar} style={defaultStyle.botonConfirmar}>Aceptar</Button1>
              <Button1 onClick={manipularBotonRechazar} style={defaultStyle.botonRechazar}>Rechazar</Button1>
              <Button1 onClick={navegarBuscar} style={defaultStyle.botonCancelar}>Cancelar</Button1>
            </div>
            <Dialog
              open={dialogoAbierto.aceptar}
              onClose={manejoCancelarAceptar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Estás seguro de que deseas aceptar esta solicitud?
                  Se enviará un correo a los solicitantes.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={manejoCancelarAceptar}>Cancelar</Button>
                <Button onClick={manejoConfirmarAceptar} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={dialogoAbierto.rechazar}
              onClose={manejoCancelarRechazar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{
                component: 'form',
                onSubmit: (e) => {
                  e.preventDefault();
                  //manejoConfirmarRechazar();
                  const formData = new FormData(e.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const text = formJson.text;
                  console.log("Texto:", text);
                  manejoCancelarRechazar();   //es como un handleClose
                }
              }}
            >
              <DialogTitle>Rechazar solicitud</DialogTitle> 
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Se enviará un correo a los solicitantes.
                  Mencione las razones por las cuales se rechaza la solicitud:
                </DialogContentText> 
                <div style={{margin:20}}></div>
                <div>
                <SelectorChip 
                  options= {[
                    'No existen ambientes para la fecha solicitada',
                    'No existen ambientes para el horario seleccionado',
                    'No existen ambientes para la capacidad solicitada',
                  ]}
                  label="Razones generales"
                  changeValor={setRazones}
                  llenado={validarRazones}
                  mensajeValidacion={mensajeError.razones}
                />
                </div>
                
                <div style={{margin:20}}></div>
                <div>
                  <TextInput
                  label="Especificaciones"
                  fullWidth={true}
                  onChange={(event) => setEspecificaciones(event.target.value)}
                  pattern="^.{0,}$"
                  validationMessage={mensajeError.especificaciones}
                />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={manejoCancelarRechazar}>Cancelar</Button>
                <Button onClick={manejoConfirmarRechazar}>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
            <ParaCorreo
              dialogoAbiertoThere={mostrarPasoCorreo}
              cerrarDialogoThere={() => setMostrarPasoCorreo(false)}
              docentes={dataRow.tipoDado === "individual" ? [nombreDocente] : usersNombresGrupo.map(user => user.nombre)}
              mensajeDefault={mensajeCorreo}
              tipoCorreo={tipoCorreo}
              idSolicitud={dataRow.id}
            />
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

export default SolicitudAdmin;
