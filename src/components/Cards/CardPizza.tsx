import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

// Parametros que componen la card, cantidad imagen, nombre
interface CardPizzaProps {
  nombre: string;
  imagen: string;
  disponibles: number;
}

const CardPizza: React.FC<CardPizzaProps> = ({ nombre, imagen, disponibles }) => {
  return (
    <Card
      sx={{
        maxWidth: 340,
        textAlign: "center",
        margin: "auto",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {nombre}
        </Typography>
        <CardMedia
          component="img"
          alt={nombre}
          height="250"
          image={imagen}
          sx={{ objectFit: "contain", marginTop: 2 }}
        />
        {/* Contenedor flex para Disponibles y la cantidad */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Disponibles:
          </Typography>
          <Typography
            variant="h5"
            component="span"
            sx={{ fontWeight: "bold", color: "black", marginLeft: 1 }}
          >
            {disponibles}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardPizza;
