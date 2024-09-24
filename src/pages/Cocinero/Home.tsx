import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import OrdenesComponent from '../../components/CardOrder/index'; // Ajusta la ruta

// Definir la interfaz para las órdenes
interface Platillo {
  nombre: string;
}

interface DetalleOrden {
  id_detalle_orden: number;
  platillo: Platillo;
  cantidad: number;
  estado: string;
}

interface Orden {
  id_orden: number;
  estado: string;
  mesa: { num_mesa: number };
  detalleOrden: DetalleOrden[];
}

const CocineroHome: React.FC = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]); // Usamos el tipo Orden para el estado
  const [ordenesFiltradas, setOrdenesFiltradas] = useState<Orden[]>([]); // Ordenes filtradas por estado
  const [fechaActual, setFechaActual] = useState<string>(""); // Estado para la fecha actual

  // Función para obtener la fecha actual del sistema
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    setFechaActual(fechaFormateada);
  };

  // Función para obtener todas las órdenes desde el backend
  const fetchOrdenes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/ordenes"); // Ruta que trae todas las órdenes
      const allOrdenes: Orden[] = response.data; // Especificamos el tipo de los datos

      setOrdenes(allOrdenes); // Guardamos todas las órdenes
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }
  };

  // Función para filtrar órdenes por estado
  const filtrarPorEstado = (estado: string) => {
    const filtradas = ordenes.filter((orden: Orden) => {
      const todosPlatillosListos = orden.detalleOrden.every((detalle) => detalle.estado === 'LISTO');
      if (todosPlatillosListos) {
        return false;
      }
      return orden.estado === estado;
    });
    setOrdenesFiltradas(filtradas); // Actualizamos el estado con las órdenes filtradas
  };

  useEffect(() => {
    obtenerFechaActual(); // Obtener la fecha cuando se monte el componente
    fetchOrdenes(); // Obtener las órdenes cuando el componente se monta
  }, []);

  useEffect(() => {
    filtrarPorEstado("POR_PAGAR"); // Filtrar por estado "POR_PAGAR"
  }, [ordenes]); // Cada vez que cambien las órdenes, se filtran

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start", // Cambiar a flex-start para alinear a la izquierda
        backgroundColor: "#fff", // Cambiar el fondo a blanco
        padding: "20px",
        minHeight: "100vh", // Asegura que ocupe toda la pantalla
        overflow: "hidden" // Evita que el contenido empuje hacia abajo
      }}
    >
      {/* Encabezado estático */}
      <Box sx={{ width: "100%", maxWidth: 1200, textAlign: "left", marginBottom: "40px", marginLeft: "40px" }}>
        <Typography
          variant="h4"
          sx={{ color: "#fe7f2d", marginBottom: "20px", fontWeight: "bold", textAlign: 'left', fontFamily: 'QuickSand, sans-serif' }}
        >
          Bienvenido Cocinero
        </Typography>
        <Typography sx={{ marginBottom: "20px", fontWeight: "light", color: "#666", textAlign: 'left', fontFamily: 'Poppins, sans-serif' }}>
          {fechaActual} {/* Aquí se muestra la fecha actual */}
        </Typography>
        <Typography variant="h5" sx={{ color: "#fe7f2d", fontWeight: "bold", textAlign: 'left', fontFamily: 'QuickSand, sans-serif' }}>
          Ordenes del día
        </Typography>
      </Box>

      {/* Contenedor de las tarjetas (cards) con grid de 2 columnas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", // 2 columnas con ajuste automático
          gridGap: "20px",
          width: "100%",
          maxWidth: 1400, // Ajusta el ancho máximo del contenedor
          justifyContent: "flex-start", // Cambiar a flex-start para que las tarjetas estén más hacia la izquierda
          marginLeft: "40px", // Agregar margen a la izquierda
          marginTop: "20px"
        }}
      >
        {ordenesFiltradas.length > 0 ? (
          <OrdenesComponent ordenes={ordenesFiltradas} fetchOrdenes={fetchOrdenes} />
        ) : (
          <Typography variant="h6" sx={{ color: "#333", textAlign: "center", fontFamily: 'Poppins, sans-serif' }}>
            No hay órdenes disponibles en este estado.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CocineroHome;
