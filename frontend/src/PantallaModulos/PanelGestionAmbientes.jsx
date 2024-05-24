import SplitScreenLayout from "../Components/SplitScreenLayout";
import StyledText from "../StyledText";
import Card from "./Modulo";
import IconoRegistroAmbiente from '@mui/icons-material/AddLocation';
import IconoRegistroMasivoAmbiente from '@mui/icons-material/GroupAdd';
import IconoListaAmbientes from '@mui/icons-material/List';
import IconoReglasAmbiente from '@mui/icons-material/Rule';
import { useNavigate } from 'react-router-dom';

const PanelGestionAmbientes = () => {
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
                    margin: "15px 0",
                    height: "15%",
                }}
            >
                <StyledText boldText>Gestión de Ambientes</StyledText>
            </div>
            <Card 
                text="Registro de Ambiente" 
                Icon={IconoRegistroAmbiente}
                onClick={() => navegar('/Registro-Ambiente')}
            />
            <Card 
                text="Registro Masivo de Ambientes" 
                Icon={IconoRegistroMasivoAmbiente}
                onClick={() => navegar('/Registro-Masivo-Ambientes')}
            />
            <Card 
                text="Lista de Ambientes Registrados" 
                Icon={IconoListaAmbientes}
                onClick={() => navegar('/Lista-Ambientes')}
            />
            <Card 
                text="Publicar Reglas" 
                Icon={IconoReglasAmbiente}
                onClick={() => navegar('/Publicacion-Reglas')}
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

export default PanelGestionAmbientes;
