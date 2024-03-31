import { useEffect } from 'react';
import RowResponsive from "../Responsive/RowResponsive";
import ColumnResponsive from "../Responsive/ColumnResponsive";
import AdminHomeModule1 from "./AdminHomeModule1";
import AdminHomeModule2 from "./AdminHomeModule2";
import AdminHomeModule3 from "./AdminHomeModule3";
import useTituloStore from "../Contexts/TituloStore";

const AdminHomeScreen = () => {
  const { setTitulo } = useTituloStore(); 
  useEffect(() => {
    setTitulo('Gestion de Ambientes');
  }, [setTitulo]);
  return (
    <div>
      <RowResponsive firstChildFlexPercentage="40%" lastChildFlexPercentage="60%">
        <div>
          <ColumnResponsive firstChildPercentage={70}>
            <div>
              <AdminHomeModule2 />
            </div>
            <div>
              <AdminHomeModule3 />
            </div>
          </ColumnResponsive>
        </div>
        <div>
          <AdminHomeModule1 />
        </div>
      </RowResponsive>
    </div>
  );
};

export default AdminHomeScreen;
