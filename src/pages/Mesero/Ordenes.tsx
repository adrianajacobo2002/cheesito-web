import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const orders = [
  { id: 1, mesa: 'Mesa 1', platillo: 'Pizza Margherita', cantidad: 3, estado: 'Pendiente' },
  { id: 2, mesa: 'Mesa 3', platillo: 'Ensalada César', cantidad: 2, estado: 'Preparando' },
  { id: 3, mesa: 'Mesa 5', platillo: 'Pasta Carbonara', cantidad: 1, estado: 'Entregado' },
];

const MeseroOrdenes = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h4" sx={{ color: '#fe7f2d', marginBottom: '20px', fontWeight: 'bold' }}>
        Órdenes del Día
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: '80%', marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Orden #</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Mesa</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Platillo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.mesa}</TableCell>
                <TableCell>{order.platillo}</TableCell>
                <TableCell>{order.cantidad}</TableCell>
                <TableCell>{order.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MeseroOrdenes;
