// esp
import { useNavigate } from 'react-router-dom';
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/TextInput";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
const TeacherLoginScreen = () => {
  const navegar = useNavigate();
  const iniciarSesion = () => {
    navegar('/dashboard');
  };

  const contenidoIzquierdo = 
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

  const contenidoDerecho = (
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
        label="Correo Electrónico"
        isRequired={true}
        validationMessage="Por favor, ingrese su correo."
        // onChange={handleNameChange}
      />
      <TextInput
        label="Contraseña"
        isRequired={true}
        validationMessage="Por favor, ingrese su contraseña."
        // onChange={handleNameChange}
      />
      <Button onClick={iniciarSesion} fullWidth={true}>Inicio de Sesion</Button>

      <div
        style={{
          height: "15%",
          display: "flex",
          justifyContent: 'flex-end',
          alignItems: "center",
          flexDirection: 'column',
        }}
      >
        <StyledText enlaceText> Registrarse </StyledText>
      </div>
    </div>
  );

  return <SplitScreenLayout left={contenidoIzquierdo} right={contenidoDerecho} />;
};

export default TeacherLoginScreen;
