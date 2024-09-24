import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, MenuItem, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirigir

// Interfaz de mesero
interface Mesero {
  id_mesero: number;
  nombre: string;
}

// Interfaz de la mesa para la orden
interface Mesa {
  id_mesa: number;
  num_mesa: number;
}

interface ModalOrdenProps {
  open: boolean;
  onClose: () => void;
  mesa: Mesa;
}

const ModalOrden: React.FC<ModalOrdenProps> = ({ open, onClose, mesa }) => {
  const [meseros, setMeseros] = useState<Mesero[]>([]);
  const [meseroId, setMeseroId] = useState<number | null>(null); // ID del mesero seleccionado
  const [nombreCliente, setNombreCliente] = useState<string>('');
  const navigate = useNavigate(); // Para redirigir

  // Función para obtener los meseros desde el backend
  const fetchMeseros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/meseros');
      setMeseros(response.data); // Guardamos los meseros en el estado
    } catch (error) {
      console.error('Error al obtener los meseros:', error);
    }
  };

  useEffect(() => {
    fetchMeseros(); // Cargar los meseros cuando el modal se abre
  }, []);

  // Función para crear la orden
  const handleCrearOrden = async () => {
    if (meseroId && nombreCliente.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/ordenes', {
          nombre_cliente: nombreCliente,
          mesero_id: meseroId,
          mesa_id: mesa.id_mesa,
        });

        // Redirigir a la página de ordenar
        const id_orden = response.data.id_orden; // Obtener el ID de la orden creada
        navigate(`/mesero/ordenar/${id_orden}`);
      } catch (error) {
        console.error('Error al crear la orden:', error);
      }
    } else {
      alert('Por favor, selecciona un mesero e ingresa el nombre del cliente.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'QuickSand, sans-serif', fontWeight:"bold", color: "#fe7f2d" }}>
          Crear orden
        </Typography>

        {/* Selector de meseros */}
        <TextField
          select
          label="Host Encargado"
          value={meseroId || ''}
          color="warning"
          onChange={(e) => setMeseroId(Number(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        >
          {meseros.map((mesero) => (
            <MenuItem key={mesero.id_mesero} value={mesero.id_mesero}>
              {mesero.nombre}
            </MenuItem>
          ))}
        </TextField>

        {/* Campo para el nombre del cliente */}
        <TextField
          label="Nombre Cliente"
          value={nombreCliente}
          color="warning"
          onChange={(e) => setNombreCliente(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleCrearOrden}
          sx={{
            backgroundColor: '#fe7f2d',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            color: 'white',
            textTransform: 'none',
            width: '100%',
          }}
        >
          Crear orden
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalOrden;
