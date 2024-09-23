import React from 'react';
import { Box, Toolbar, CssBaseline, Button } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'; // Mueve useNavigate aquí
import HomeIcon from '@mui/icons-material/Home';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate(); // useNavigate debe estar dentro del componente funcional

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const NAVIGATION = [
    {
      segment: 'home',
      title: 'Inicio',
      icon: <HomeIcon />,
      linkComponent: (props: any) => <NavLink {...props} to="/admin/home" />, // Prefijo /admin
    },
    {
      segment: 'mesas',
      title: 'Mesas',
      icon: <TableRestaurantIcon />,
      linkComponent: (props: any) => <NavLink {...props} to="/admin/mesas" />, // Prefijo /admin
    },
    {
      segment: 'platillos',
      title: 'Platillos',
      icon: <RestaurantMenuIcon />,
      linkComponent: (props: any) => <NavLink {...props} to="/admin/platillos" />, // Prefijo /admin
    },
    {
      segment: 'ordenes',
      title: 'Órdenes',
      icon: <ShoppingCartIcon />,
      linkComponent: (props: any) => <NavLink {...props} to="/admin/ordenes" />, // Prefijo /admin
    },
    {
      segment: 'logout',
      title: 'Cerrar Sesión',
      icon: <ExitToAppIcon />,
      linkComponent: () => (
        <Button onClick={handleLogout} sx={{ color: 'var(--naranjita)' }}>
          Cerrar Sesión
        </Button>
      ),
    },
  ];
  

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI Logo" />,
        title: 'Panel de Control',
      }}
    >
      <CssBaseline />
      <DashboardLayout>
        <Toolbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}
        >
          {/* Asegúrate de que el Outlet está aquí */}
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
};

export default AdminDashboard;
