import { TextField, Button, Typography, Paper } from '@mui/material';
import React from 'react';
import '../../App.css'; // Ruta de app.css 
const Login = () => {
  return (
    <div style={styles.container}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 10, 
          borderRadius: 7, 
          width: '100%', 
          maxWidth: '600px'  // Limita el ancho del formulario
        }}
      >
        <div style={styles.formContent}>
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              color: '#ff8c42', 
              fontFamily: 'Poppins, sans-serif'  
            }}
          >
            Bienvenido
          </Typography>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ marginBottom: 3, fontFamily: 'Poppins, sans-serif' }}  
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            margin="normal"
            sx={{ marginBottom: 4, fontFamily: 'Poppins, sans-serif' }}  
          />
          <Button 
            variant="contained" 
            color="warning"  // Botón naranja
            fullWidth 
            sx={{ padding: '10px', 
              backgroundColor: '#fe7f2d', 
              ':hover': { backgroundColor: '#fe7f2d' }, 
              fontFamily: 'Poppins, sans-serif' }}  
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
    height: '100vh',  
    width: '100vw',  // Asegura que ocupa todo el ancho del viewport
    backgroundColor: '#bfbfbf',  // Fondo gris completo
    marginTop: -40,
    marginBottom: -40,
    marginLeft: -352,
    marginRight: 20,
    padding: 0,
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Login;
