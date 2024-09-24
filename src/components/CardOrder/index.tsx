import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

// Interfaces
interface Platillo {
  nombre: string;
}

interface DetalleOrden {
  id_detalle_orden: number;
  platillo: Platillo;
  cantidad: number;
  estado: string;
}

interface Orden {
  id_orden: number;
  mesa: { num_mesa: number };
  detalleOrden: DetalleOrden[];
}

interface OrdenesComponentProps {
  ordenes: Orden[];
  fetchOrdenes: () => void; // Nueva prop para volver a cargar las órdenes desde el padre
}

// Función para formatear el estado de la base de datos para mostrarlo
const formatearEstado = (estado: string) => {
  switch (estado) {
    case 'EN_PREPARACION':
      return 'En preparación';
    case 'LISTO':
      return 'Listo';
    default:
      return estado;
  }
};

// Función para obtener el color dinámico basado en el estado del platillo
const obtenerColorBoton = (estado: string) => {
  switch (estado) {
    case 'Listo':
      return '#51bfcc'; // Azul
    case 'En preparación':
      return '#f29f05'; // Naranja
    default:
      return '#bdbdbd'; // Gris para otros estados
  }
};

const OrdenesComponent: React.FC<OrdenesComponentProps> = ({ ordenes, fetchOrdenes }) => {

  const onActualizarEstado = async (id_detalle_orden: number, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'EN_PREPARACION' ? 'LISTO' : 'EN_PREPARACION';

    // Llamada al backend para actualizar el estado en la base de datos
    try {
      await axios.patch(`http://localhost:3000/api/ordenes/detalles/${id_detalle_orden}`, { estado: nuevoEstado });

      // Volver a cargar las órdenes desde el backend
      fetchOrdenes(); // Aquí volvemos a cargar las órdenes después de actualizar el estado
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <>
      {ordenes.map((orden: Orden) => (
        <Card 
          key={orden.id_orden} 
          sx={{
            width: '700px', // Ancho fijo de la card
            marginBottom: '20px', 
            padding: '20px', 
            borderRadius: '15px', // Bordes redondeados
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave
            backgroundColor: '#fff', // Fondo blanco
            minHeight: 'auto', // Card se adapta al contenido
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            {/* Mostrar el ID de la orden a la izquierda y el número de mesa a la derecha */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#333', 
                  fontFamily: 'Poppins, sans-serif' // Aplicar la fuente Poppins
                }}
              >
                Orden: #{orden.id_orden}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#333', 
                  fontFamily: 'Poppins, sans-serif' // Aplicar la fuente Poppins
                }}
              >
                Mesa: {orden.mesa.num_mesa}
              </Typography>
            </Box>

            {/* Tabla de detalles de la orden */}
            <Table sx={{ tableLayout: 'fixed', width: '100%' }}> {/* Elimina el ancho variable */}
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#888', fontFamily: 'Poppins, sans-serif' }}>Platillo</TableCell>
                  <TableCell sx={{ color: '#888', fontFamily: 'Poppins, sans-serif' }}>Cantidad</TableCell>
                  <TableCell sx={{ color: '#888', fontFamily: 'Poppins, sans-serif' }}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orden.detalleOrden.map((detalle: DetalleOrden) => (
                  <TableRow key={detalle.id_detalle_orden}>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{detalle.platillo.nombre}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{detalle.cantidad}</TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          backgroundColor: obtenerColorBoton(formatearEstado(detalle.estado)),
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: "bold",
                          color: 'white',
                          textTransform: 'none',
                          borderRadius: '10px', // Bordes redondeados para los botones
                          '&:hover': {
                            backgroundColor: obtenerColorBoton(formatearEstado(detalle.estado)),
                            opacity: 0.8
                          }
                        }}
                        onClick={() => onActualizarEstado(detalle.id_detalle_orden, detalle.estado)}
                      >
                        {formatearEstado(detalle.estado)}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default OrdenesComponent;
