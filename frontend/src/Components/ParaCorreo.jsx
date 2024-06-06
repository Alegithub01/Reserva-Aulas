import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from "@mui/material";
import SelectorChip from "../Utils/SelectorChip";
import Button from "../Utils/Button";
import PropTypes from "prop-types";
import TextInput from "../Utils/TextInput";
import { useNavigate } from "react-router-dom";
import RowPercentage from "../Responsive/RowPercentage";
import TextArea from "../Utils/TextArea";

const ParaCorreo = ({ dialogoAbiertoThere, cerrarDialogoThere, docentes, especificaciones, razones, aceptado }) => {
  const navigate = useNavigate();
  const [receptores, setReceptores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState({
    mensaje: "",
    receptores: "",
  });


  const manejoConfirmar = () => {
    //BACKEND
    navigate("/Solicitudes");//si todo esta bien
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
                defaultValue={aceptado?`Buen día \n\n Se le informa que su solicitud ha sido aceptada `:`Buen día \n\nSe le informa que su solicitud ha sido rechazada por las siguientes razones: \n\n${razones}\n\n${especificaciones}`}
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
};

export default ParaCorreo;