import { Outlet } from "react-router-dom";
import MakeSidebar from "./MakeSidebar";
import "./theme.css";

const AdminDashboard = () => {
  
  return (
    <div className="flex theme">
    {/* Sidebar */}
    <MakeSidebar/>

    {/* Main Content */}
      <div className="flex-1 p-5 theme">
        <Outlet/>
      </div>
  </div>
  );
};

export default AdminDashboard;
