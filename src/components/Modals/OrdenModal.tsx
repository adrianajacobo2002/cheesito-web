import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Orden {
  id_orden: number;
  fecha: string;
  nombre_cliente: string;
  mesa: {
    num_mesa: number;
  };
  detalleOrden: {
    platillo: {
      nombre: string;
    };
    cantidad: number;
    subtotal: number;
  }[];
}

interface OrdenModalProps {
  open: boolean;
  orden: Orden | null;
  onClose: () => void;
}

// Función para calcular el subtotal
const calcularSubtotal = (orden: Orden) => {
  return orden.detalleOrden.reduce((total, detalle) => total + detalle.subtotal, 0);
};

// Función para calcular la propina
const calcularPropina = (subtotal: number) => {
  return subtotal * 0.1; // 10% de propina
};

// Función para calcular el total
const calcularTotal = (subtotal: number, propina: number) => {
  return subtotal + propina;
};

const OrdenModal: React.FC<OrdenModalProps> = ({ open, orden, onClose }) => {
  if (!orden) {
    return null;
  }

  const subtotal = calcularSubtotal(orden);
  const propina = calcularPropina(subtotal);
  const total = calcularTotal(subtotal, propina);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: '30px',
          backgroundColor: 'white',
          margin: 'auto',
          marginTop: '5%',
          maxWidth: '600px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Título */}
        <Typography
          variant="h4"
          sx={{
            color: '#fe7f2d',
            fontWeight: 'bold',
            fontFamily: 'Quicksand, sans-serif',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Detalles de la Orden #{orden.id_orden}
        </Typography>

        {/* Información general */}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif' }}>
            Fecha:
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
            {new Date(orden.fecha).toLocaleDateString('es-ES')}
          </Typography>

          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif', marginTop: '10px' }}>
            Cliente:
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
            {orden.nombre_cliente}
          </Typography>

          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif', marginTop: '10px' }}>
            Mesa:
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
            {orden.mesa?.num_mesa || 'Sin Mesa'}
          </Typography>
        </Box>

        {/* Platillos */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Quicksand, sans-serif',
            color: '#fe7f2d',
            marginBottom: '10px',
          }}
        >
          Platillos:
        </Typography>
        
        {/* Tabla de platillos */}
        <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif' }}>Platillo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif' }}>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orden.detalleOrden.map((detalle, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{detalle.platillo.nombre}</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{detalle.cantidad}</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>${detalle.subtotal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Cálculos */}
        <Box sx={{ marginTop: '20px' }}>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>Subtotal: ${subtotal.toFixed(2)}</Typography>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>Propina: ${propina.toFixed(2)}</Typography>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '18px',
              marginTop: '10px',
            }}
          >
            Total: ${total.toFixed(2)}
          </Typography>
        </Box>

        {/* Botón Cerrar */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#51bfcc',
            color: 'white',
            borderRadius: '10px',
            fontFamily: 'Quicksand, sans-serif',
            marginTop: '20px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          onClick={onClose}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default OrdenModal;
