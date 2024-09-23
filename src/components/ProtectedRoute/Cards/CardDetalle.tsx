import React from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Icono de agregar

// Definir las propiedades del componente
interface CardDetalleProps {
  orderNumber: string;
  tableNumber: number;
  clientName: string;
  quantity: number;
  totalAmount: string;
  onPayClick: () => void;
  onStatusClick: () => void;
}

const CardDetalle: React.FC<CardDetalleProps> = ({ orderNumber, tableNumber, clientName, quantity, totalAmount, onPayClick, onStatusClick }) => {
  return (
    <div>
      <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2, borderRadius: 2, maxWidth: 600, position: 'relative' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Información de la orden */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Orden: #{orderNumber}
          </Typography>

          <Typography variant="body2" component="div" sx={{ fontWeight: 'bold' }}>
            Mesa: {tableNumber}
          </Typography>

          <Typography variant="body2" component="div" sx={{ fontWeight: 'bold' }}>
            Cliente: {clientName}
          </Typography>

          {/* Cantidad */}
          <Typography variant="body2" color="text.secondary">
            Cantidad: {quantity}
          </Typography>
        </CardContent>

        {/* Línea separadora */}
        <Box sx={{ borderBottom: '1px solid #e0e0e0', marginY: 2, width: '100%' }} />

        {/* Botones y precio al final */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 2 }}>
          {/* Botón de "Pagar" */}
          <Button
            variant="contained"
            onClick={onPayClick}
            sx={{ backgroundColor: '#fe7f2d', borderRadius: '20px', padding: '5px 20px' }}
          >
            Pagar
          </Button>

          {/* Total */}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ${totalAmount}
          </Typography>
        </Box>

        {/* Botón "Por Pagar" y agregar icono en la parte superior derecha */}
        <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={onStatusClick} sx={{ color: '#fe7f2d' }}>
            <AddCircleIcon />
          </IconButton>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#f29f05', color: 'white', borderRadius: '20px', padding: '5px 10px', fontWeight: 'bold' }}
          >
            Por pagar
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default CardDetalle;
