import React from 'react';
import { Card, CardContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './MesaSeis.css'; // Asegúrate de que el archivo CSS esté importado

interface MesaSeisProps {
  num_mesa: number;
  estado: 'OCUPADO' | 'DISPONIBLE';
  nombreCliente?: string;
  onDelete: () => void; // Callback para eliminar la mesa
}

const MesaSeis: React.FC<MesaSeisProps> = ({
  num_mesa,
  estado,
  nombreCliente,
  onDelete,
}) => {
  const handleClick = () => {
    console.log(`Mesa 6 está ${estado}`);
  };

  return (
    <Card
      onClick={handleClick}
      className={`mesa-card ${estado === 'OCUPADO' ? 'mesa-ocupada' : 'mesa-disponible'}`}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        backgroundColor: 'transparent',
        padding: '20px',
        margin: '10px',
        borderRadius: '20px',
        boxShadow: 'none',
        width: '400px', // Ancho ajustado para la mesa de 6 personas
      }}
    >
      <CardContent style={{ padding: 0 }}>
        <div className="mesa-seis-container">
          {/* Asientos superiores */}
          <div className="asientos-superiores">
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
          </div>

          {/* La mesa */}
          <div className={`mesa-seis ${estado === 'OCUPADO' ? 'mesa-ocupada' : 'mesa-disponible'}`}>
            <h3>
              Mesa {num_mesa}
              <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </h3>
            <p>{estado === 'OCUPADO' ? nombreCliente : 'Disponible'}</p>
          </div>

          {/* Asientos inferiores */}
          <div className="asientos-inferiores">
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MesaSeis;
