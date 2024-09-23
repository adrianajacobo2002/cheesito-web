import React from 'react';
import { Box, Typography } from '@mui/material';

const CocineroHome = () => {
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
        Bienvenido Chef
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '10px', color: '#333' }}>
        Administra las órdenes que están en preparación.
      </Typography>
    </Box>
  );
};

export default CocineroHome;
