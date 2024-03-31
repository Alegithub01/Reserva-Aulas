import Card from "../Utils/Card";
import GridTablaProfesores from "./GridTablaProfesores";
import StyledText from "../StyledText";

const AdminHomeModule1 = () => {
  return (
    <Card
      minWidth="300px"
      minHeight="100px"
      fullWidth
      fullHeight
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
  );
};

export default AdminHomeModule1;
