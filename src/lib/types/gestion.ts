export interface Solicitud {
  id: string | number;
  estado: string; // e.g. PENDIENTE | APROBADA | RECHAZADA
  creadoEn: string;
}

export interface SolicitudCreate {
  // Ajustar a la API real
  tipo: string;
  payload: Record<string, any>;
}

export interface Coleccion {
  id: string | number;
  nombre: string;
}

export interface ColeccionCreate {
  nombre: string;
  descripcion?: string;
}

export type EstadisticaRespuesta = any; // Ajustar cuando se conozca el shape real

