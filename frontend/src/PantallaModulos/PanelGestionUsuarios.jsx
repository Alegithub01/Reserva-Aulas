import SplitScreenLayout from "../Components/SplitScreenLayout";
import StyledText from "../StyledText";
import Card from "./Modulo";
import IconoRegistroMasivo from '@mui/icons-material/GroupAdd';
import IconoListaUsuarios from '@mui/icons-material/ListAlt';
import IconoCrearRol from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

const PanelGestionUsuarios = () => {
    const navegar = useNavigate();
    const rol = localStorage.getItem('rol');
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
            <StyledText boldWhiteText>Sistema</StyledText>
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
                    margin: "15px 0px",
                    height: "15%",
                }}
            >
                <StyledText boldText>Gestion de Usuarios</StyledText>
            </div>
            <Card 
                text="Registro Masivo de Usuarios" 
                Icon={IconoRegistroMasivo}
                onClick={() => navegar('/Registro-Masivo-Usuarios')}
            />
            <Card 
                text="Lista de Usuarios Registrados" 
                Icon={IconoListaUsuarios}
                onClick={() => navegar('/Lista-Usuarios')}
            />
            <Card 
                text="Crear Nuevo Rol" 
                Icon={IconoCrearRol}
                onClick={() => navegar('/Crear-Rol-Nuevo')}
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
            </div>
        </div>
    );

    return (
        <>
        {rol === "1" &&
            <SplitScreenLayout left={contenidoIzq} right={contenidoDer} />
        }
        </>
    );
};

export default PanelGestionUsuarios;
