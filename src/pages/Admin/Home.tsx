import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardPizza from "../../components/Cards/CardPizza";
import CardNoDisponible from "../../components/Cards/CardNoDisponible";
import PlatilloModal from "../../components/Modals/PlatilloModal";
import {
  getPizzasDisponibles,
  getPizzasFueraStock,
  getBebidasFueraStock,
  updateCantidadStock,
} from "../../services/apiService";
import Swal from "sweetalert2";
import { PlatilloDisponible } from "../../types/types";

const AdminHome: React.FC = () => {
  const [pizzasDisponibles, setPizzasDisponibles] = useState<PlatilloDisponible[]>([]);
  const [pizzasFueraStock, setPizzasFueraStock] = useState<PlatilloDisponible[]>([]);
  const [bebidasFueraStock, setBebidasFueraStock] = useState<PlatilloDisponible[]>([]);
  const [selectedPlatillo, setSelectedPlatillo] = useState<PlatilloDisponible | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [tabValue, setTabValue] = useState(0);  // Para manejar la selección de las tabs
  const [fechaActual, setFechaActual] = useState<string>("");

  const navigate = useNavigate();

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFechaActual(fechaFormateada);
  };

  useEffect(() => {
    const fetchPizzasDisponibles = async () => {
      try {
        const disponibles = await getPizzasDisponibles();
        setPizzasDisponibles(disponibles);
      } catch (error) {
        console.error("Error fetching available pizzas", error);
      }
    };

    const fetchPizzasFueraStock = async () => {
      try {
        const fueraStock = await getPizzasFueraStock();
        setPizzasFueraStock(fueraStock);
      } catch (error) {
        console.error("Error fetching out of stock pizzas", error);
      }
    };

    const fetchBebidasFueraStock = async () => {
      try {
        const fueraStock = await getBebidasFueraStock();
        setBebidasFueraStock(fueraStock);
      } catch (error) {
        console.error("Error fetching out of stock drinks", error);
      }
    };

    obtenerFechaActual();
    fetchPizzasDisponibles();
    fetchPizzasFueraStock();
    fetchBebidasFueraStock();
  }, []);

  // Abrir modal para modificar stock de un platillo fuera de stock
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

      const itemsActualizados =
        tabValue === 0
          ? pizzasFueraStock.map((item) =>
              item.id_inventario === selectedPlatillo.id_inventario
                ? { ...item, cantidad_disponible: nuevaCantidad }
                : item
            )
          : bebidasFueraStock.map((item) =>
              item.id_inventario === selectedPlatillo.id_inventario
                ? { ...item, cantidad_disponible: nuevaCantidad }
                : item
            );

      if (tabValue === 0) {
        setPizzasFueraStock(itemsActualizados);
      } else {
        setBebidasFueraStock(itemsActualizados);
      }

      Swal.fire({
        title: 'Stock Actualizado',
        text: `Se ha actualizado el stock de ${selectedPlatillo.platillo.nombre}.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }). then(() => {
        window.location.reload();  // Recargar la página
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

  // Cambiar entre tabs (comida y bebidas fuera de stock)
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#fff", padding: "20px", minHeight: "100vh" }}>
      {/* Contenedor principal con Grid para la cabecera */}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={9}>
          <Typography variant="h2" sx={{ color: "#fe7f2d", marginBottom: "10px", fontWeight: "bold", textAlign: "left", fontFamily: "QuickSand, sans-serif" }}>
            Bienvenido Admin
          </Typography>
          <Typography sx={{ marginBottom: "10px", fontWeight: "light", color: "#666", textAlign: "left", fontFamily: "Poppins, sans-serif" }}>
            {fechaActual}
          </Typography>
          <Typography variant="h4" sx={{ color: "#fe7f2d", fontWeight: "bold", textAlign: "left", fontFamily: "QuickSand, sans-serif" }}>
            Disponibles en Stock
          </Typography>
        </Grid>

        {/* Botón "Ver más" alineado a la derecha */}
        <Grid item xs={3} container justifyContent="flex-end" sx={{ marginTop: "50px" }}>
          {pizzasDisponibles.length > 5 && (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#fe7f2d", "&:hover": { backgroundColor: "#e56f1f" }, color: "#fff", fontWeight: "bold", fontFamily: "QuickSand, sans-serif", padding: "10px 20px" }}
              onClick={() => navigate("/admin/platillos")}
            >
              Ver más
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Grid de pizzas disponibles */}
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {pizzasDisponibles.slice(0, 5).map((platillo) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={platillo.platillo.id_platillos}>
            <CardPizza
              nombre={platillo.platillo.nombre}
              imagen={`http://localhost:3000/uploads/${platillo.platillo.image_url}`}
              disponibles={platillo.cantidad_disponible}
              onClick={() => handleCardClick(platillo)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Sección "Fuera de Stock" */}
      <Box sx={{ width: "100%", maxWidth: 1200, textAlign: "left", marginTop: "40px" }}>
        <Typography variant="h4" sx={{ color: "#fe7f2d", fontWeight: "bold", textAlign: "left", fontFamily: "QuickSand, sans-serif" }}>
          Fuera de Stock
        </Typography>
      </Box>

      {/* Tabs para filtrar entre comida y bebidas fuera de stock */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          centered={false}
          TabIndicatorProps={{
            style: { backgroundColor: '#fe7f2d' }, // Cambia el color del indicador a naranjita
          }}
        >
          <Tab
            label="Comida"
            sx={{
              color: tabValue === 0 ? '#fe7f2d' : '#000', // Cambia el color del texto cuando el Tab está activo
              fontFamily: 'Poppins, sans-serif', // Aplica la fuente Poppins
              fontWeight: 'bold',
              '&.Mui-selected': { color: '#fe7f2d' }, // Asegura que el tab seleccionado tenga el color correcto
            }}
          />
          <Tab
            label="Bebidas"
            sx={{
              color: tabValue === 1 ? '#fe7f2d' : '#000', // Cambia el color del texto cuando el Tab está activo
              fontFamily: 'Poppins, sans-serif', // Aplica la fuente Poppins
              fontWeight: 'bold',
              '&.Mui-selected': { color: '#fe7f2d' }, // Asegura que el tab seleccionado tenga el color correcto
            }}
          />
        </Tabs>
      </Box>

      {/* Mostrar las cards según la tab seleccionada */}
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {tabValue === 0
          ? pizzasFueraStock.map((platillo) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={platillo.id_inventario}>
                <CardNoDisponible
                  pizzaName={platillo.platillo.nombre}
                  pizzaImage={`http://localhost:3000/uploads/${platillo.platillo.image_url}`}
                  availability="No disponible"
                  onClick={() => handleCardClick(platillo)} // Hacer clic en la card abre la modal
                />
              </Grid>
            ))
          : bebidasFueraStock.map((bebida) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={bebida.id_inventario}>
                <CardNoDisponible
                  pizzaName={bebida.platillo.nombre}
                  pizzaImage={`http://localhost:3000/uploads/${bebida.platillo.image_url}`}
                  availability="No disponible"
                  onClick={() => handleCardClick(bebida)} // Hacer clic en la card abre la modal
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
    </Box>
  );
};

export default AdminHome;
