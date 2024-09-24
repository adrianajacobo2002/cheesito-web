import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import MesaCuatro from "../../components/MesasC/MesaCuatro";
import MesaDos from "../../components/MesasC/MesaDos";
import MesaSeis from "../../components/MesasC/MesaSeis";
import ModalOrden from "../../components/ModalCrearOrden/index";
import "../../components/MesasC/MesaSeis.css";
import './MeseroHome.css'; 

interface Orden {
  nombre_cliente: string | null;
  estado: string | null;
}

interface Mesa {
  id_mesa: number;
  num_mesa: number;
  estado: "OCUPADO" | "DISPONIBLE";
  capacidad: number;
  orden: Orden | null;
}

const MeseroHome = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null); // Usamos el estado para la mesa seleccionada
  const [fechaActual, setFechaActual] = useState<string>(""); // Estado para la fecha actual

  // Función para obtener la fecha actual del sistema
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    setFechaActual(fechaFormateada);
  };

  const fetchMesas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/mesas");
      setMesas(response.data);
    } catch (error) {
      console.error("Error al obtener las mesas:", error);
      setError("Error al cargar las mesas");
    }
  };

  useEffect(() => {
    obtenerFechaActual(); // Obtener la fecha cuando se monte el componente
    fetchMesas();
  }, []);

  const handleOpenModal = (mesa: Mesa) => {
    setSelectedMesa(mesa); // Almacena la mesa seleccionada
    setOpenModal(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMesa(null); // Limpia la mesa seleccionada
  };

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start", // Alinear a la izquierda
        backgroundColor: "#fff", // Fondo blanco
        padding: "20px",
        minHeight: "100vh", // Asegura que ocupe toda la pantalla
        overflow: "hidden", // Evita que el contenido empuje hacia abajo
      }}
    >
      {/* Encabezado estático */}
      <Box sx={{ width: "100%", maxWidth: 1200, textAlign: "left", marginBottom: "40px", marginLeft: "40px" }}>
        <Typography
          variant="h2"
          sx={{ color: "#fe7f2d", marginBottom: "20px", fontWeight: "bold", textAlign: 'left', fontFamily: 'QuickSand, sans-serif' }}
        >
          Bienvenido Mesero
        </Typography>
        <Typography sx={{ marginBottom: "20px", fontWeight: "light", color: "#666", textAlign: 'left', fontFamily: 'Poppins, sans-serif' }}>
          {fechaActual} {/* Aquí se muestra la fecha actual */}
        </Typography>
        <Typography variant="h4" sx={{ color: "#fe7f2d", fontWeight: "bold", textAlign: 'left', fontFamily: 'QuickSand, sans-serif' }}>
          Mesas
        </Typography>
      </Box>

      {/* Contenedor de las mesas en grid */}
      {Array.isArray(mesas) && mesas.length > 0 ? (
        <Box className="mesas-layout">
          {mesas.map((mesa) => (
            <div key={mesa.id_mesa}>
              {mesa.capacidad === 6 && (
                <MesaSeis
                  num_mesa={mesa.num_mesa}
                  estado={mesa.estado}
                  nombreCliente={mesa.orden?.nombre_cliente ?? 'N/A'}
                  onClick={() => mesa.estado === 'DISPONIBLE' && handleOpenModal(mesa)}
                />
              )}
              {mesa.capacidad === 4 && (
                <MesaCuatro
                  num_mesa={mesa.num_mesa}
                  estado={mesa.estado}
                  nombreCliente={mesa.orden?.nombre_cliente ?? 'N/A'}
                  onClick={() => mesa.estado === 'DISPONIBLE' && handleOpenModal(mesa)}
                />
              )}
              {mesa.capacidad === 2 && (
                <MesaDos
                  num_mesa={mesa.num_mesa}
                  estado={mesa.estado}
                  nombreCliente={mesa.orden?.nombre_cliente ?? 'N/A'}
                  onClick={() => mesa.estado === 'DISPONIBLE' && handleOpenModal(mesa)}
                />
              )}
            </div>
          ))}
        </Box>
      ) : (
        <Typography>No hay mesas disponibles</Typography>
      )}

      {/* Modal para crear la orden */}
      {selectedMesa && (
        <ModalOrden open={openModal} onClose={handleCloseModal} mesa={selectedMesa} />
      )}
    </Box>
  );
};

export default MeseroHome;
