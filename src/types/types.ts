// src/types/types.ts

export interface Platillo {
    id_platillos: number;
    nombre: string;
    precio: number;
    tipo: string; // Puede ser 'COMIDA' o 'BEBIDA'
    image_url: string;
  }
  
  export interface PlatilloDisponible {
    id_inventario: number;
    cantidad_disponible: number;
    platillo: Platillo;
  }
  