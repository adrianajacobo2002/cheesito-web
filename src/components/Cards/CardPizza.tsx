import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

// Parámetros que componen la card, nombre, imagen, disponibles, y onClick
interface CardPizzaProps {
  nombre: string;
  imagen: string;
  disponibles: number;
  onClick: () => void;  // Nuevo: Función que se ejecutará cuando se haga clic en la card
}

const CardPizza: React.FC<CardPizzaProps> = ({ nombre, imagen, disponibles, onClick }) => {
  return (
    <Card
      onClick={onClick}  // La card será clickeable y abrirá la modal cuando se haga clic
      sx={{
        width: '100%', // La card ocupa todo el ancho disponible
        textAlign: 'center',
        borderRadius: 2,
        boxShadow: 3,
        cursor: 'pointer',  // Cambiamos el cursor para indicar que la card es clickeable
        transition: 'transform 0.2s',  // Agregamos una transición para mejorar la experiencia visual
        '&:hover': {
          transform: 'scale(1.02)',  // Pequeño efecto al hacer hover
        },
      }}
    >
      <CardMedia
        component="img"
        alt={nombre}
        image={imagen}
        sx={{
          height: 140,  // Ajustamos la altura de la imagen para que todas las cards sean consistentes
          objectFit: 'contain',  // Cambiamos a 'contain' para que la imagen no se corte
          backgroundColor: 'white',  // Fondo para mejorar el aspecto si la imagen no llena la card
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {nombre}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Disponibles:
          </Typography>
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 'bold', color: 'black', marginLeft: 1 }}
          >
            {disponibles}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardPizza;
