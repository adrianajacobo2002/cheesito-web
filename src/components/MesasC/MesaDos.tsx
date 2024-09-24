import React from 'react';
import { Card, CardContent } from '@mui/material'; 
import './MesaDos.css'; // Asegúrate de que el archivo CSS esté importado

interface MesaDosProps {
  num_mesa: number;
  estado: 'OCUPADO' | 'DISPONIBLE';
  nombreCliente?: string;
  onClick: () => void; // Agregar el onClick aquí
}

const MesaDos: React.FC<MesaDosProps> = ({ num_mesa, estado, nombreCliente, onClick }) => {
  return (
    <Card
      onClick={onClick}  // Usar el onClick aquí
      className={`mesa-card ${estado === 'OCUPADO' ? 'mesa-ocupada' : 'mesa-disponible'}`}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        backgroundColor: 'transparent', // Quita el fondo de la card
        padding: '20px',
        margin: '10px',
        borderRadius: '20px',
        boxShadow: 'none',
        width: '250px', // Ancho ajustado para mesa de 2 personas
      }}
    >
      <CardContent style={{ padding: 0 }}>
        <div className="mesa-dos-container">
          {/* Asientos superiores */}
          <div className="asientos-superiores-dos">
            <div className="asiento-oval"></div>
          </div>

          {/* La mesa */}
          <div className={`mesa-dos ${estado === 'OCUPADO' ? 'mesa-ocupada' : 'mesa-disponible'}`}>
            <h5 style={{ fontFamily: 'QuickSand, sans-serif', fontWeight: 'bold' }}>Mesa {num_mesa}</h5>
            <p style={{ fontFamily: 'Poppins, sans-serif' }}>{estado === 'OCUPADO' ? nombreCliente : 'Disponible'}</p>
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
