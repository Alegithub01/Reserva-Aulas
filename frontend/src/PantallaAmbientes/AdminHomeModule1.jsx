import Card from "../Utils/Card";
import TableGrid from "../Components/TableGrid";
import StyledText from "../StyledText";

const AdminHomeModule1 = () => {
  return (
    <Card
      minWidth="300px"
      minHeight="100px"
      fullWidth
      fullHeight
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
  );
};

export default AdminHomeModule1;
