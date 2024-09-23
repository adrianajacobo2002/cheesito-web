import React from 'react';
import { Outlet } from 'react-router-dom'; // Importa Outlet para renderizar subcomponentes (Home, Mesas, etc.)
import CocineroNavbar from '../../layouts/CocineroNavbar';
import { Box } from '@mui/material';

const CocineroDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CocineroNavbar />
      {/* El contenido del Dashboard se renderiza al lado del Navbar */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Outlet mostrará los componentes hijos como Home, Mesas, etc. */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default CocineroDashboard;
