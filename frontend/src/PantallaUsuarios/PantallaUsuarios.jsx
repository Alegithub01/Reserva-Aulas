import { useEffect } from 'react';
import RowResponsive from "../Responsive/RowResponsive";
import ColumnResponsive from "../Responsive/ColumnResponsive";
import UsuarioModule1 from "./UsuarioModule1";
import UsuarioModule2 from "./UsuarioModule2";
import UsuarioModule3 from "./UsuarioModule3";
import useTituloStore from "../Contexts/TituloStore";

const PantallaUsuarios = () => {
  const { setTitulo } = useTituloStore(); 
  useEffect(() => {
    setTitulo('Gestion de Usuarios');
  }, [setTitulo]);

  return (
    <div>
      <RowResponsive firstChildFlexPercentage="40%" lastChildFlexPercentage="60%">
        <div>
          <ColumnResponsive firstChildPercentage={60}>
            <div>
              <UsuarioModule2 />
            </div>
            <div>
              <UsuarioModule3 />
            </div>
          </ColumnResponsive>
        </div>
        <div>
          <UsuarioModule1 />
        </div>
      </RowResponsive>
    </div>
  );
};

export default PantallaUsuarios;
