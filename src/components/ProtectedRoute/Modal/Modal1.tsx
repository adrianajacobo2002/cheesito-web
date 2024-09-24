import React from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';

// Definir las propiedades del componente
interface Modal1Props {
  open: boolean;
  title: string;
  defaultMesaNumber: string;
  capacidadOptions: string[];
  onAddClick: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Modal1: React.FC<Modal1Props> = ({ open, title, defaultMesaNumber, capacidadOptions, onAddClick }) => {
  return (
    <Modal
      open={open} // Controlar la visibilidad del modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        {/* Título del modal */}
        <Typography id="modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', color: '#fe7f2d', fontWeight: 'bold' }}>
          {title}
        </Typography>

        {/* Campo para Número de Mesa */}
        <TextField
          fullWidth
          id="numero-mesa"
          label="Número Mesa"
          variant="outlined"
          defaultValue={defaultMesaNumber}
          sx={{
            mt: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc', // Color del borde por defecto
              },
              '&:hover fieldset': {
                borderColor: '#fe7f2d', // Color anaranjado al pasar el ratón
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fe7f2d', // Color anaranjado al hacer clic
              },
            },
          }}
        />

        {/* Menú desplegable para Capacidad Máxima */}
        <TextField
          fullWidth
          id="capacidad-mesa"
          label="Capacidad máxima"
          select
          defaultValue={capacidadOptions[0]} // Seleccionar la primera opción por defecto
          sx={{
            mt: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc', // Color del borde por defecto
              },
              '&:hover fieldset': {
                borderColor: '#fe7f2d', // Color anaranjado al pasar el ratón
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fe7f2d', // Color anaranjado al hacer clic
              },
            },
          }}
        >
          {capacidadOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Botón de agregar */}
        <Button
          variant="contained"
          fullWidth
          onClick={onAddClick}
          sx={{ mt: 4, backgroundColor: '#51bfcc', fontWeight: 'bold', color: 'white', borderRadius:'10px' }}
        >
          Agregar Mesa
        </Button>
      </Box>
    </Modal>
  );
};

export default Modal1;
