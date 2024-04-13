import Card from "../Utils/Card";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';
import ButtonEstilizado from "../Utils/Button";

const AdminHomeModule3 = () => {
  const { theme } = useTheme();
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
    buttonsField: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    textfield:{
        width: '100%',
        height: '40%',
        borderRadius: '20px',
        formSizing: 'border-box',
        padding: '15px',
        fontFamily: 'Arial',
        fontSize: '16px',
        border: `2px solid ${theme.highlight}`
    },
  };
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          minWidth="300px"
          minHeight="100px"
          fullWidth
          alignCenter
          padding="30px 60px"
          borderColor="blue"
          borderRadius="15px"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            
            }}
          >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '30%',
                }}
              >
                <StyledText boldText >Reglas de Reserva</StyledText>
                </div>
                <textarea style={defaultStyle.textfield}/>
                <div style={defaultStyle.buttonsField}>
                    <ButtonEstilizado fullWidth={true} onClick={() => {}} >Guardar</ButtonEstilizado>
                    <ButtonEstilizado fullWidth={true} onClick={() => {}} >Publicar</ButtonEstilizado>
                </div>
              
            </div>
       
        </Card>
      </div >
    </div >
  );
};

export default AdminHomeModule3;
