import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import AdminDashboard from "./pages/Admin/Dashboard";
import MeseroDashboard from "./pages/Mesero/Dashboard";
import CocineroDashboard from "./pages/Cocinero/Dashboard";
import Home from "./pages/Home";
import Login from "./forms/Login";
import NoAccess from "./pages/NoAccess/index";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import AdminHome from './pages/Admin/Home';
import AdminMesas from './pages/Admin/Mesas';
import AdminPlatillos from './pages/Admin/Platillos';
import AdminOrdenes from './pages/Admin/Ordenes';


import MeseroHome from './pages/Mesero/Home';
import MeseroOrdenes from './pages/Mesero/Ordenes';
import MeseroOrdenar from './pages/Mesero/Ordenar'

import CocineroHome from './pages/Cocinero/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página Home */}
        <Route path="/" element={<Home />} />

        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login/>} />

        {/* Ruta protegida por rol: solo para admins */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Redireccionar por defecto desde /admin a /admin/home */}
          <Route path="" element={<Navigate to="home" />} />
          
          <Route path="home" element={<AdminHome />} />
          <Route path="mesas" element={<AdminMesas />} />
          <Route path="platillos" element={<AdminPlatillos />} />
          <Route path="ordenes" element={<AdminOrdenes />} />

        </Route>

        {/* Ruta protegida por rol: solo para meseros */}
        <Route
          path="/mesero"
          element={
            <ProtectedRoute allowedRoles={["MESERO"]}>
              <MeseroDashboard />
            </ProtectedRoute>
          }
        >
          {/* Redireccionar por defecto desde /admin a /admin/home */}
          <Route path="" element={<Navigate to="home" />} />
          
          <Route path="home" element={< MeseroHome />} />
          <Route path="ordenes" element={<MeseroOrdenes />} />
          <Route path="ordenar/:id_orden" element={<MeseroOrdenar />} />

        </Route>

        {/* Ruta protegida por rol: solo para cocineros */}
        <Route
          path="/cocinero"
          element={
            <ProtectedRoute allowedRoles={["COCINERO"]}>
              <CocineroDashboard />
            </ProtectedRoute>
          }
        >
          {/* Redireccionar por defecto desde /admin a /admin/home */}
          <Route path="" element={<Navigate to="home" />} />
          
          <Route path="home" element={< CocineroHome />} />

        </Route>

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
