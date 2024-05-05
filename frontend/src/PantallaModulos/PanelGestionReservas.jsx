import SplitScreenLayout from "../Components/SplitScreenLayout";
import StyledText from "../StyledText";
import Card from "./Modulo";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';    
import SettingsIcon from '@mui/icons-material/Settings';

const PanelGestionReservas = () => {
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
                    height: "10%",
                }}
            >
                <StyledText boldText>Gestión de Reservas</StyledText>
            </div>
            
            <Card 
                text="Buscar Ambientes" 
                Icon={SearchIcon}
                onClick={() => navegar('/Buscar-Ambiente')}
            />
            <Card 
                text="Administrar Solicitudes" 
                Icon={SettingsIcon}
                onClick={() => navegar('/Solicitudes')}
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
            <SplitScreenLayout left={contenidoIzq} right={contenidoDer} />
        </>
    );
};

export default PanelGestionReservas;
