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
    <div>
      <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2, maxWidth: 345 }}>
        <CardMedia
          component="img"
          image={pizzaImage}  // Imagen de la pizza recibida como prop
          alt={pizzaName}
          sx={{ width: 80, height: 80, borderRadius: '50%' }}  // Estilo redondeado para la imagen
        />
        <CardContent sx={{ marginLeft: 2 }}>
          <Typography variant="h6" component="div">
            {pizzaName}  {/* Nombre de la pizza */}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            {availability}  {/* Disponibilidad de la pizza */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardNoDisponible;
