import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '../Contexts/ThemeContext';

const SelectorHora = ({ etiqueta, esRequerido}) => {
  const { theme } = useTheme();

  const styles = makeStyles((theme) => ({
    container: {
      display: 'flex',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
    },
  }));

  return(
    <form noValidate sx={{}}>
      <TextField
        id="time"
        label={etiqueta}
        type="time"
        defaultValue="06:45"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{
          '.MuiInputLabel-formControl': {
            position: 'relative',
            transform: 'translate(0, 24px) scale(1)',
          },
          '&label .MuiInput-formControl':{
            marginTop: 0,
          },
          '&.MuiFormControl-root .MuiTextField-root': {
           border: 0,
           margin: 0,
           display: 'fixed',
            padding: 0,
           width: 400,
           flexDirection: 'column',
            verticalAlign: 'top',
          } ,
        }}
      />
    </form>
  )
};

export default SelectorHora;