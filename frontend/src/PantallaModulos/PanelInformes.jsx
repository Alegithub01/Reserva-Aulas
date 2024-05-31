import SplitScreenLayout from "../Components/SplitScreenLayout";
import StyledText from "../StyledText";
import Card from "./Modulo";
import IconoAmbientesSolicitados from '@mui/icons-material/TrendingUp';
import IconoFechasDemandadas from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';

const PanelInformes = () => {
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
                <StyledText boldText>Panel de Informes</StyledText>
            </div>
            <Card 
                text="Ambientes Más y Menos Solicitados" 
                Icon={IconoAmbientesSolicitados}
                onClick={() => navegar('/Ambientes-Solicitados')}
            />
            <Card 
                text="Fechas Más y Menos Demandadas" 
                Icon={IconoFechasDemandadas}
                onClick={() => navegar('/Fechas-Demandadas')}
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

export default PanelInformes;
