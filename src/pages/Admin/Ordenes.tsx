import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Box, Typography, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getAllOrdenes } from "../../services/apiService";
import OrdenModal from "../../components/Modals/OrdenModal";

interface Orden {
  id_orden: number;
  fecha: string;
  estado: string;
  nombre_cliente: string;
  mesa: {
    num_mesa: number;
  };
  detalleOrden: {
    platillo: {
      nombre: string;
    };
    cantidad: number;
    subtotal: number;
  }[];
}

const AdminOrdenes: React.FC = () => {
  const [ordenesCanceladas, setOrdenesCanceladas] = useState<Orden[]>([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null);
  const [open, setOpen] = useState(false);

  

  // Función para abrir la modal con la orden seleccionada
  const handleOpen = (orden: Orden) => {
    setOrdenSeleccionada(orden);
    setOpen(true);
  };

  // Función para cerrar la modal
  const handleClose = () => {
    setOpen(false);
    setOrdenSeleccionada(null);
  };

  // Efecto para obtener las órdenes canceladas
  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const ordenes = await getAllOrdenes();
        const canceladas = ordenes.filter((orden: Orden) => orden.estado === "CANCELADO");
        setOrdenesCanceladas(canceladas);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrdenes();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#fff", padding: "20px", minHeight: "100vh" }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={9}>
          <Typography
            variant="h2"
            sx={{ color: "#fe7f2d", marginBottom: "10px", fontWeight: "bold", textAlign: "left", fontFamily: "QuickSand, sans-serif"}}
          >
            Historial de Pedidos
          </Typography>
          
        </Grid>
      </Grid>

      {/* Tabla de Órdenes Canceladas */}
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="Tabla de órdenes canceladas">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", color: "#fe7f2d", fontFamily: "QuickSand, sans-serif", fontSize: "1.2rem" }}
              >
                #
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontFamily: "QuickSand, sans-serif", fontSize: "1.2rem" }}
              >
                Fecha
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontFamily: "QuickSand, sans-serif", fontSize: "1.2rem" }}
              >
                Mesa
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontFamily: "QuickSand, sans-serif", fontSize: "1.2rem" }}
              >
                Cliente
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontFamily: "QuickSand, sans-serif", fontSize: "1.2rem" }}
              >
                Ver Más
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenesCanceladas.map((orden, index) => (
              <TableRow key={orden.id_orden}>
                <TableCell sx={{ color: "#fe7f2d", fontWeight: "bold", fontFamily: "Poppins, sans-serif", fontSize: "1rem" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif", fontSize: "1rem" }}>
                  {new Date(orden.fecha).toLocaleDateString("es-ES")}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif", fontSize: "1rem" }}>
                  {orden.mesa?.num_mesa || "Sin Mesa"}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif", fontSize: "1rem" }}>
                  {orden.nombre_cliente}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{fontFamily: "QuickSand, sans-serif", backgroundColor: "#51bfcc", color: "white", borderRadius: "10px", "&:hover": { backgroundColor: "#2aa7b6" } }}
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpen(orden)}
                  >
                    Ver Más
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para mostrar detalles de la orden */}
      <OrdenModal open={open} orden={ordenSeleccionada} onClose={handleClose} />
    </Box>
  );
};

export default AdminOrdenes;
