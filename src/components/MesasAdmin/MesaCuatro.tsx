import React from "react";
import { Card, CardContent } from "@mui/material";
import "./MesaCuatro.css"; // Asegúrate de que el archivo CSS esté importado

interface MesaCuatroProps {
  num_mesa: number;
  estado: "OCUPADO" | "DISPONIBLE";
  nombreCliente?: string;
}

const MesaCuatro: React.FC<MesaCuatroProps> = ({
  num_mesa,
  estado,
  nombreCliente,
}) => {
  const handleClick = () => {
    console.log(`Mesa 4 está ${estado}`);
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
        width: "300px", // Ancho ajustado para mesa de 4 personas
      }}
    >
      <CardContent style={{ padding: 0 }}>
        <div className="mesa-cuatro-container">
          {/* Asientos superiores */}
          <div className="asientos-superiores">
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
          </div>

          {/* La mesa */}
          <div
            className={`mesa-cuatro ${estado === "OCUPADO" ? "mesa-ocupada" : "mesa-disponible"}`}
          >
            <h3>Mesa {(num_mesa = num_mesa)}</h3>
            <p>{estado === "OCUPADO" ? nombreCliente : "Disponible"}</p>
          </div>

          {/* Asientos inferiores */}
          <div className="asientos-inferiores">
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MesaCuatro;
