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
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: '20px', // Borde redondeado
          padding: '20px', // Espacio interno
          maxWidth: '400px', // Hacer la modal más pequeña
        },
      }}
    >
      <DialogTitle sx={{ padding: '0' }}>
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
              style={{
                width: '180px',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '20px',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: '#fe7f2d',
                fontWeight: 'bold',
                fontFamily: 'Quicksand, sans-serif',
                marginBottom: '10px',
              }}
            >
              {platillo.platillo.nombre}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Disponibles: {platillo.cantidad_disponible}
            </Typography>

            <TextField
              label="Cantidad a agregar"
              value={cantidad}
              onChange={handleCantidadChange}
              fullWidth
              sx={{
                marginY: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />

            <Button
              variant="contained"
              color="warning"
              onClick={handleGuardarCambios}
              sx={{
                backgroundColor: '#51bfcc',
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'Quicksand, sans-serif',
                borderRadius: '10px',
                marginRight: 2,
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#2aa7b6',
                },
              }}
            >
              Guardar Cambios
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Quicksand, sans-serif',
                borderRadius: '10px',
                padding: '10px 20px',
              }}
            >
              Eliminar
            </Button>

            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                color: 'gray',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
              }}
            >
              Nota: Si el stock actual es mayor a cero no es posible eliminar
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlatilloModal;
