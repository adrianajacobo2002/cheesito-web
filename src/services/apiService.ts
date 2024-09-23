import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base de tu backend
});

export const getPizzasDisponibles = async () => {
  try {
    const response = await api.get('/inventario/pizzas/disponibles');
    return response.data;
  } catch (error) {
    console.error('Error fetching available pizzas', error);
    throw error;
  }
};

export const getPizzasFueraStock = async () => {
  try {
    const response = await api.get('/inventario/pizzas/fuera-stock');
    return response.data;
  } catch (error) {
    console.error('Error fetching out of stock pizzas', error);
    throw error;
  }
};
