export interface HechoUbicacion {
  latitud: number;
  longitud: number;
}

export interface HechoCreate {
  hecho_etiquetas: string[];
  hecho_estado: string; // e.g. "ORIGINAL"
  hecho_fotos: string[]; // URLs o IDs según backend
  hecho_titulo: string;
  hecho_descripcion: string;
  hecho_categoria: string;
  hecho_direccion: string | null;
  hecho_ubicacion: HechoUbicacion;
  hecho_origen: string; // e.g. "PROVISTO_CONTRIBUYENTE"
}

export interface Hecho {
  id: string | number;
  creadoEn: string;
  actualizadoEn?: string;
  // Agregar campos reales según el backend
}

