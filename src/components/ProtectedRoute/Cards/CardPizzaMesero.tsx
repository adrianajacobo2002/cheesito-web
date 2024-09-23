import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Button, TextField } from "@mui/material";

// Definimos las props que aceptará el componente
interface CardPizzaMeseroprops {
  name: string;
  price: number;
  availableUnits: number;
  imageUrl: string;
}

const CardPizzaMesero: React.FC<CardPizzaMeseroprops> = ({ name, price, availableUnits, imageUrl }) => {
  const [quantity, setQuantity] = useState<number>(1);  // Estado tipado con número

  const handleIncrease = (): void => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 340,
        textAlign: "center",
        margin: "auto",
        borderRadius: 3,
        boxShadow: 3,
        padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}  {/* Nombre pizza props */}
        </Typography>
        <CardMedia
          component="img"
          alt={name}
          height="180"
          image={imageUrl}  //imagen que se necesite usar 
          sx={{ objectFit: "contain", marginTop: 2 }}
        />
        <Typography variant="h6" component="div" color="#fe7f2d" gutterBottom>
          ${price.toFixed(2)}  {/* Precio de la pizza desde props */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography
            component="span"
            sx={{ fontWeight: "bold", color: "#fe7f2d", marginRight: 1 }}
          >
            {availableUnits}  {/* Cantidad disponible desde props */}
          </Typography>
          unidades disponibles
        </Typography>

        {/* Contenedor para los botones de cantidad y el campo del número */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fe7f2d", 
              color: "white",
            }}
            onClick={handleDecrease}
          >
            -
          </Button>
          <TextField
            value={quantity}
            inputProps={{ style: { textAlign: 'center' } }}
            sx={{
              width: 50,
              '& .MuiInputBase-input': { padding: '0.5rem' },
            }}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fe7f2d", 
              color: "white",
            }}
            onClick={handleIncrease}
          >
            +
          </Button>
        </Box>

        {/* Botón de Agregar */}
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, backgroundColor: "#fe7f2d", fontWeight: "bold", color: "white" }}
        >
          AGREGAR
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardPizzaMesero;
