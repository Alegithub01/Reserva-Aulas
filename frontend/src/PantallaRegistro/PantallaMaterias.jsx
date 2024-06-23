import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplitScreenLayout from "../Components/SplitScreenLayout";
import TextInput from "../Utils/CampoValidado";
import StyledText from "../StyledText";
import Button from "../Utils/Button";
import RowPercentage from "../Responsive/RowPercentage";
import Dropdown from "../Utils/Dropdown";

const PantallaMaterias = () => {
  const [carrera, setCarrera] = useState("");
  const [ngrupos, setNGrupos] = useState(0);
  const [info, setInfo] = useState([]);
  const [mensajeError, setMensajeError] = useState({
    carrera: "",
    materias: "",
    grupos: "",
  });
  const navegar = useNavigate();

  const materiasDepartamento = [
    { value: "Dpto. Biología", label: "Dpto. Biología" },
    { value: "Dpto. Civil", label: "Dpto. Civil" },
    { value: "Dpto. Eléctrica-Electrónica", label: "Dpto. Eléctrica-Electrónica" },
    { value: "Dpto. Física", label: "Dpto. Física" },
    { value: "Dpto. Industrial", label: "Dpto. Industrial" },
    { value: "Dpto. Matemáticas", label: "Dpto. Matemáticas" },
    { value: "Dpto. Química", label: "Dpto. Química" },
    { value: "Dpto. Informática-Sistemas", label: "Dpto. Informática-Sistemas" },
    { value: "Dpto. Mecánica", label: "Dpto. Mecánica" },
  ];

  const validarFormulario = () => {
    validarSeleccionMaterias();
    //aca lo de enviar a backend
  };

  const validarSeleccionMaterias = () => {
    const errorMaterias = info.some((item) => item.materia === "");
    setMensajeError((previo) => ({
      ...previo,
      materias: errorMaterias ? "Seleccione al menos una materia" : "",
    }));
  };

  useEffect(() => {
    const materiasAsignadas = [];

    for(let i = 0; i < ngrupos; i++) {
      materiasAsignadas.push({
        materia: "",
        grupo: "",
        errorMateria: true,
        errorGrupo: true,
      });
    }
    setInfo(materiasAsignadas);
  }, [ngrupos]);

  const manejarCambioGrupo = (index, event, pattern) => {
    const newInfo = [...info];
    newInfo[index].grupo = event.target.value;
    if(pattern && RegExp(pattern).test(newInfo[index].grupo)) {
      newInfo[index].errorGrupo = false;
      setInfo(newInfo);
    }
    
  };

  const manejarNgrupos = (event, pattern) => {
    if (RegExp(pattern).test(event.target.value)) {
      setNGrupos(event.target.value);
    }
  };

  const validarGrupo = (index) => {
    const newInfo = [...info];
    newInfo[index].errorGrupo = newInfo[index].grupo.trim() === '';
    setInfo(newInfo);
  };

  const manejarCambioMateria = (index, value) => {
    const newInfo = [...info];
    newInfo[index].materia = value;
    newInfo[index].errorMateria = value === "";
    setInfo(newInfo);
  };

  const contenidoIzquierdo = (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "20%" }}>
      <StyledText boldWhiteText>Asignación de materias</StyledText>
    </div>
  );

  const contenidoDerecho = (
    <div style={{ width: "100%", flexDirection: "column", height: "100%", display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0" }}>
        <StyledText boldText>Registro de Materias</StyledText>
      </div>
      <RowPercentage firstChildPercentage={30} gap="10px">
        <div>
          <Dropdown
            etiqueta="Departamento al que pertenece"
            opciones={materiasDepartamento}
            cambio={setCarrera}
            esRequerido={true}
            mensajeValidacion={mensajeError.carrera}
          />
        </div>
        <div>
          <TextInput
            label="Cantidad"
            isRequired={true}
            value={ngrupos}
            onChange={(e) => manejarNgrupos(e, "^[0-9]{0,2}$")}
            validationMessage={mensajeError.grupos}
            pattern="^[0-9]{0,2}$"
          />
        </div>
      </RowPercentage>
      {info.map((materia, index) => (
        <RowPercentage key={index} firstChildPercentage={25} gap="10px">
          <div>
            <Dropdown
              etiqueta="Materia"
              opciones={materiasDepartamento}
              cambio={(value) => manejarCambioMateria(index, value)}
              esRequerido={true}
              mensajeValidacion={materia.errorMateria ? "Seleccione una materia" : ""}
            />
          </div>
          <div>
            <TextInput
              label="Grupo"
              isRequired={true}
              value={materia.grupo}
              onChange={(event) => manejarCambioGrupo(index, event, "^[0-9]{0,2}[A-Z]?$")}
              onBlur={() => validarGrupo(index)}
              validationMessage={materia.errorGrupo ? "Ingrese grupo" : ""}
              pattern="^[0-9]{0,2}[A-Z]?$"
            />
          </div>
        </RowPercentage>
      ))}
      <Button onClick={validarFormulario} fullWidth={true}>
        Registro
      </Button>
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", cursor: "pointer", marginTop: "10px" }}
        onClick={() => navegar("/inicioSesion")}
        onMouseOver={(e) => (e.target.style.color = "#3661EB")}
        onMouseOut={(e) => (e.target.style.color = "black")}
      >
      </div>
    </div>
  );

  return (
    <>
      <SplitScreenLayout left={contenidoIzquierdo} right={contenidoDerecho} />
    </>
  );
};

export default PantallaMaterias;
