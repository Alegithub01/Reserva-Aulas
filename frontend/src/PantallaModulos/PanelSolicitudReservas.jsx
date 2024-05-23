import SplitScreenLayout from "../Components/SplitScreenLayout";
import StyledText from "../StyledText";
import Card from "./Modulo";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';  
import useAjusteStore from "../Contexts/AjusteStore";
import { useEffect } from "react";

const PanelSolicitudReservas = () => {
    const navegar = useNavigate();
    const rol = localStorage.getItem('rol');
    const fechaInicio = useAjusteStore((state) => state.fechaInicio);
    const fechaFin = useAjusteStore((state) => state.fechaFin);
    
    const controlarFechaSolicitud = () => {
        const today = new Date().toISOString().split('T')[0];
        if(today >= fechaInicio && today <= fechaFin){
            navegar('/Solicitud')
        }else {
            alert("No se puede solicitar reserva en este momento");
        }
        
    };
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
                <StyledText boldText>Solicitudes de Reservas</StyledText>
            </div>
            <Card 
                text="Solicitar Reserva" 
                Icon={AddCircleOutlineIcon}
                onClick={controlarFechaSolicitud}
            />
            <Card 
                text="Ver Disponibilidad" 
                Icon={EventAvailableIcon}
                onClick={() => navegar('/Calendario')}
            />
            <Card 
                text="Mis Solicitudes" 
                Icon={HistoryIcon}
                onClick={() => navegar('/Reservas')}
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
        {rol === "2" &&
            <SplitScreenLayout left={contenidoIzq} right={contenidoDer} />
        }
        s</>
    );
};

export default PanelSolicitudReservas;
