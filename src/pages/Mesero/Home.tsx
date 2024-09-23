import React from 'react';
import { Box, Typography } from '@mui/material';

const MeseroHome = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <Typography variant="h2" sx={{ color: '#fe7f2d', marginBottom: '20px', fontWeight: 'bold' }}>
        Bienvenido Mesero
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '10px', color: '#333' }}>
        Aquí puedes gestionar tus mesas y órdenes del día.
      </Typography>
      {/* Puedes agregar más detalles o widgets según lo que necesites mostrar */}
    </Box>
  );
};

export default MeseroHome;
