import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

// Definir las propiedades que el componente acepta
interface CardNoDisponibleProps {
  pizzaName: string;
  pizzaImage: string;
  availability: string;
  onClick: () => void;
}

const CardNoDisponible: React.FC<CardNoDisponibleProps> = ({ pizzaName, pizzaImage, availability, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#f5f5f5', // Fondo gris claro
          borderRadius: 2,
          width: '100%', // Ancho estático
          height: 120, // Alto estático
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          image={pizzaImage} // Imagen de la pizza recibida como prop
          alt={pizzaName}
          sx={{
            width: 80, // Ancho estático de la imagen
            height: 80, // Alto estático de la imagen
            borderRadius: '50%', // Imagen redondeada
            objectFit: 'cover',
            fontWeight: 'bold', // Asegurar que la imagen se ajuste bien dentro del contenedor
          }}
        />
        <CardContent sx={{ marginLeft: 2 }}>
          <Typography variant="body1" component="div">
            {pizzaName} {/* Nombre de la pizza */}
          </Typography>
          <Typography
            variant="body2"
            color="#d50000"
          >
            {availability} {/* Estado de disponibilidad */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardNoDisponible;
