import SplitScreenLayout from "../Components/SplitScreenLayout";
import StyledText from "../StyledText";
import Card from "./Modulo";
import IconoPersonas from '@mui/icons-material/PeopleAlt';
import IconoAmbientes from '@mui/icons-material/RoomPreferences';
import IconoReservas from '@mui/icons-material/EventNote';
import { useNavigate } from 'react-router-dom';

const PantallaModulos = () => {
    const navegar = useNavigate();

    const contenidoIzq = (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "20%",
            }}
        >
            <StyledText boldWhiteText>Reserva de Ambientes</StyledText>
        </div>
    );

    const contenidoDer = (
        <div
            style={{
                width: "85%",
                flexDirection: "column",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "15px 0",
                }}
            >
                <StyledText boldText>Módulos</StyledText>
            </div>
            <Card 
                text="Gestión de Usuarios" 
                Icon={IconoPersonas}
                onClick={() => navegar('/gestion-usuarios')}
            />
            <Card 
                text="Gestión de Ambientes" 
                Icon={IconoAmbientes}
                onClick={() => navegar('/GestionAmbientes')}
            />
            <Card 
                text="Gestión de Reservas" 
                Icon={IconoReservas}
                onClick={() => navegar('/gestion-reservas')}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    cursor: "pointer",
                    marginTop: "15px",
                }}
                onClick={() => navegar("/")}
                onMouseOver={(e) => (e.target.style.color = "#3661EB")}
                onMouseOut={(e) => (e.target.style.color = "black")}
            >
                <StyledText enlaceText> Cerrar sesión </StyledText>
            </div>
        </div>
    );

    return (
        <>
            <SplitScreenLayout left={contenidoIzq} right={contenidoDer} />
        </>
    );
};

export default PantallaModulos;
