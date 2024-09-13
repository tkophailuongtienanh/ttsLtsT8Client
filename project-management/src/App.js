import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import Toast from "./components/Toast";
import ResetPassword from "./pages/Authen/ResetPassword";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Authen/Login"));
const ConfirmEmail = lazy(() => import("./pages/Authen/ConfirmEmail"));
const CreateAccount = lazy(() => import("./pages/Authen/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/Authen/ForgotPassword"));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/confirmEmail" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/app/*" element={<Layout />} />
          
          {/* Default redirects */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <Toast />
    </>
  );
}

export default App;
