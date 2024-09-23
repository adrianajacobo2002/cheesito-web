import { TextField, Button, Typography, Paper } from '@mui/material';
import React from 'react';
import '../../App.css'; // Ruta de app.css 

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después del login
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { user, password });
      const { token } = response.data;  // Obtener el token del backend en la respuesta
  
      // Guardar el token en localStorage
      localStorage.setItem('token', token);
  
      // Decodificar el token para obtener el rol
      const decodedToken: any = jwtDecode(token);
  
      // Redirigir al dashboard basado en el rol del usuario decodificado
      if (decodedToken.role === 'ADMIN') {
        navigate('/admin');
      } else if (decodedToken.role === 'MESERO') {
        navigate('/mesero/dashboard');
      } else if (decodedToken.role === 'COCINERO') {
        navigate('/cocinero/dashboard');
      }
    } catch (error) {
      setErrorMessage('Usuario o contraseña incorrectos');
      console.error('Error en el login:', error);
    }
  };

  return (
    <div style={styles.container}>
      <Paper 
        elevation={3} 
        sx={{ 
          paddingY: '40px',
          paddingX: '70px',  // Más padding para un aspecto espacioso
          borderRadius: '15px',  // Bordes redondeados más pronunciados
          width: '100%', 
          maxWidth: '450px',  // Tamaño máximo más ancho
          textAlign: 'center'  // Centrar el contenido del texto
        }}
      >
        <div style={styles.formContent}>
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              color: '#fe7f2d', 
              fontFamily: 'QuickSand, sans-serif',
              fontSize: '2.5rem',  // Ajuste del tamaño del texto
              marginBottom: '20px'  // Espacio debajo del título
            }}
          >
            Bienvenido
          </Typography>

          {errorMessage && (
            <Typography color="error" sx={{ marginBottom: '20px' }}>
              {errorMessage}
            </Typography>
          )}

          <TextField
            id='user'
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            color="warning"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            sx={{ marginBottom: 3, fontFamily: 'Poppins, sans-serif', backgroundColor: '#fff' }}  
          />
          <TextField
            id='password'
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            margin="normal"
            color = "warning"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 4, fontFamily: 'Poppins, sans-serif', backgroundColor: '#fff' }}  
          />
          <Button 
            variant="contained" 
            color="warning"  // Botón naranja
            fullWidth 
            onClick={handleLogin}
            sx={{ 
              padding: '12px', 
              backgroundColor: '#fe7f2d', 
              ':hover': { backgroundColor: '#fe7f2d' }, 
              fontFamily: 'Poppins, sans-serif',
              borderRadius: '15px',  // Botón con bordes más redondeados
              fontSize: '1rem',  // Tamaño de fuente ajustado
              textTransform: 'none'
            }}  
          >
            Iniciar Sesión
          </Button>
        </div>
      </Paper>
    </div>
  );
};

// Asegúrate de definir correctamente el tipo para los estilos
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // Ocupar todo el alto de la ventana
    width: '100vw',  // Ocupar todo el ancho de la ventana
    backgroundColor: '#bfbfbf',  // Fondo gris completo
    padding: 0,
    margin: 0,  // Eliminar márgenes
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Login;
