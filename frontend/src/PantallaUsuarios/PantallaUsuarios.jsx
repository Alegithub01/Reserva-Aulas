import RowResponsive from "../Responsive/RowResponsive";
import ColumnResponsive from "../Responsive/ColumnResponsive";
import UsuarioModule1 from "./UsuarioModule1";
import UsuarioModule2 from "./UsuarioModule2";
import UsuarioModule3 from "./UsuarioModule3";

const PantallaUsuarios = () => {
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
