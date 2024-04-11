import Card from "../Utils/Card";
import TableGrid from "../Components/TableGrid";
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
          minWidth="300px"
          minHeight="100px"
          fullWidth
          alignCenter
          padding="10px"
          borderColor="blue"
          borderRadius="15px"
          block
        >
          <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <StyledText boldText style={{ textAlign: 'center' }}>Lista de Ambientes Disponibles</StyledText>
            <TableGrid />

          </div>

        </Card>
      </div>
      </div>
  );
};

export default AdminHomeModule1;
