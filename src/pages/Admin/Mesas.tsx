import React, { useEffect, useState } from "react";
import MesaDos from "../../components/MesasAdmin/MesaDos";
import MesaCuatro from "../../components/MesasAdmin/MesaCuatro";
import MesaSeis from "../../components/MesasAdmin/MesaSeis";
import AgregarMesaModal from "../../components/Modals/AgregarMesaModal";
import Swal from "sweetalert2";
import {
  getAllMesasConOrdenes,
  createMesa,
  deleteTable, // Nueva función para eliminar mesas
} from "../../services/apiService";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Chip } from "@mui/material";


interface Mesa {
  id_mesa: number;
  num_mesa: number;
  capacidad: number;
  estado: "OCUPADO" | "DISPONIBLE";
  orden?: { nombre_cliente: string; estado: "POR_PAGAR" | "CANCELADO" } | null;
}

const AdminMesas: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [fechaActual, setFechaActual] = useState<string>("");

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFechaActual(fechaFormateada);
  };

  // Obtener todas las mesas con órdenes desde la API
  const fetchMesas = async () => {
    try {
      const mesasData = await getAllMesasConOrdenes();
      setMesas(mesasData);
    } catch (error) {
      console.error("Error al obtener las mesas", error);
    }
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para agregar una nueva mesa
  const handleAgregarMesa = async (numMesa: number, capacidad: number) => {
    try {
      await createMesa(numMesa, capacidad); // Llamamos a la función para crear una nueva mesa
      fetchMesas(); // Refrescamos la lista de mesas
      handleCloseModal(); // Cerramos el modal después de agregar
    } catch (error) {
      console.error("Error al agregar la mesa", error);
      Swal.fire("Error", "No se pudo agregar la mesa", "error");
    }
  };

  // Función para eliminar una mesa
  const handleEliminarMesa = async (id_mesa: number, estado: string) => {
    // Verificamos si la mesa está ocupada
    if (estado === "OCUPADO") {
      Swal.fire({
        title: "Error",
        text: "No se puede eliminar una mesa que está ocupada.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Confirmación de eliminación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarla",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTable(id_mesa); // Llamada a la API para eliminar la mesa
          fetchMesas(); // Refrescar las mesas después de eliminar
          Swal.fire("Eliminado", "La mesa ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error al eliminar la mesa", error);
          Swal.fire("Error", "Hubo un problema al eliminar la mesa.", "error");
        }
      }
    });
  };

  const mesasDisponibles = mesas.filter((mesa) => mesa.estado === "DISPONIBLE").length;
  const mesasOcupadas = mesas.filter((mesa) => mesa.estado === "OCUPADO").length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#fff", padding: "20px", minHeight: "100vh" }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={9}>
          <Typography variant="h2" sx={{ color: "#fe7f2d", marginBottom: "10px", fontWeight: "bold", textAlign: "left", fontFamily: "QuickSand, sans-serif" }}>
          Administrar Mesas
          </Typography>
          <Typography sx={{ marginBottom: "10px", fontWeight: "light", color: "#666", textAlign: "left", fontFamily: "Poppins, sans-serif" }}>
            {fechaActual}
          </Typography>
        </Grid>

        {/* Botón "Ver más" alineado a la derecha */}
        <Grid item xs={3} container justifyContent="flex-end" sx={{ marginTop: "50px" }}>
        <Button
              variant="contained"
              sx={{ backgroundColor: "#51bfcc", "&:hover": { backgroundColor: "#2aa7b6" }, color: "#fff", fontWeight: "bold", fontFamily: "QuickSand, sans-serif", padding: "10px 20px" }}
              onClick={handleOpenModal}
            >
              Agregar Mesas
            </Button>
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        <Chip
          label={`Disponible: ${mesasDisponibles}`}
          sx={{ backgroundColor: "#51bfcc", color: "#fff", marginRight: "10px" }}
        />
        <Chip
          label={`Ocupado: ${mesasOcupadas}`}
          sx={{ backgroundColor: "#fe7f2d", color: "#fff" }}
        />
      </Typography>

      {/* Renderizar las mesas dinámicamente */}
      <Box sx={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {mesas.map((mesa) => {
          const handleDelete = () => handleEliminarMesa(mesa.id_mesa, mesa.estado);

          if (mesa.capacidad === 2) {
            return (
              <MesaDos
                key={mesa.id_mesa}
                num_mesa={mesa.num_mesa}
                estado={mesa.estado}
                nombreCliente={mesa.orden?.nombre_cliente}
                onDelete={handleDelete} // Pasamos la función de eliminar mesa
              />
            );
          } else if (mesa.capacidad === 4) {
            return (
              <MesaCuatro
                key={mesa.id_mesa}
                num_mesa={mesa.num_mesa}
                estado={mesa.estado}
                nombreCliente={mesa.orden?.nombre_cliente}
                onDelete={handleDelete} // Pasamos la función de eliminar mesa
              />
            );
          } else if (mesa.capacidad === 6) {
            return (
              <MesaSeis
                key={mesa.id_mesa}
                num_mesa={mesa.num_mesa}
                estado={mesa.estado}
                nombreCliente={mesa.orden?.nombre_cliente}
                onDelete={handleDelete} // Pasamos la función de eliminar mesa
              />
            );
          }
          return null;
        })}
      </Box>

      {/* Modal para agregar mesa */}
      <AgregarMesaModal
        open={openModal}
        handleClose={handleCloseModal}
        handleAgregarMesa={handleAgregarMesa} // Pasamos la función de agregar mesa
      />
    </Box>
  );
};

export default AdminMesas;
