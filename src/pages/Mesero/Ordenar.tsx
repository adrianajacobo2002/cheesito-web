import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Grid, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardPizzaMesero from '../../components/Cards/CardPizzaMesero';
import ResumenOrden from '../../components/ResumenOrden/ResumenOrden'; // Importar ResumenOrden

interface Platillo {
  id_platillos: number;
  nombre: string;
  precio: number;
  image_url: string;
}

interface Pizza {
  id_inventario: number;
  platillo_id: number;
  cantidad_disponible: number;
  platillo: Platillo;
}

interface Bebida {
  id_inventario: number;
  platillo_id: number;
  cantidad_disponible: number;
  platillo: Platillo;
}

interface DetalleOrden {
  id_detalle_orden: number;
  platillo: Platillo;
  cantidad: number;
  subtotal: number;
}

const MeseroOrdenar: React.FC = () => {
  const { id_orden } = useParams<{ id_orden: string }>(); // Captura id_orden de la URL
  const [pizzasDisponibles, setPizzasDisponibles] = useState<Pizza[]>([]);
  const [bebidasDisponibles, setBebidasDisponibles] = useState<Bebida[]>([]);
  const [tabValue, setTabValue] = useState<number>(0); // Controlar el tab activo
  const [detallesOrden, setDetallesOrden] = useState<DetalleOrden[]>([]); // Detalles de la orden
  const [fechaActual, setFechaActual] = useState<string>("");

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    setFechaActual(fechaFormateada);
  };

  // Función para cargar las pizzas desde la API
  const fetchPizzas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/inventario/pizzas/disponibles');
      setPizzasDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener las pizzas disponibles:', error);
    }
  };

  // Función para cargar las bebidas desde la API
  const fetchBebidas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/inventario/bebidas/disponibles');
      setBebidasDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener las bebidas disponibles:', error);
    }
  };

  // Función para cargar los detalles de la orden
  const fetchDetallesOrden = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/ordenes/${id_orden}`);
      setDetallesOrden(response.data.detalleOrden); // Actualiza los detalles de la orden
    } catch (error) {
      console.error('Error al obtener los detalles de la orden:', error);
    }
  };

  // Llama a las APIs cuando el componente se monta
  useEffect(() => {
    obtenerFechaActual();
    fetchPizzas();
    fetchBebidas();
    fetchDetallesOrden(); // Obtener los detalles de la orden al cargar la página
  }, []);

  // Función para eliminar un detalle de la orden
  const handleDeleteDetalle = async (id_detalle_orden: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/ordenes/detalles/${id_detalle_orden}`);
      // Actualizar la lista de detalles después de eliminar
      setDetallesOrden((prevDetalles) => prevDetalles.filter((detalle) => detalle.id_detalle_orden !== id_detalle_orden));

      // Actualizar el stock después de la eliminación
      fetchPizzas();
      fetchBebidas();
    } catch (error) {
      console.error('Error al eliminar el detalle:', error);
      alert('Hubo un problema al eliminar el detalle');
    }
  };

  // Cambiar entre Tabs
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  // Función para agregar un producto a la orden y actualizar el stock localmente
  const agregarProductoAOrden = async (platillo_id: number, cantidad: number, tipo: 'pizza' | 'bebida') => {
    if (cantidad > 0) {
      try {
        const detalles = [{ platillo_id, cantidad }];
        await axios.post(`http://localhost:3000/api/ordenes/${id_orden}/platillos`, { detalles });

        // Actualizar el stock localmente
        if (tipo === 'pizza') {
          setPizzasDisponibles((prevPizzas) =>
            prevPizzas.map((pizza) =>
              pizza.platillo_id === platillo_id
                ? { ...pizza, cantidad_disponible: pizza.cantidad_disponible - cantidad }
                : pizza
            )
          );
        } else if (tipo === 'bebida') {
          setBebidasDisponibles((prevBebidas) =>
            prevBebidas.map((bebida) =>
              bebida.platillo_id === platillo_id
                ? { ...bebida, cantidad_disponible: bebida.cantidad_disponible - cantidad }
                : bebida
            )
          );
        }

        // Actualizar los detalles de la orden después de agregar un producto
        fetchDetallesOrden();

      } catch (error) {
        console.error('Error al agregar el producto a la orden:', error);
        alert('Hubo un problema al agregar el producto');
      }
    } else {
      alert('La cantidad debe ser mayor a 0');
    }
  };

  return (
    <Box sx={{ display: 'flex', padding: '20px', fontFamily: 'Poppins, sans-serif' }}> {/* Añadido Poppins */}
      {/* Sección izquierda - Lista de Pizzas/Bebidas */}
      <Box sx={{ flex: 3, marginRight: '20px' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#fe7f2d', fontFamily: 'QuickSand, sans-serif' }}>
          Ordenar
        </Typography>
        <Typography sx={{ marginBottom: "20px", fontWeight: "light", color: "#666", textAlign: 'left', fontFamily: 'Poppins, sans-serif' }}>
          {fechaActual} {/* Aquí se muestra la fecha actual */}
        </Typography>
        <Divider sx={{ marginBottom: '20px' }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        {/* Alinear Tabs a la izquierda */}
        <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered={false}
            TabIndicatorProps={{
            style: { backgroundColor: '#fe7f2d' }, // Cambia el color del indicador a naranjita
            }}
        >
            <Tab
            label="Pizzas"
            sx={{
                color: tabValue === 0 ? '#fe7f2d' : '#000', // Cambia el color del texto cuando el Tab está activo
                fontFamily: 'Poppins, sans-serif', // Aplica la fuente Poppins
                fontWeight: 'bold',
                '&.Mui-selected': { color: '#fe7f2d' }, // Asegura que el tab seleccionado tenga el color correcto
            }}
            />
            <Tab
            label="Bebidas"
            sx={{
                color: tabValue === 1 ? '#fe7f2d' : '#000', // Cambia el color del texto cuando el Tab está activo
                fontFamily: 'Poppins, sans-serif', // Aplica la fuente Poppins
                fontWeight: 'bold',
                '&.Mui-selected': { color: '#fe7f2d' }, // Asegura que el tab seleccionado tenga el color correcto
            }}
            />
        </Tabs>
        </Box>

        <Divider sx={{ marginBottom: '20px' }} />

        {/* Contenido del Tab seleccionado */}
        {tabValue === 0 && (
          <Grid container spacing={2}>
            {pizzasDisponibles.map((pizza) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.platillo.id_platillos}>
                <CardPizzaMesero
                  nombre={pizza.platillo.nombre}
                  precio={pizza.platillo.precio}
                  availableUnits={pizza.cantidad_disponible}
                  imageUrl={`http://localhost:3000/uploads/${pizza.platillo.image_url}`}
                  onAddToOrder={(cantidad: number) => {
                    agregarProductoAOrden(pizza.platillo.id_platillos, cantidad, 'pizza');
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={2}>
            {bebidasDisponibles.map((bebida) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={bebida.platillo.id_platillos}>
                <CardPizzaMesero
                  nombre={bebida.platillo.nombre}
                  precio={bebida.platillo.precio}
                  availableUnits={bebida.cantidad_disponible}
                  imageUrl={`http://localhost:3000/uploads/${bebida.platillo.image_url}`}
                  onAddToOrder={(cantidad: number) => {
                    agregarProductoAOrden(bebida.platillo.id_platillos, cantidad, 'bebida');
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Sección derecha - Resumen de la orden */}
      <ResumenOrden detallesOrden={detallesOrden} onDeleteDetalle={handleDeleteDetalle} />
    </Box>
  );
};

export default MeseroOrdenar;
