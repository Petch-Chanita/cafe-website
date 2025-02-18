import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ใช้เพื่อแสดงข้อผิดพลาด
  const [isLoading, setIsLoading] = useState(true); // ใช้เพื่อแสดงหน้า loading
  const navigate = useNavigate();

  // การตรวจสอบ Token ใน localStorage
  useEffect(() => {
    // หน่วงเวลาให้หน้าโหลดแสดงประมาณ 1 วินาที
    const timeout = setTimeout(() => {
      const token = localStorage.getItem("admin_token");

      if (token) {
        try {
          // Decode Token เพื่อตรวจสอบการหมดอายุ
          const decodedToken = JSON.parse(atob(token.split(".")[1])); // decode payload
          const expirationDate = decodedToken.exp * 1000; // exp จะเป็น timestamp ของการหมดอายุ

          if (Date.now() < expirationDate) {
            // ถ้า token ยังไม่หมดอายุ ให้ redirect ไปหน้า home หรือหน้าอื่นๆ
            navigate("/admin-dashboard");
          } else {
            // ถ้า token หมดอายุ ให้ลบ token และให้ไปหน้า login
            localStorage.removeItem("admin_token");
          }
        } catch (error) {
          console.error("Invalid token", error);
          localStorage.removeItem("admin_token");
        }
      }
      setIsLoading(false); // เสร็จสิ้นการตรวจสอบ token
    }, 2000); // หน่วงเวลา 1 วินาที

    return () => clearTimeout(timeout); // ทำความสะอาด timeout
  }, [navigate]);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // เริ่มโหลดระหว่างส่งคำขอล็อกอิน

    try {
      // ส่งข้อมูล login ไปยัง backend API
      const response = await api.post("/auth/login-admin", { username, password });

      // ถ้าการล็อกอินสำเร็จ
      if (response.status === 200) {
        // บันทึกข้อมูลการล็อกอิน เช่น JWT หรือการยืนยันตัวตน
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("admin_token", response.data.token);
        navigate("/admin-dashboard"); // นำผู้ใช้ไปที่หน้า admin
      }
    } catch (error: any) {
      setError("Invalid credentials, please try again");
    } finally {
      setIsLoading(false); // เสร็จสิ้นการโหลด
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {isLoading ? (
        // แสดงหน้า Loading
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
        </div>
      ) : (
        // ถ้าไม่กำลังโหลด ให้แสดงหน้า login
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* แสดงข้อผิดพลาดถ้ามี */}
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Please contact the developer.
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
