import React from 'react';
import { Card, CardContent } from '@mui/material'; 
import './MesaCuatro.css'; // Asegúrate de que el archivo CSS esté importado

interface MesaCuatroProps {
  num_mesa: number;
  estado: 'OCUPADO' | 'DISPONIBLE';
  nombreCliente?: string;
  onClick: () => void; // Agregar el onClick aquí
}

const MesaCuatro: React.FC<MesaCuatroProps> = ({ num_mesa, estado, nombreCliente, onClick }) => {
  return (
    <Card
      onClick={onClick}  // Usar el onClick aquí
      className={`mesa-card ${estado === 'OCUPADO' ? 'mesa-ocupada' : 'mesa-disponible'}`}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        backgroundColor: 'transparent',
        padding: '20px',
        margin: '10px',
        borderRadius: '20px',
        boxShadow: 'none',
        width: '300px',
      }}
    >
      <CardContent style={{ padding: 0 }}>
        <div className="mesa-cuatro-container">
          {/* Asientos superiores */}
          <div className="asientos-superiores">
            <div className="asiento-oval"></div>
            <div className="asiento-oval"></div>
          </div>
          <div className={`mesa-cuatro ${estado === 'OCUPADO' ? 'mesa-ocupada' : 'mesa-disponible'}`}>
            <h5 style={{ fontFamily: 'QuickSand, sans-serif', fontWeight: 'bold' }}>Mesa {num_mesa}</h5>
            <p style={{ fontFamily: 'Poppins, sans-serif' }}>{estado === 'OCUPADO' ? nombreCliente : 'Disponible'}</p>
          </div>
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
