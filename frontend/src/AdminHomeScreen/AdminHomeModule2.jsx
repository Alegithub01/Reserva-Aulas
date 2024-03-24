import React, { useState } from 'react';
import Card from "../Utils/Card";
import Button from "../Utils/Button";
import TextInput from "../Utils/TextInput";
import RowPercentage from "../Responsive/RowPercentage";
import StyledText from "../StyledText";
import Dropdown from "../Utils/Dropdown";
import SelectorHora from "../Utils/SelectorHora";

const AdminHomeModule2 = () => {
  const [horaInicio, cambiarHoraInicio] = useState("");

  const cambiarPresionado = () => {
    cambiarHoraInicio(true);
  };

  return (
    <Card
      minWidth="300px"
      minHeight="100px"
      fullWidth
      fullHeight
      alignCenter
      padding="30px 60px"
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledText boldText>Ambiente</StyledText>

        </div>
        <RowPercentage firstChildPercentage={60} gap="10px">
          <div>
            <TextInput
              label="Nombre"
              fullWidth={true}
              onChange={(e) => {
                if(/^[a-zA-Z\s]+$/.test(e.target.value)){
                  console.log(e.target.value);
                }
              }}
              isRequired={true}
              validationMessage="Por favor. Ingrese su nombre"
              pattern= "^[a-zA-Z\s]*$" 
            />
          </div>
          <div>
            <TextInput
              label="Capacidad"
              fullWidth={true}
              onChange={(e) => console.log(e.target.value)}
              isRequired={true}
              validationMessage="Por favor. Ingrese la capacidad"
              pattern="^[0-9]*$"
              rango={{min:10 , max:300}}
            />
          </div>
        </RowPercentage>
        <RowPercentage firstChildPercentage={40} gap="10px">
          <div>
            <Dropdown
              etiqueta="Tipo de Ambiente"
              opciones={[
                { value: "10", label: "Aula" },
                { value: "20", label: "Auditorio" },
                { value: "30", label: "Laboratorio" },
              ]}
              esRequerido={true}
              mensajeValidacion="Por favor. Seleccione el tipo de ambiente"
            />
          </div>
          <div>
            <Dropdown
              etiqueta="Planta"
              opciones={[
                { value: "10", label: "Planta 0" },
                { value: "20", label: "Planta 1" },
                { value: "30", label: "Planta 2" },
                { value: "40", label: "Planta 3" },
              ]}
              esRequerido={true}
              mensajeValidacion="Por favor. Seleccione la planta"
            />
          </div>
        </RowPercentage>
        <TextInput
          label="Ubicacion"
          onChange={(e) => console.log(e.target.value)}
          isRequired={false}
          pattern="\w*"
        />
        <TextInput
          label="Servicios"
          onChange={(e) => console.log(e.target.value)}
          isRequired={false}
          pattern="\w*"
        />

        <RowPercentage firstChildPercentage={30} gap="20px">
          <div>
            <Dropdown
              etiqueta="Día"
              opciones={[
                { value: "10", label: "Lunes" },
                { value: "20", label: "Martes" },
                { value: "30", label: "Miércoles" },
                { value: "40", label: "Jueves" },
                { value: "50", label: "Viernes" },
                { value: "60", label: "Sábado" },
                { value: "70", label: "Domingo" },
              ]}
              esRequerido={true}
              mensajeValidacion="Por favor. Seleccione el día."
            />
          </div>
          <div>
            <SelectorHora
              etiqueta= "Hora inicio:"
              esRequerido= {true}
              fullWidth={true}
              mensajeValidacion="Por favor. Ingrese la hora de inicio."
              enCambio={cambiarHoraInicio}
            />
          </div>
          <div>
            <SelectorHora
              etiqueta= "Hora fin:"
              esRequerido= {true}
              fullWidth={true}
              mensajeValidacion="Por favor. Ingrese la hora de fin." 
              minimaHora={horaInicio}   
            />
          </div>
        </RowPercentage>
        <Button fullWidth={true}>Guardar Cambios</Button>
      </div>
    </Card>
  );
};

export default AdminHomeModule2;
