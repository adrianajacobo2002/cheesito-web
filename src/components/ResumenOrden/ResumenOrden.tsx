import React from 'react';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import CardOrden from '../Cards/CardOrden'; // Importamos el componente de la tarjeta

interface Platillo {
  nombre: string;
  precio: number;
  image_url: string;
}

interface DetalleOrden {
  id_detalle_orden: number;
  platillo: Platillo;
  cantidad: number;
  subtotal: number;
}

interface ResumenOrdenProps {
  detallesOrden: DetalleOrden[]; // Detalles de la orden
  onDeleteDetalle: (id_detalle_orden: number) => void; // Función para eliminar un detalle
}

const ResumenOrden: React.FC<ResumenOrdenProps> = ({ detallesOrden, onDeleteDetalle }) => {
  const navigate = useNavigate(); // Inicializamos useNavigate

  // Calcular el subtotal sumando todos los subtotales de los productos en la orden
  const calcularSubtotal = () => {
    return detallesOrden
      .reduce((total, detalle) => total + detalle.subtotal, 0)
      .toFixed(2); // Retorna el subtotal formateado a 2 decimales
  };

  // Función para manejar el clic en el botón "Ordenar"
  const handleOrder = () => {
    // Redirigir a la página de MeseroHome
    navigate('/mesero/home'); // Redirige a la ruta de MeseroHome
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: 3,
        borderRadius: '15px',
        position: 'sticky',
        top: '20px',
        height: 'calc(100vh - 40px)',
        marginLeft: 'auto',
        maxWidth: 600,
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
        Detalle de la Orden
      </Typography>

      <Divider sx={{ marginBottom: '20px' }} />

      {/* Contenedor scrolleable para toda el área */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: '20px',
        }}
      >
        {/* Listado de detalles de la orden */}
        <Grid container direction="column" spacing={2}>
          {detallesOrden.map((detalle) => (
            <Grid item key={detalle.id_detalle_orden}>
              <Box sx={{ fontFamily: 'Poppins, sans-serif' }}>
                <CardOrden
                  pizzaName={detalle.platillo.nombre}
                  pizzaImage={`http://localhost:3000/uploads/${detalle.platillo.image_url}`}
                  price={detalle.platillo.precio.toFixed(2)}
                  quantity={detalle.cantidad}
                  onDelete={() => onDeleteDetalle(detalle.id_detalle_orden)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mostrar el subtotal */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', marginTop: 'auto', textAlign: 'right', paddingBottom: "15px"}}>
        Subtotal: ${calcularSubtotal()}
      </Typography>

      {/* Botón para finalizar la orden */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop: '10px',
          backgroundColor: '#fe7f2d',
          fontWeight: 'bold',
          color: 'white',
          fontFamily: 'Poppins, sans-serif'
        }}
        onClick={handleOrder}
      >
        Ordenar
      </Button>
    </Box>
  );
};

export default ResumenOrden;
