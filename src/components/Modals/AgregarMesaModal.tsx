import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField, MenuItem } from "@mui/material";

interface AgregarMesaModalProps {
  open: boolean;
  handleClose: () => void;
  handleAgregarMesa: (num_mesa: number, capacidad: number) => void;
}

const AgregarMesaModal: React.FC<AgregarMesaModalProps> = ({
  open,
  handleClose,
  handleAgregarMesa,
}) => {
  const [numMesa, setNumMesa] = useState("");
  const [capacidad, setCapacidad] = useState(2);

  const handleSubmit = () => {
    handleAgregarMesa(parseInt(numMesa), capacidad);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "400px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Sombra suave
          margin: "auto", // Asegura que el modal tenga margen auto
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centra el modal
          textAlign: "center", // Centrar el texto
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "24px",
            color: "#fe7f2d", // Color personalizado
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Agregar Mesa
        </Typography>

        <TextField
          label="Número de Mesa"
          fullWidth
          value={numMesa}
          onChange={(e) => setNumMesa(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-root": {
              borderRadius: "10px",
            },
          }}
        />

        <TextField
          select
          label="Capacidad máxima"
          fullWidth
          value={capacidad}
          onChange={(e) => setCapacidad(parseInt(e.target.value))}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-root": {
              borderRadius: "10px",
            },
          }}
        >
          <MenuItem value={2}>2 personas</MenuItem>
          <MenuItem value={4}>4 personas</MenuItem>
          <MenuItem value={6}>6 personas</MenuItem>
        </TextField>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#51bfcc",
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "Quicksand, sans-serif",
            borderRadius: "10px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#2aa7b6",
            },
          }}
        >
          Agregar Mesa
        </Button>
      </Box>
    </Modal>
  );
};

export default AgregarMesaModal;
