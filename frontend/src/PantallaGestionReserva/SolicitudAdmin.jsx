import React, { useState, useEffect } from "react";
import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import RowPercentage from "../Responsive/RowPercentage";
import aula from '../assets/imgs/aula.jpg';
import auditorio from '../assets/imgs/auditorio.jpg';
import laboratorio from '../assets/imgs/laboratorio.jpg';

import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextInput from "../Utils/TextInput";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
import Button from "../Utils/Button";
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useLocation } from 'react-router-dom';
import useAmbienteStore from "../Contexts/AmbienteStore";

const SolicitudAdmin = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { dataRow } = location.state || {};
  const [nombreDocente, setNombreDocente] = useState('user'); //nombre del docente loggeado
  const [tipo, setTipo] = useState(dataRow.tipo_ambiente || "aula");
  const ambientesSeleccionados = useAmbienteStore(state => state.ambientesSeleccionados);
  const setAmbientesSeleccionados = useAmbienteStore(state => state.setAmbientesSeleccionados);
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState(
    " " + ambientesSeleccionados.map(amb => amb.nombre).join(', ')
  );
  const [dialogoAbierto, setDialogoAbierto] = useState({
    aceptar: false,
    rechazar: false,
  });

  useEffect(() => {
    setAmbienteSeleccionado(ambientesSeleccionados.map(amb => amb.nombre).join(', '));
    setAmbientesSeleccionados([]);
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
    }
  };

  const navegarPreload = () => {
    console.log("contru");
    navigate('/Buscar-Ambiente', { state: { seleccion: true } });
  }

  const manejoConfirmarAceptar =() => {
    console.log("se confirma");
    setDialogoAbierto({...dialogoAbierto, aceptar: false});
    //backend acaa
  }

  const manejoCancelarAceptar =() => {
    setDialogoAbierto({...dialogoAbierto, aceptar: false})
  }

  const manejoConfirmarRechazar =() => {
    console.log("se rechaza");
    setDialogoAbierto({...dialogoAbierto, rechazar: false});
    //backend acaa
  }

  const manejoCancelarRechazar =() => {
    setDialogoAbierto({...dialogoAbierto, rechazar: false})
  }

  const navegarBuscar = () => {
    //aca colocar los datos para autocompletarse
    navigate('/Panel-Gestion-Reservas');
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
              <div className="Info" style={{ width: '60%' }}>
                <RowPercentage firstChildPercentage={50} >
                  <div style={defaultStyle.textSubtitle}>
                    <StyledText style={defaultStyle.titles}>Mensaje Solicitud:</StyledText>
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
                    <StyledText >{dataRow.fecha}</StyledText>
                  </div>
                </RowPercentage>

                <RowPercentage firstChildPercentage={50} >
                  <div style={defaultStyle.textSubtitle}>
                    <StyledText style={defaultStyle.titles}>Horario:</StyledText>
                  </div>
                  <div>
                    {dataRow.horas.map((horario, index) => (
                      <StyledText key={index}>{horario}</StyledText>
                    ))
                    }
                  </div>
                </RowPercentage>

                <RowPercentage firstChildPercentage={50} >
                  <div style={defaultStyle.textSubtitle}>
                    <StyledText style={defaultStyle.titles}>Solicitantes:</StyledText>
                  </div>
                  <div>
                    {/* <RowPercentage firstChildPercentage={50} >
                      <div>
                        <StyledText >Leticia Blanco</StyledText>
                      </div>
                      <div>
                        <StyledText >1, 2</StyledText>
                      </div>
                    </RowPercentage>
                    <RowPercentage firstChildPercentage={50} >
                      <div>
                        <StyledText >Vladimir Costas</StyledText>
                      </div>
                      <div>
                        <StyledText >10</StyledText>
                      </div>
                    </RowPercentage>
                    <RowPercentage firstChildPercentage={50} >
                      <div>
                        <StyledText >Corina Flores</StyledText>
                      </div>
                      <div>
                        <StyledText >4</StyledText>
                      </div>
                    </RowPercentage> */}
                    <RowPercentage firstChildPercentage={50} >
                      <div>
                        <StyledText >{nombreDocente}</StyledText>
                      </div>
                      <div>
                        <StyledText >{dataRow.grupo.join(', ')}</StyledText>
                      </div>
                    </RowPercentage>
                  </div>
                </RowPercentage>

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
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Sin verificar"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="Verificado" control={<Radio />} label="Verificado" />
                      <FormControlLabel value="Sin verificar" control={<Radio />} label="Sin verificar" />
                    </RadioGroup>
                  </FormControl>
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
              <Button onClick={() => { setDialogoAbierto({...dialogoAbierto, aceptar: true})}}>Aceptar</Button>
              <Button onClick={() => { setDialogoAbierto({...dialogoAbierto, rechazar: true})}}>Rechazar</Button>
              <Button onClick={() => { navegarBuscar}}>Cancelar</Button>
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
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Estás seguro de que deseas rechazar esta solicitud?
                  Se enviará un correo a los solicitantes.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={manejoCancelarRechazar}>Cancelar</Button>
                <Button onClick={manejoConfirmarRechazar} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
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
