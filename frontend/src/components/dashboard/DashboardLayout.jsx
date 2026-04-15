import {Outlet} from "react-router";
import Dashboard from "./Dashboard";

export function DashboardLayout() {
  return (
    <div>

    {/*Sidebar*/}
      <Dashboard/>

      {/* Contenido dinámico */}
      <div style={{ marginLeft:"250px", padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout