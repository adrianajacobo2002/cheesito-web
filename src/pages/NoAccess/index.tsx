import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import noAccessImg from '../../assets/img/noAccess.png';
import '../../App.css'; 

const NoAccess: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {

    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken.role === 'ADMIN') {
        navigate('/admin');
      } else if (decodedToken.role === 'MESERO') {
        navigate('/mesero');
      } else if (decodedToken.role === 'COCINERO') {
        navigate('/cocinero');
      } 
    } else {
      navigate('/');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        height: '100vh', 
        padding: '0 7rem', 
        backgroundColor: '#ffffff'
      }}
    >
      {/* Contenedor del mensaje y el botón */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'flex-start',
          paddingRight: '2rem',
          paddingInlineStart: '50px' 
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#fe7f2d', 
            fontFamily: 'QuickSand, sans-serif',
            fontSize: '7rem',
            marginBottom: '20px' 
          }}
        >
          ¡Oops!
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#333', 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '1.2rem', 
            marginBottom: '20px',
            fontWeight: 'bold'
          }}
        >
          Parece que no deberías estar aquí :P
        </Typography>
        <Button 
          variant="contained" 
          color="warning"
          onClick={handleBack}
          sx={{ 
            padding: '10px 50px', 
            backgroundColor: '#fe7f2d',
            textTransform: 'none',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1rem',
            borderRadius: '15px',
            ':hover': { backgroundColor: '#ff8c42' } 
          }}
        >
          Regresar
        </Button>
      </Box>

      {/* Contenedor de la imagen */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <img 
          src={noAccessImg} 
          alt="No Access" 
          style={{ 
            maxWidth: '75%',
            height: 'auto' 
          }}
        />
      </Box>
    </Box>
  );
};

export default NoAccess;
