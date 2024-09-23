import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Definir las propiedades que el componente acepta
interface CardOrdenProps {
  pizzaName: string;
  pizzaImage: string;
  price: string;
  quantity: number;
  onDelete: () => void;
}

const CardOrden: React.FC<CardOrdenProps> = ({ pizzaName, pizzaImage, price, quantity, onDelete }) => {
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

        {/* Icono de eliminar en la esquina superior derecha */}
        <IconButton 
          onClick={onDelete} 
          sx={{ position: 'absolute', top: 8, right: 8, color: '#fe7f2d' }}
        >
          <DeleteIcon />
        </IconButton>
      </Card>
    </div>
  );
};

export default CardOrden;
