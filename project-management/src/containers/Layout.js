import React, { useContext, Suspense, useEffect, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import routes from "../routes";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";
import Dashboard from "../pages/Dashboard";
import Cookie from "js-cookie";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const navigate = useNavigate();
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();
  const token = Cookie.get("token");
  useEffect(() => {
    try {
      const url = "https://localhost:7242/api/Authentication/Get";
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      console.log("headers['Authorization']", headers["Authorization"]);
      // Thiết lập cấu hình cho fetch
      const config = {
        method: "GET", // Mặc định là GET
        headers,
      };
      const callApi = async () => {
        const response = await fetch(url, config);
        if (!response.ok) {
          navigate("/login");
        }
        console.log("check", response);
      };
      callApi();
    } catch (error) {}
  }, []);
  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Routes>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    path={`/${route.path}`}
                    element={<route.component />}
                  />
                ) : null;
              })}
              <Route path="/" element={<Navigate to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
