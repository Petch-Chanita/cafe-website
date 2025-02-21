import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ เพิ่ม import
import {
  HomeIcon,
  CogIcon,
  UserIcon,
  MoonIcon,
  SunIcon,
  UsersIcon,
  ShoppingBagIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";

function MakeSidebar() {
  const navigate = useNavigate(); // ✅ ใช้เพื่อเปลี่ยนหน้า
  const location = useLocation(); // ✅ ใช้เพื่อเช็คเส้นทางปัจจุบัน
  const [expanded, setExpanded] = useState(true);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  });


  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }

    localStorage.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme: any) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const navBarItems = [
    {
      icon: <HomeIcon />,
      text: "Home",
      keyId: "home",
      path: "/home",
    },
    {
      icon: <UserIcon />,
      text: "Profile",
      keyId: "profile",
      path: "/profile",
    },
    {
      icon: <ShoppingBagIcon />,
      text: "Menu Management",
      keyId: "menu-management",
      path: "/menu-management",
    },
    {
      icon: <UsersIcon />,
      text: "Employees",
      keyId: "employees",
      path: "/employees",
    },
    {
      icon: <CogIcon />,
      text: "Settings",
      keyId: "settings",
      subMenu: [
        {
          icon:
            theme === "dark" ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            ),
          text: theme === "dark" ? "Light" : "Dark",
          onClick: toggleTheme,
        },
        {
          icon: <Bars3BottomLeftIcon />,
          text: "Description",
          onClick: () => navigate("/admin-dashboard/settings"),
        },
      ],
    },
  ];

  return (
    <Sidebar expanded={expanded} setExpanded={setExpanded}>
      {navBarItems.map((item, index) => (
        <SidebarItem
          key={index}
          expanded={expanded}
          {...item}
          active={
            // กรณี Home
            (item.keyId === "home" &&
              (location.pathname === "/admin-dashboard" ||
                location.pathname === "/admin-dashboard/")) ||
            location.pathname === "/admin-dashboard" + item.path
          }
          onClick={
            item.path
              ? () => navigate("/admin-dashboard" + item.path)
              : undefined
          }
        />
      ))}
    </Sidebar>
  );
}

export default MakeSidebar;
