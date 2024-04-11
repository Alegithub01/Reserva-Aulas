import Card from "../Utils/Card";
import GridTablaProfesores from "./GridTablaProfesores";
import StyledText from "../StyledText";
import { useTheme } from '../Contexts/ThemeContext';

const AdminHomeModule1 = () => {
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
      width: '70%',
      minWidth: '600px',
      minHeight: '600px',
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
          padding="30px 10px"
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
                height: "6%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText boldText>Lista de Usuarios Registrados</StyledText>
            </div>
            <div
              style={{
                height: "6%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
            <GridTablaProfesores />
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

export default AdminHomeModule1;
