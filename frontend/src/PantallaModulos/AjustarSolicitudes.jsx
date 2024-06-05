import SplitScreenLayout from "../Components/SplitScreenLayout";
import StyledText from "../StyledText";
import Card from "./Modulo";
import { useNavigate } from 'react-router-dom'; 
import DateRangeIcon from '@mui/icons-material/DateRange';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

const AjustarSolicitudes = () => {
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
            <StyledText boldWhiteText>Ajustar Solicitudes</StyledText>
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
                <StyledText boldText>Configuración</StyledText>
            </div>
            
            <Card 
                text="Ajustar Periodos" 
                Icon={MoreTimeIcon}
                onClick={() => navegar('/Ajustar-periodos')}
            />
            <Card 
                text="Delimitar fechas" 
                Icon={DateRangeIcon}
                onClick={() => navegar('/Delimitar-fechas')}
            />
            <Card 
                text="Ajustar Contiguos" 
                Icon={DisplaySettingsIcon}
                onClick={() => navegar('/Ajustar-Contiguos')}
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


export default AjustarSolicitudes;
