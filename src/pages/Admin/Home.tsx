import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importamos el hook para navegar
import CardPizza from '../../components/Cards/CardPizza';
import CardNoDisponible from '../../components/Cards/CardNoDisponible';
import { getPizzasDisponibles, getPizzasFueraStock } from '../../services/apiService';

const AdminHome: React.FC = () => {
  const [pizzasDisponibles, setPizzasDisponibles] = useState<any[]>([]);
  const [pizzasFueraStock, setPizzasFueraStock] = useState<any[]>([]);
  const navigate = useNavigate(); // Hook para redirigir al usuario a otra página

  useEffect(() => {
    const fetchPizzasDisponibles = async () => {
      try {
        const disponibles = await getPizzasDisponibles();
        setPizzasDisponibles(disponibles);
      } catch (error) {
        console.error('Error fetching available pizzas', error);
      }
    };

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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido Admin
      </Typography>

      {/* Sección de pizzas disponibles */}
      <Typography variant="h6" gutterBottom>
        Disponibles en Stock
      </Typography>
      <Grid container spacing={3}>
        {pizzasDisponibles.slice(0, 5).map((pizza) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={pizza.platillo.id_platillos}>
            <CardPizza
              nombre={pizza.platillo.nombre}
              imagen={`http://localhost:3000/uploads/${pizza.platillo.image_url}`}
              disponibles={pizza.cantidad_disponible}
            />
          </Grid>
        ))}
      </Grid>

      {/* Botón "Ver más" que redirige a la página de platillos */}
      {pizzasDisponibles.length > 5 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/platillos')} // Redirigir a la nueva página de platillos
          >
            Ver más
          </Button>
        </Box>
      )}

      {/* Sección de pizzas fuera de stock */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Fuera de Stock
      </Typography>
      <Grid container spacing={3}>
        {pizzasFueraStock.map((pizza) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={pizza.platillo.id_platillos}>
            <CardNoDisponible
              pizzaName={pizza.platillo.nombre}
              pizzaImage={`http://localhost:3000/uploads/${pizza.platillo.image_url}`}
              availability="No disponible"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminHome;
