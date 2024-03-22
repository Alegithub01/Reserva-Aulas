import Card from "../Utils/Card";
import Button from "../Utils/Button";
import TextInput from "../Utils/TextInput";
import RowPercentage from "../Responsive/RowPercentage";
import StyledText from "../StyledText";
import Dropdown from "../Utils/Dropdown";

const AdminHomeModule2 = () => {

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
              onChange={(e) => console.log(e.target.value)}
              isRequired={true}
              validationMessage="Por favor. Ingrese su nombre"
            />
          </div>
          <div>
            <TextInput
              label="Capacidad"
              fullWidth={true}
              onChange={(e) => console.log(e.target.value)}
              isRequired={true}
              validationMessage="Por favor. Ingrese la capacidad"
            />
          </div>
        </RowPercentage>
        <RowPercentage firstChildPercentage={40} gap="10px">
          <div>
            <Dropdown
              label="Tipo de Ambiente"
              options={[
                { value: "", label: "Ninguno" },
                { value: "10", label: "Aula" },
                { value: "20", label: "Auditorio" },
                { value: "30", label: "Laboratorio" },
              ]}
              isRequired={true}
              validationMessage="Por favor. Seleccione alguna opción"
            />
          </div>
          <div>
            <Dropdown
              label="Planta"
              options={[
                { value: "", label: "Planta 0" },
                { value: "10", label: "Planta 1" },
                { value: "20", label: "Planta 2" },
                { value: "30", label: "Planta 3" },
              ]}
            />
          </div>
        </RowPercentage>
        <TextInput
          label="Ubicacion"
          onChange={(e) => console.log(e.target.value)}
          isRequired={false}
        />
        <TextInput
          label="Servicios"
          onChange={(e) => console.log(e.target.value)}
          isRequired={false}
        />

        <RowPercentage firstChildPercentage={45} gap="10px">
          <div>
            <Dropdown
              label="Dia"
              options={[
                { value: "10", label: "Lunes" },
                { value: "20", label: "Martes" },
                { value: "30", label: "Miercoles" },
                { value: "40", label: "Jueves" },
                { value: "50", label: "Viernes" },
                { value: "60", label: "Sabado" },
                { value: "70", label: "Domingo" },
              ]}
            />
          </div>
          <div>
            <TextInput
              label="Horas"
              fullWidth={true}
              onChange={(e) => console.log(e.target.value)}
              isRequired={true}
              validationMessage="Por favor introduzca la hora"
            />
          </div>
        </RowPercentage>
        <Button fullWidth={true}>Guardar Cambios</Button>
      </div>
    </Card>
  );
};

export default AdminHomeModule2;
