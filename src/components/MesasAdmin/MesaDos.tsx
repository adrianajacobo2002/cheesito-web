import React from "react";
import { Card, CardContent } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "./MesaDos.css"; // Asegúrate de que el archivo CSS esté importado

interface MesaDosProps {
  num_mesa: number;
  estado: "OCUPADO" | "DISPONIBLE";
  nombreCliente?: string;
}

const MesaDos: React.FC<MesaDosProps> = ({
  num_mesa,
  estado,
  nombreCliente,
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
        backgroundColor: "transparent", // Quita el fondo de la card
        padding: "20px",
        margin: "10px",
        borderRadius: "20px",
        boxShadow: "none",
        width: "250px", // Ancho ajustado para mesa de 2 personas
      }}
    >
      <CardContent style={{ padding: 0 }}>
        <div className="mesa-dos-container">
          {/* Asientos superiores */}
          <div className="asientos-superiores-dos">
            <div className="asiento-oval"></div>
          </div>

          {/* La mesa */}
          <div
            className={`mesa-dos ${estado === "OCUPADO" ? "mesa-ocupada" : "mesa-disponible"}`}
          >
            <h3>
              Mesa{" "}
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>{" "}
              {(num_mesa = num_mesa)}
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
