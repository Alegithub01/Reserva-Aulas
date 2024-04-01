import Card from "../Utils/Card";
import StyledText from "../StyledText";
import RegistroMasivoBoton from "../Components/RegistroMasivoBoton";

const AdminHomeModule3 = () => {
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
  );
};

export default AdminHomeModule3;
