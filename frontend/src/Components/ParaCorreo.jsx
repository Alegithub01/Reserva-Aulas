import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from "@mui/material";
import SelectorChip from "../Utils/SelectorChip";
import Button from "../Utils/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import RowPercentage from "../Responsive/RowPercentage";
import TextArea from "../Utils/TextArea";
import axios from "axios";
import { URL_API } from "../services/const";

const ParaCorreo = ({ dialogoAbiertoThere, cerrarDialogoThere, docentes, mensajeDefault, tipoCorreo }) => {
  const navigate = useNavigate();
  const [receptores, setReceptores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState({
    mensaje: "",
    receptores: "",
  });


  const manejoConfirmar = async () => {
    try{
      await axios.post(`${URL_API}/enviar-correo-solicitud`, {
        subject: "Actualización de Solicitud de Reserva de Aula",
        content : mensaje,
        receptores: receptores,
      });
      navigate("/Solicitudes");//si todo esta bien
    } catch (error) {
      console.log(error);
    }

  }

  const validarReceptores = () => {
    if (receptores.length === 0 ) {
      setMensajeError({ ...mensajeError, receptores: "Debe seleccionar al menos un docente" });
    } else {
      setMensajeError({ ...mensajeError, receptores: "" });
    }
  }

  return (
    <div style={{ width: "2000px" }}>
      <Dialog
        open={dialogoAbiertoThere}
        onClose={cerrarDialogoThere}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100%", height: "100%"}}
      >
        <DialogTitle>Mensaje Masivo-Individual</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Mediante estos botones seleccione a los docentes a los que desea enviar el mensaje.
            Mensaje a enviar:
          </DialogContentText>
          <div style={{ display: 'flex', flexDirection:'column'}}>
            <div style={{ margin: 10 }}></div>
            <div >
              <TextArea
                label="Mensaje"
                fullWidth={true}
                onChange={(event) => setMensaje(event.target.value)}
                pattern="."
                validationMessage={mensajeError.mensaje}
                defaultValue={mensajeDefault}
              />
            </div>

            <div style={{ margin: 10 }}></div>
            <RowPercentage firstChildPercentage={40}>
              <div>
                <SelectorChip
                  options={docentes}
                  label="Para docentes:"
                  changeValor={setReceptores}
                  llenado={validarReceptores}
                  mensajeValidacion={mensajeError.razones}
                />
              </div>
            </RowPercentage>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarDialogoThere}>Cancelar</Button>
          <Button onClick={manejoConfirmar}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ParaCorreo.propTypes = {
  docentes: PropTypes.array.isRequired,
  dialogoAbiertoThere: PropTypes.bool.isRequired,
  cerrarDialogoThere: PropTypes.func.isRequired,
  mensajeDefault: PropTypes.string,
};

export default ParaCorreo;