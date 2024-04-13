import Card from "../Utils/Card";
import StyledText from "../StyledText";
import RegistroMasivoBoton from "../Components/RegistroMasivoBoton";
import { useTheme } from '../Contexts/ThemeContext';

const AdminHomeModule3 = () => {
  const { theme } = useTheme();
  const defaultStyle = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      with: '100%',
      backgroundColor: theme.secondary,
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
            </div>
       
        </Card>
      </div >
    </div >
  );
};

export default AdminHomeModule3;
