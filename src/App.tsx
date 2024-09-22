import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import AdminDashboard from "./pages/Admin/Dashboard";
import MeseroDashboard from "./pages/Mesero/Dashboard";
import CocineroDashboard from "./pages/Cocinero/Dashboard";
import Home from "./pages/Home";
import Login from "./forms/Login";
import NoAccess from "./pages/NoAccess/index";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página Home */}
        <Route path="/" element={<Home />} />

        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida por rol: solo para admins */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida por rol: solo para meseros */}
        <Route
          path="/mesero/dashboard"
          element={
            <ProtectedRoute allowedRoles={["MESERO"]}>
              <MeseroDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida por rol: solo para cocineros */}
        <Route
          path="/cocinero/dashboard"
          element={
            <ProtectedRoute allowedRoles={["COCINERO"]}>
              <CocineroDashboard />
            </ProtectedRoute>
          }
        />

        {/* Página de acceso denegado */}
        <Route
          path="/no-access"
          element={<NoAccess />}
        />
      </Routes>
    </Router>
  );
};

export default App;
