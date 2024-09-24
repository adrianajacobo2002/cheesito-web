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

// Obtener bebidas disponibles
export const getBebidasDisponibles = async () => {
  try {
    const response = await api.get('/inventario/bebidas/disponibles');
    return response.data;
  } catch (error) {
    console.error('Error fetching available drinks:', error);
    throw error;
  }
};

// Crear un nuevo platillo
export const createPlatillo = async (formData: FormData) => {
  try {
    const response = await api.post('/platillos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Indica que se está enviando un archivo
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating platillo:', error);
    throw error;
  }
};


// Actualizar la cantidad en el inventario
export const updateCantidadStock = async (id_inventario: number, cantidad: number) => {
  try {
    const response = await api.put(`/inventario/producto/${id_inventario}`, {
      cantidad,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};