import { Outlet } from "react-router-dom";
import "./theme.css";

const AdminDashboard = () => {
  
  return (

    /* Main Content */ 
      <div className="flex-1 p-5 theme overflow-hidden">
        <Outlet/>
      </div>
  );
};

export default AdminDashboard;
