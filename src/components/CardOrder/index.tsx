import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface OrderCardProps {
  orderId: string;
  table: number;
  items: { name: string; quantity: number; status: string }[];
  onConfirm: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderId, table, items, onConfirm }) => {
  return (
    <Card sx={{ minWidth: 275, margin: '20px', backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Orden: #{orderId}
        </Typography>
        <Typography color="text.secondary">
          Mesa: {table}
        </Typography>

        <Box sx={{ marginY: 2 }}>
          {items.map((item, index) => (
            <Typography key={index}>
              {item.name} - Cantidad: {item.quantity} - Estado: {item.status}
            </Typography>
          ))}
        </Box>

        <Button 
          variant="contained" 
          color="error" 
          sx={{ marginTop: 2, backgroundColor: '#fe7f2d' }} 
          onClick={onConfirm}
        >
          Confirmar Completada
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
