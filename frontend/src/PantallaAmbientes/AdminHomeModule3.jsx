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
      with:'100%',
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
        padding="10px"
        borderColor="blue"
        borderRadius="15px"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: '10px'
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledText boldText>Registrar varios</StyledText>
            <RegistroMasivoBoton />
          </div>
        </div>
      </Card>
    </div>
  </div>
  );
};

export default AdminHomeModule3;
