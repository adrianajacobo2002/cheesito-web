import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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

      {/* Botón de Logout */}
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginTop: '20px' }} 
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default AdminDashboard;