import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import CardDetalle from '../../components/Cards/CardDetalle';
import ResumenOrdenPay from '../../components/CardOrderPay/index'; 
import PagarImage from '../../assets/img/pagar.png';

interface Platillo {
  nombre: string;
  precio: number;
  image_url: string;
}

interface DetalleOrden {
  id_detalle_orden: number;
  cantidad: number;
  subtotal: number;
  platillo: Platillo;  // Agregar el platillo para mostrar en el detalle
  estado: string;      // Estado del detalle
}

interface Orden {
  id_orden: number;
  estado: string;
  nombre_cliente: string;
  mesa: { num_mesa: number };
  detalles?: DetalleOrden[]; // Asegúrate de que la propiedad es correcta
}

const MeseroOrdenes: React.FC = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [detallesOrden, setDetallesOrden] = useState<DetalleOrden[]>([]); // Estado para almacenar los detalles de la orden seleccionada
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<number | null>(null); // Almacenar el ID de la orden seleccionada
  const [fechaActual, setFechaActual] = useState<string>("");

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    setFechaActual(fechaFormateada);
  };

  // Función para cargar las órdenes desde el backend
  const fetchOrdenes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/ordenes");
      const allOrdenes: Orden[] = response.data;

      // Filtrar únicamente las órdenes que están en estado POR_PAGAR
      const ordenesPorPagar = allOrdenes.filter((orden) => orden.estado === "POR_PAGAR");

      setOrdenes(ordenesPorPagar);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }
  };

  // Función para cargar los detalles de la orden seleccionada
  const fetchDetallesOrden = async (id_orden: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/ordenes/${id_orden}`);
      setDetallesOrden(response.data.detalleOrden); // Actualizamos los detalles de la orden seleccionada
      setOrdenSeleccionada(id_orden); // Actualizamos el ID de la orden seleccionada
    } catch (error) {
      console.error("Error al obtener los detalles de la orden:", error);
    }
  };

  useEffect(() => {
    obtenerFechaActual();
    fetchOrdenes();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",  // Cambiar a row para mostrar la lista de órdenes y el detalle en columnas
        padding: "20px",
        alignItems: "flex-start", // Alinear los elementos al principio
      }}
    >
      
      {/* Columna izquierda: Lista de órdenes */}
      <Box sx={{ flex: 2, paddingRight: "20px" }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#fe7f2d', fontFamily: 'QuickSand, sans-serif' }}>
          Ordenes
        </Typography>
        <Typography sx={{ marginBottom: "35px", fontWeight: "light", color: "#666", textAlign: 'left', fontFamily: 'Poppins, sans-serif' }}>
          {fechaActual} {/* Aquí se muestra la fecha actual */}
        </Typography>

        {/* Contenedor de las cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        {ordenes.length > 0 ? (
          ordenes.map((orden) => (
            <CardDetalle
                    key={orden.id_orden}
                    orderNumber={orden.id_orden.toString()}
                    tableNumber={orden.mesa.num_mesa}
                    clientName={orden.nombre_cliente || "Cliente no especificado"}
                    // Usar la propiedad correcta que tenga los detalles
                    quantity={orden.detalles?.reduce((acc, item) => acc + item.cantidad, 0) || 0}
                    totalAmount={orden.detalles?.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2) || "0.00"}
                    onPayClick={() => fetchDetallesOrden(orden.id_orden)}  // Mostrar detalle cuando se hace clic en pagar
                    onStatusClick={() => window.location.href = `/mesero/ordenar/${orden.id_orden}`}  // Redirigir al ordenar
                  />
                ))
              ) : (
                <Typography>No hay órdenes por pagar en este momento.</Typography>
              )}
      </Box>
      </Box>

      {/* Columna derecha: Detalle de la orden seleccionada */}
      <Box sx={{ flex: 1 }}>
        {ordenSeleccionada ? (
          <ResumenOrdenPay
          detallesOrden={detallesOrden}  // Pasamos los detalles de la orden seleccionada
          ordenId={ordenSeleccionada}    // Pasamos el ID de la orden seleccionada
        />
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <img src={PagarImage} alt="Selecciona una orden" style={{ width: '250px', height: 'auto', marginBottom: '20px', marginTop: '60px' }} />
            <Typography variant="h6" fontFamily={"QuickSand, sans-serif"} fontWeight={"bold"} sx={{ color: "#fe7f2d" }}>
              Selecciona una orden
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MeseroOrdenes;
