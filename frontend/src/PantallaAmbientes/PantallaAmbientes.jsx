import RowResponsive from "../Responsive/RowResponsive";
import ColumnResponsive from "../Responsive/ColumnResponsive";
import AdminHomeModule1 from "./AdminHomeModule1";
import AdminHomeModule2 from "./AdminHomeModule2";
import AdminHomeModule3 from "./AdminHomeModule3";
// import { useTheme } from "../Contexts/ThemeContext";

const AdminHomeScreen = () => {
  // const { theme } = useTheme();
  return (
    <div>
      <RowResponsive>
        <div>
          <AdminHomeModule1 />
        </div>
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
      </RowResponsive>
    </div>
  );
};

export default AdminHomeScreen;
