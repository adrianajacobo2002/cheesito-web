import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Tabs, Tab } from '@mui/material';
import CardPizza from '../../components/Cards/CardPizza';
import PlatilloModal from '../../components/Modals/PlatilloModal';
import AgregarPlatilloModal from '../../components/Modals/AgregarPlatilloModal';
import { getPizzasDisponibles, getBebidasDisponibles, createPlatillo, updateCantidadStock } from '../../services/apiService';
import Swal from 'sweetalert2';
import { PlatilloDisponible } from '../../types/types';

const AdminPlatillos: React.FC = () => {
  const [pizzasDisponibles, setPizzasDisponibles] = useState<PlatilloDisponible[]>([]);
  const [bebidasDisponibles, setBebidasDisponibles] = useState<PlatilloDisponible[]>([]);
  const [selectedPlatillo, setSelectedPlatillo] = useState<PlatilloDisponible | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAgregarModal, setOpenAgregarModal] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [tabValue, setTabValue] = useState(0);  // Maneja la selección de las tabs

  // Obtener pizzas y bebidas disponibles al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pizzas = await getPizzasDisponibles();
        const bebidas = await getBebidasDisponibles();
        setPizzasDisponibles(pizzas);
        setBebidasDisponibles(bebidas);
      } catch (error) {
        console.error('Error fetching available items', error);
      }
    };

    fetchData();
  }, []);

  // Abrir modal para modificar stock de un platillo
  const handleCardClick = (platillo: PlatilloDisponible) => {
    setSelectedPlatillo(platillo);
    setOpenModal(true);
  };

  // Cerrar la modal de stock
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlatillo(null);
    setCantidad('');
  };

  // Cerrar modal de agregar platillo
  const handleCloseAgregarModal = () => {
    setOpenAgregarModal(false);
  };

  // Manejar el cambio de cantidad en el input
  const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCantidad(event.target.value);
  };

  // Guardar cambios en el stock
  const handleGuardarCambios = async () => {
    if (!selectedPlatillo) return;

    try {
      const nuevaCantidad = parseInt(cantidad);

      if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
        Swal.fire({
          title: 'Error',
          text: 'La cantidad debe ser un número mayor a cero.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      await updateCantidadStock(selectedPlatillo.id_inventario, nuevaCantidad);

      const itemsActualizados = tabValue === 0
        ? pizzasDisponibles.map((item) =>
            item.id_inventario === selectedPlatillo.id_inventario
              ? { ...item, cantidad_disponible: item.cantidad_disponible + nuevaCantidad }
              : item
          )
        : bebidasDisponibles.map((item) =>
            item.id_inventario === selectedPlatillo.id_inventario
              ? { ...item, cantidad_disponible: item.cantidad_disponible + nuevaCantidad }
              : item
          );

      if (tabValue === 0) {
        setPizzasDisponibles(itemsActualizados);
      } else {
        setBebidasDisponibles(itemsActualizados);
      }

      Swal.fire({
        title: 'Stock Actualizado',
        text: `Se ha agregado ${nuevaCantidad} unidades al stock de ${selectedPlatillo.platillo.nombre}.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      handleCloseModal();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar el stock. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  // Manejar agregar platillo
  const handleAgregarPlatillo = async (formData: FormData) => {
    try {
      await createPlatillo(formData);

      const pizzas = await getPizzasDisponibles();
      setPizzasDisponibles(pizzas);

      handleCloseAgregarModal();
    } catch (error) {
      console.error('Error al agregar platillo:', error);
    }
  };

  // Cambiar entre Tabs (Comidas y Bebidas)
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Stock Disponible
      </Typography>

      {/* Botón para abrir la modal de agregar platillo */}
      <Button variant="contained" color="primary" onClick={() => setOpenAgregarModal(true)}>
        Agregar a Stock
      </Button>

      {/* Tabs para filtrar entre pizzas y bebidas */}
      <Tabs value={tabValue} onChange={handleChangeTab} sx={{ marginTop: 2 }}>
        <Tab label="Pizzas" />
        <Tab label="Bebidas" />
      </Tabs>

      {/* Mostrar las cards según la tab seleccionada */}
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {tabValue === 0
          ? pizzasDisponibles.map((platillo) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={platillo.id_inventario}>
                <CardPizza
                  nombre={platillo.platillo.nombre}
                  imagen={`http://localhost:3000/uploads/${platillo.platillo.image_url}`}
                  disponibles={platillo.cantidad_disponible}
                  onClick={() => handleCardClick(platillo)}
                />
              </Grid>
            ))
          : bebidasDisponibles.map((bebida) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={bebida.id_inventario}>
                <CardPizza
                  nombre={bebida.platillo.nombre}
                  imagen={`http://localhost:3000/uploads/${bebida.platillo.image_url}`}
                  disponibles={bebida.cantidad_disponible}
                  onClick={() => handleCardClick(bebida)}
                />
              </Grid>
            ))}
      </Grid>

      {/* Modal para modificar stock */}
      <PlatilloModal
        platillo={selectedPlatillo}
        open={openModal}
        cantidad={cantidad}
        handleClose={handleCloseModal}
        handleCantidadChange={handleCantidadChange}
        handleGuardarCambios={handleGuardarCambios}
      />

      {/* Modal para agregar un platillo */}
      <AgregarPlatilloModal
        open={openAgregarModal}
        handleClose={handleCloseAgregarModal}
        handleAgregarPlatillo={handleAgregarPlatillo}
      />
    </Box>
  );
};

export default AdminPlatillos;
