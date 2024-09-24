import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

// Definir las propiedades que el componente acepta
interface CardNoDisponibleProps {
  pizzaName: string;
  pizzaImage: string;
  availability: string;
}

const CardNoDisponible: React.FC<CardNoDisponibleProps> = ({ pizzaName, pizzaImage, availability }) => {
  return (
    <Card
      sx={{
        width: '100%', // La card ocupa todo el ancho disponible
        textAlign: 'center',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        alt={pizzaName}
        image={pizzaImage}
        sx={{
          height: 140, // Ajustamos la altura de la imagen
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {pizzaName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          {availability}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardNoDisponible;
