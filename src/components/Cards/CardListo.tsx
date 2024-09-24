import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

// Definir las propiedades que el componente aceptará
interface CardListoProps {
  pizzaName: string;
  pizzaImage: string;
  price: number;
  quantity: number;
  estado: string; // Estado de la orden
  onButtonClick: () => void;
}

const CardListo: React.FC<CardListoProps> = ({ pizzaName, pizzaImage, price, quantity, estado, onButtonClick }) => {
  // Función para formatear el estado
  const formatearEstado = (estado: string) => {
    return estado === 'EN_PREPARACION' ? 'En preparación' : 'Listo';
  };

  // Función para obtener el color dinámico basado en el estado del platillo
  const obtenerColorBoton = (estado: string) => {
    return estado === 'EN_PREPARACION' ? '#f29f05' : '#51bfcc'; // Naranja para 'En preparación', Azul para 'Listo'
  };

  return (
    <div>
      <Card sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: 2, 
        borderRadius: 2, 
        width: '100%', // Ocupa todo el ancho del contenedor
        position: 'relative',
        boxShadow: 3
      }}>
        {/* Imagen de la pizza */}
        <CardMedia
          component="img"
          image={pizzaImage}
          alt={pizzaName}
          sx={{ 
            width: 90, 
            height: 90, 
            borderRadius: '20%', 
            backgroundColor: '#ffc49e', 
            marginRight: '10px', 
            padding: '10px' 
          }}
        />

        {/* Contenido del texto: nombre, precio, cantidad */}
        <CardContent sx={{ flexGrow: 1 }}> {/* Usar flexGrow para que ocupe el espacio restante */}
          <Typography variant="body1" component="div" fontFamily={"Poppins, sans-serif"} sx={{ fontWeight: 'bold' }}>
            {pizzaName}
          </Typography>
          <Typography variant="body2" fontFamily={"Poppins, sans-serif"} color="#fe7f2d" sx={{ fontWeight: 'bold' }}>
            ${price ? price.toFixed(2) : "0.00"} {/* Validamos si 'price' está disponible */}
          </Typography>
          <Typography variant="body2" fontFamily={"Poppins, sans-serif"} sx={{ fontWeight: 'bold' }}>
            Cantidad: {quantity}
          </Typography>
        </CardContent>

        {/* Botón dinámico que muestra el estado */}
        <Button
          onClick={onButtonClick}
          sx={{ 
            backgroundColor: obtenerColorBoton(estado), 
            color: 'white', 
            fontWeight: 'bold', 
            borderRadius: '20px',
            paddingX: '10px', // Reducir el padding horizontal
            height: '30px', // Reducir la altura del botón
            textTransform: 'none', // Desactivar mayúsculas
            fontSize: '12px', // Reducir el tamaño del texto
            position: 'absolute', // Posicionamiento
            top: 10,
            right: 10
          }}
        >
          {formatearEstado(estado)}
        </Button>
      </Card>
    </div>
  );
};

export default CardListo;
