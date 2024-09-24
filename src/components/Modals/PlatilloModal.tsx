import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PlatilloDisponible } from '../../types/types'; // Define el tipo de platillo disponible

interface PlatilloModalProps {
  platillo: PlatilloDisponible | null;
  open: boolean;
  cantidad: string;
  handleClose: () => void;
  handleCantidadChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGuardarCambios: () => void;
}

const PlatilloModal: React.FC<PlatilloModalProps> = ({
  platillo,
  open,
  cantidad,
  handleClose,
  handleCantidadChange,
  handleGuardarCambios,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {platillo?.platillo.nombre}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {platillo && (
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={`http://localhost:3000/uploads/${platillo.platillo.image_url}`}
              alt={platillo.platillo.nombre}
              style={{ width: '200px', height: '200px', objectFit: 'cover', marginBottom: '20px' }}
            />
            <Typography variant="h5" sx={{ color: '#fe7f2d', fontWeight: 'bold' }}>
              {platillo.platillo.nombre}
            </Typography>
            <Typography variant="body1">Disponibles: {platillo.cantidad_disponible}</Typography>

            <TextField
              label="Cantidad a agregar"
              value={cantidad}
              onChange={handleCantidadChange}
              fullWidth
              sx={{ marginY: 2 }}
            />

            <Button
              variant="contained"
              color="warning"
              onClick={handleGuardarCambios}
              sx={{ marginRight: 2 }}
            >
              Guardar Cambios
            </Button>
            <Button variant="contained" color="error">
              Eliminar
            </Button>

            <Typography variant="body2" sx={{ marginTop: 2, color: 'gray' }}>
              Nota: Si el stock actual es mayor a cero no es posible eliminar
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlatilloModal;
