import {Outlet} from "react-router";
import Dashboard from "./Dashboard";

export function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>

    {/*Sidebar*/}
      <Dashboard/>

      {/* Contenido dinámico */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout