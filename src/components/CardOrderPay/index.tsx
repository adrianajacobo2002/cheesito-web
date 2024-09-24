import React from 'react';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import Swal from 'sweetalert2';  // Importa SweetAlert
import axios from 'axios';
import CardListo from '../Cards/CardListo';  // Importamos el componente CardListo

interface Platillo {
  nombre: string;
  precio: number;
  image_url: string;
}

interface DetalleOrden {
  id_detalle_orden: number;
  platillo: Platillo;
  cantidad: number;
  subtotal: number;
  estado: string;
}

interface ResumenOrdenPayProps {
  detallesOrden: DetalleOrden[]; // Los detalles de la orden
  ordenId: number;  // Aceptamos el ID de la orden para crear la factura
}

const ResumenOrdenPay: React.FC<ResumenOrdenPayProps> = ({ detallesOrden, ordenId }) => {
  // Calcular el subtotal sumando todos los subtotales de los productos en la orden
  const calcularSubtotal = () => {
    return detallesOrden
      .reduce((total, detalle) => total + detalle.subtotal, 0)
      .toFixed(2); // Retorna el subtotal formateado a 2 decimales
  };

  // Calcular la propina (10% del subtotal)
  const calcularPropina = () => {
    const subtotal = parseFloat(calcularSubtotal());
    return (subtotal * 0.10).toFixed(2);
  };

  // Calcular el total (subtotal + propina)
  const calcularTotal = () => {
    const subtotal = parseFloat(calcularSubtotal());
    const propina = parseFloat(calcularPropina());
    return (subtotal + propina).toFixed(2);
  };

  // Función para verificar si todos los platillos están en estado "Listo"
  const verificarPlatillosListos = () => {
    return detallesOrden.every((detalle) => detalle.estado === 'LISTO');
  };

  // Función para crear la factura
  const crearFactura = async () => {
    try {
      // Hacer la llamada a la API para crear la factura
      const response = await axios.post("http://localhost:3000/api/facturas", {
        orden_id: ordenId
      });
  
      if (response.status === 201) {
        Swal.fire({
          title: '¡Factura creada!',
          text: 'La factura ha sido creada exitosamente.',
          icon: 'success',
        }).then(() => {
          // Recargar la página completa
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear la factura. Por favor, intenta de nuevo.',
        icon: 'error',
      });
    }
  };
  

  // Función para manejar el clic en el botón "Pagar" y validar si todos los platillos están listos
  const handlePay = () => {
    // Validar si todos los platillos están listos
    if (!verificarPlatillosListos()) {
      Swal.fire({
        title: 'Platillos no listos',
        text: 'No puedes pagar hasta que todos los platillos estén en estado "Listo".',
        icon: 'warning',
      });
      return;
    }

    // Mostrar alerta de confirmación si todos los platillos están listos
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de proceder con el pago de esta orden.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, pagar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamamos a la función que crea la factura
        crearFactura();
      }
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: 3,
        borderRadius: '15px',
        position: 'sticky',
        top: '20px',
        height: 'calc(100vh - 40px)',
        marginLeft: 'auto',
        maxWidth: 480,
        minWidth: 480,
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
        Detalle de la Orden
      </Typography>

      <Divider sx={{ marginBottom: '20px' }} />

      {/* Contenedor scrolleable para toda el área */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: '20px',
        }}
      >
        {/* Listado de detalles de la orden */}
        <Grid container direction="column" spacing={2}>
          {detallesOrden.map((detalle) => (
            <Grid item key={detalle.id_detalle_orden}>
              <Box sx={{ fontFamily: 'Poppins, sans-serif' }}>
                <CardListo
                  pizzaName={detalle.platillo.nombre}
                  pizzaImage={`http://localhost:3000/uploads/${detalle.platillo.image_url}`}
                  price={detalle.platillo.precio}
                  quantity={detalle.cantidad}
                  estado={detalle.estado}
                  onButtonClick={() => console.log(`Estado: ${detalle.estado}`)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mostrar el subtotal */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', marginTop: 'auto', textAlign: 'right', paddingBottom: "15px"}}>
        Subtotal: ${calcularSubtotal()}
      </Typography>

      {/* Mostrar la propina */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', marginTop: 'auto', textAlign: 'right', paddingBottom: "15px"}}>
        Propina (10%): ${calcularPropina()}
      </Typography>

      {/* Mostrar el total */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', marginTop: 'auto', textAlign: 'right', paddingBottom: "15px"}}>
        Total: ${calcularTotal()}
      </Typography>

      {/* Botón para pagar */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop: '10px',
          backgroundColor: '#fe7f2d',
          fontWeight: 'bold',
          color: 'white',
          fontFamily: 'Poppins, sans-serif'
        }}
        onClick={handlePay}
      >
        Pagar
      </Button>
    </Box>
  );
};

export default ResumenOrdenPay;
