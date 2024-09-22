import React from 'react';
import { Typography, Box } from '@mui/material';

const AdminDashboard: React.FC = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Typography 
        variant="h2" 
        sx={{ fontWeight: 'bold', color: '#333', fontFamily: 'Poppins, sans-serif' }}
      >
        Bienvenido Admin
      </Typography>
    </Box>
  );
};

export default AdminDashboard;