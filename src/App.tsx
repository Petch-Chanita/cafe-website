import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Publish from "./components/Publish";
import PrivateRoute from "./components/admin/PrivateRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/admin/Login";
import HomePage from "./components/admin/home/HomePage";
import ProfilePage from "./components/admin/profile/ProfilePage";
import MenuManagement from "./components/admin/menu-management/MenuManagement";
import EmployeesPage from "./components/admin/employees/EmployeesPage";
import SettingsPage from "./components/admin/settings/SettingsPage";

const App = () => {
  return (
    <Router basename="cafe-website">
      <Routes>
        <Route path="/" element={<Publish />} />

        <Route path="/login-admin" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<HomePage /> } /> 
            <Route path="home" element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="menu-management" element={<MenuManagement />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
