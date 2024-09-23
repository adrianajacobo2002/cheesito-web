import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import MesaCuatro from "../../components/MesasC/MesaCuatro";
import MesaDos from "../../components/MesasC/MesaDos";
import MesaSeis from "../../components/MesasC/MesaSeis";
import "../../components/MesasC/MesaSeis.css"; // Ruta ajustada

const MeseroHome = () => {
  interface Mesa {
    id_mesa: number;
    num_mesa: number;
    estado: string;
    capacidad: number;
    orden: {
      nombre_cliente: string | null;
      estado: string | null;
    } | null;
  }

  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/mesas");
        console.log("Datos recibidos de la API: ", response.data);
        setMesas(response.data);
      } catch (error) {
        console.error("Error al obtener las mesas:", error);
        setError("Error al cargar las mesas");
      }
    };
    fetchMesas();
  }, []);

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
    <Box>
      <Typography variant="h2">Bienvenido Mesero</Typography>
      <Typography variant="h6">
        Aquí puedes gestionar tus mesas y órdenes del día.
      </Typography>

      {/* Si mesas no es un array o está vacío */}
      {Array.isArray(mesas) && mesas.length > 0 ? (
        <Box className="mesas-layout">
        {mesas.map((mesa) => {
          if (mesa.capacidad === 6) {
            return (
              <MesaSeis 
                key={mesa.id_mesa} 
                num_mesa={mesa.num_mesa}
                estado={mesa.estado === "OCUPADO" ? "OCUPADO" : "DISPONIBLE"} 
                nombreCliente={mesa.orden?.nombre_cliente ?? "N/A"} 
              />
            );
          } else if (mesa.capacidad === 4) {
            return (
              <MesaCuatro 
                key={mesa.id_mesa} 
                num_mesa={mesa.num_mesa}
                estado={mesa.estado === "OCUPADO" ? "OCUPADO" : "DISPONIBLE"} 
                nombreCliente={mesa.orden?.nombre_cliente ?? "N/A"} 
              />
            );
          } else if (mesa.capacidad === 2) {
            return (
              <MesaDos 
                key={mesa.id_mesa} 
                num_mesa={mesa.num_mesa}
                estado={mesa.estado === "OCUPADO" ? "OCUPADO" : "DISPONIBLE"} 
                nombreCliente={mesa.orden?.nombre_cliente ?? "N/A"} 
              />
            );
          }
          return null;
        })}
      </Box>
      ) : (
        <Typography>No hay mesas disponibles</Typography>
      )}
    </Box>
  );
};

export default MeseroHome;
