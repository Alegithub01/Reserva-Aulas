import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/TextInput";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
const TeacherLoginScreen = () => {
  const leftContent = 
  <div 
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
  }}
>
  <StyledText boldWhiteText>
    Reserva de Ambientes
  </StyledText>
</div>;

  const rightContent = (
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
          height: "25%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledText boldText>Inicio de Sesión</StyledText>
      </div>
      <TextInput
        label="Correo Electronico"
        isRequired={true}
        validationMessage="Por favor, ingrese su correo."
        // onChange={handleNameChange}
      />
      <TextInput
        label="Contrasena"
        isRequired={true}
        validationMessage="Por favor, ingrese su contrasena."
        // onChange={handleNameChange}
      />
      <Button fullWidth={true}>Inicio de Sesion</Button>
      <div
        style={{
          height: "15%",
          display: "flex",
          justifyContent: 'flex-end',
          alignItems: "center",
          flexDirection: 'column',
        }}
      >
        <StyledText enlaceText> registrarse </StyledText>
      </div>
    </div>
  );

  return <SplitScreenLayout left={leftContent} right={rightContent} />;
};

export default TeacherLoginScreen;
