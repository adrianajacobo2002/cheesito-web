import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

// Definir las propiedades que el componente aceptará
interface CardListoProps {
  pizzaName: string;
  pizzaImage: string;
  price: string;
  quantity: number;
  onButtonClick: () => void;
}

const CardListo: React.FC<CardListoProps> = ({ pizzaName, pizzaImage, price, quantity, onButtonClick }) => {
  return (
    <div>
      <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2, maxWidth: 345, position: 'relative' }}>
        
        {/* Imagen de la pizza */}
        <CardMedia
          component="img"
          image={pizzaImage}
          alt={pizzaName}
          sx={{ width: 90, height: 90, borderRadius: '20%', backgroundColor: '#ffc49e', margin: '0', padding: '10px' }}
        />
        
        {/* Contenido del texto: nombre, precio, cantidad */}
        <CardContent sx={{ marginLeft: 2 }}>
          <Typography variant="h6" component="div">
            {pizzaName}
          </Typography>
          <Typography variant="body1" color="#fe7f2d" sx={{ fontWeight: 'bold' }}>
            ${price}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Cantidad: {quantity}
          </Typography>
        </CardContent>

        {/* Botón "Listo" en la esquina superior derecha */}
        <Button 
          onClick={onButtonClick}
          sx={{ position: 'absolute', top: 8, right: 8, background:'#51bfcc', color:'white', fontWeight: 'bold', borderRadius:'20px' }}
        >
          Listo
        </Button>
      </Card>
    </div>
  );
};

export default CardListo;
