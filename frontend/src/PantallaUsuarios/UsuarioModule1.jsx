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
      with:'100%',
      height: '100%',
      backgroundColor: theme.secondary,
    },
    container: {
      display: 'flex',
      minWidth: '900px',
      minHeight: '500px',
    },
  };
  return (
    <div style={defaultStyle.outerContainer}>
      <div style={defaultStyle.container}>
        <Card
          minWidth="100px"
          minHeight="100px"
          fullWidth
          // fullHeight
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
              <StyledText boldText>Lista de Usuarios</StyledText>
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
