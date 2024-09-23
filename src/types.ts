// src/types.ts
export interface Orden {
    nombre_cliente: string;
    estado: 'OCUPADO' | 'POR_PAGAR' | 'CANCELADO';
}
  