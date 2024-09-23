import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

// Definir la interfaz para las órdenes
interface Orden {
  id: string;
  estado: string;
  mesa: { numero: number };
  detalleOrden: { platillo: { nombre: string }; cantidad: number }[];
}

const CocineroHome: React.FC = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]); // Usamos el tipo Orden para el estado
  const [ordenesFiltradas, setOrdenesFiltradas] = useState<Orden[]>([]); // Ordenes filtradas por estado

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
    const filtradas = ordenes.filter((orden: Orden) => orden.estado === estado);
    setOrdenesFiltradas(filtradas); // Actualizamos el estado con las órdenes filtradas
  };

  useEffect(() => {
    fetchOrdenes(); // Obtener las órdenes cuando el componente se monta
  }, []);

  useEffect(() => {
    console.log("Órdenes obtenidas:", ordenes); // Agrega esto para verificar los datos
    filtrarPorEstado("POR_PAGAR");
  }, [ordenes]); // Cada vez que cambien las órdenes, se filtran
  // Cada vez que cambien las órdenes, se filtran

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: "#fe7f2d", marginBottom: "20px", fontWeight: "bold" }}
      >
        Bienvenido Chef
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "10px", color: "#333" }}>
        Administra las órdenes que están en preparación.
      </Typography>

      <Box sx={{ width: "100%", maxWidth: 800, marginTop: "20px" }}>
        <List>
          {ordenesFiltradas.length > 0 ? (
            ordenesFiltradas.map((orden: Orden) => (
              <React.Fragment key={orden.id}>
                <ListItem>
                  <ListItemText
                    primary={`Orden #${orden.id} - Mesa: ${orden.mesa.numero}`}
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          Estado: {orden.estado}
                        </Typography>
                        {orden.detalleOrden.map((detalle, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            color="textSecondary"
                          >
                            {detalle.platillo.nombre} - Cantidad:{" "}
                            {detalle.cantidad}
                          </Typography>
                        ))}
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ color: "#333", textAlign: "center" }}
            >
              No hay órdenes disponibles en este estado.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default CocineroHome;
