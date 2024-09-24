import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icono de ver más

// Definir las propiedades del componente
interface HistorialProps {
  data: {
    id: number;
    fecha: string;
    mesa: string;
    subTotal: string;
    total: string;
  }[];
  onVerMasClick: (id: number) => void;
}

const Historial: React.FC<HistorialProps> = ({ data, onVerMasClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabla de órdenes">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: '#fe7f2d' }}>#</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Mesa</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>SubTotal</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Ver Más</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Recorrer los datos y renderizar las filas dinámicamente */}
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ color: '#fe7f2d', fontWeight: 'bold' }}>{row.id}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.mesa}</TableCell>
              <TableCell>{row.subTotal}</TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#51bfcc', color: 'white', borderRadius: '10px' }}
                  startIcon={<VisibilityIcon />}
                  onClick={() => onVerMasClick(row.id)}
                >
                  Ver Más
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Historial;
