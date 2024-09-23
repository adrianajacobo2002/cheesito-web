import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CardPizza from '../../components/Cards/CardPizza';
import { getPizzasDisponibles, getPizzasFueraStock } from '../../services/apiService';

const AdminHome: React.FC = () => {
  const [pizzasDisponibles, setPizzasDisponibles] = useState<any[]>([]);
  const [pizzasFueraStock, setPizzasFueraStock] = useState<any[]>([]);

  useEffect(() => {
    // Fetch pizzas disponibles
    const fetchPizzasDisponibles = async () => {
      try {
        const disponibles = await getPizzasDisponibles();
        setPizzasDisponibles(disponibles);
      } catch (error) {
        console.error('Error fetching available pizzas', error);
      }
    };

    // Fetch pizzas fuera de stock
    const fetchPizzasFueraStock = async () => {
      try {
        const fueraStock = await getPizzasFueraStock();
        setPizzasFueraStock(fueraStock);
      } catch (error) {
        console.error('Error fetching out of stock pizzas', error);
      }
    };

    fetchPizzasDisponibles();
    fetchPizzasFueraStock();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bienvenido Admin
      </Typography>

      {/* Sección de pizzas disponibles */}
      <Typography variant="h6" gutterBottom>
        Disponibles en Stock
      </Typography>
      <Grid container spacing={2}>
        {pizzasDisponibles.map((pizza) => (
          <Grid item xs={12} sm={6} md={3} key={pizza.platillo.id_platillos}>
            <CardPizza
              nombre={pizza.platillo.nombre}
              imagen={`http://localhost:3000/uploads/${pizza.platillo.image_url}`}
              disponibles={pizza.cantidad_disponible}
            />
          </Grid>
        ))}
      </Grid>

      {/* Sección de pizzas fuera de stock */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Fuera de Stock
      </Typography>
      <Grid container spacing={2}>
        {pizzasFueraStock.map((pizza) => (
          <Grid item xs={12} sm={6} md={3} key={pizza.platillo.id_platillos}>
            <CardPizza
              nombre={pizza.platillo.nombre}
              imagen={`http://localhost:3000/uploads/${pizza.platillo.image_url}`}
              disponibles={pizza.cantidad_disponible}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminHome;
