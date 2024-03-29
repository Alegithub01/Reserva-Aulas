import Card from "../Utils/Card";
import Button from '../Utils/Button'
import TableGrid from "../Components/TableGrid";

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
        <TableGrid/>
        </Card>
  );
};

export default AdminHomeModule1;
