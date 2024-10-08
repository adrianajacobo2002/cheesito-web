import React from "react";
import { Card, CardContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./MesaDos.css"; // Asegúrate de que el archivo CSS esté importado

interface MesaDosProps {
  num_mesa: number;
  estado: "OCUPADO" | "DISPONIBLE";
  nombreCliente?: string;
  onDelete: () => void; // Añadimos esta propiedad
}

const MesaDos: React.FC<MesaDosProps> = ({
  num_mesa,
  estado,
  nombreCliente,
  onDelete, // Recibimos la función onDelete
}) => {
  const handleClick = () => {
    console.log(`Mesa 2 está ${estado}`);
  };

  return (
    <Card
      onClick={handleClick}
      className={`mesa-card ${estado === "OCUPADO" ? "mesa-ocupada" : "mesa-disponible"}`}
      style={{
        cursor: "pointer",
        display: "inline-block",
        backgroundColor: "transparent",
        padding: "20px",
        margin: "10px",
        borderRadius: "20px",
        boxShadow: "none",
        width: "250px",
      }}
    >
      <CardContent style={{ padding: 0 }}>
        <div className="mesa-dos-container">
          {/* Asientos superiores */}
          <div className="asientos-superiores-dos">
            <div className="asiento-oval"></div>
          </div>

          {/* La mesa */}
          <div className={`mesa-dos ${estado === "OCUPADO" ? "mesa-ocupada" : "mesa-disponible"}`}>
            <h3>
              Mesa {num_mesa}{" "}
              <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </h3>
            <p>{estado === "OCUPADO" ? nombreCliente : "Disponible"}</p>
          </div>

          {/* Asientos inferiores */}
          <div className="asientos-inferiores-dos">
            <div className="asiento-oval"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MesaDos;
