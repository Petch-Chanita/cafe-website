import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true); // สถานะโหลด
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ตรวจสอบสถานะการล็อกอิน
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    const checkToken = async () => {
      // ถ้าไม่มี token ก็ให้การโหลดเสร็จทันที
      if (!token) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        // ตรวจสอบ token ว่าถูกต้องหรือไม่
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // แปลง JWT เป็น JSON
        const expirationDate = decodedToken.exp * 1000; // ค่า exp ใน token จะเป็น timestamp ของการหมดอายุ

        if (Date.now() >= expirationDate) {
          localStorage.removeItem("admin_token");
          setIsLoading(false);
          setIsAuthenticated(false);
        } else {
          setIsLoading(false);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [token]);

  // ถ้ายังโหลดไม่เสร็จให้แสดงหน้า loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
      </div>
    );
  }


  // ถ้ามี token และ token ยังไม่หมดอายุ ให้แสดง Outlet (หน้า admin หรือหน้าอื่นๆ)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login-admin" />;
};

export default PrivateRoute;
