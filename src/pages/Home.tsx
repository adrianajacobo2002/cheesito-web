import { Container, Button, Typography, Box } from '@mui/material';
import './Home.css';
import PizzaImage from '../assets/img/Pizza.png'; // Ajustar la imagen importada

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        height="100vh"
        sx={{
          flexDirection: { xs: 'column', md: 'row' }, // Responsivo
          textAlign: { xs: 'center', md: 'left' }, // Centrar en pantallas pequeñas
        }}
      >
        {/* Texto del lado izquierdo */}
        <Box>
          <Typography variant="h1" color="primary" className="brand-name">
            Cheesito
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Donde el queso nunca falta
          </Typography>
          <Button 
            variant="contained" 
            color="warning" 
            sx={{ mt: 2, textTransform: 'none', borderRadius: '20px' }} 
            href="#menu"
          >
            Empezar →
          </Button>
        </Box>

        {/* Imagen de la pizza del lado derecho */}
        <Box 
          sx={{ 
            position: 'relative', 
            width: { xs: '100%', md: '50%' }, // Responsivo 
            display: 'flex', 
            justifyContent: 'center'
          }}
        >
          <img 
            src={PizzaImage} 
            alt="Pizza" 
            className="pizza-image" 
            style={{ width: '80%', maxWidth: '400px', height: 'auto' }} 
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
