"use client";
import React from 'react';
import styles from '../css/Filters.module.css';

export type FiltersState = {
  categoria: string | 'Todas';
  fuente: string | 'Todas';
  coleccion: string | 'Todas';
  desde: string; // YYYY-MM-DD
  hasta: string; // YYYY-MM-DD
};

export default function Filters({
  value,
  onChange,
  resultados,
  variant = 'floating',
}: {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  resultados: number;
  variant?: 'floating' | 'inline';
}) {
  return (
    <div className={variant === 'inline' ? styles.inline : styles.panel}>
      {/* <div className={styles.title}>Filtros</div> */}
      <div className={styles.rowFiltros}>
        <label>Categoría</label>
        <select
          value={value.categoria}
          onChange={(e) => onChange({ ...value, categoria: e.target.value })}
        >
          <option value="Todas">Todas</option>
          <option value="Obra">Obra</option>
          <option value="Incidente">Incidente</option>
          <option value="Evento">Evento</option>
          <option value="Dato">Dato</option>
        </select>
      </div>
      <div className={styles.rowFiltros}>
        <label>Fuente</label>
        <select
          value={value.fuente}
          onChange={(e) => onChange({ ...value, fuente: e.target.value })}
        >
          <option value="Todas">Todas</option>
          <option value="Boletín">Boletín</option>
          <option value="Dataset">Dataset</option>
          <option value="Usuario">Usuario</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className={styles.rowFiltros}>
        <label>Colección</label>
        <select
          value={value.coleccion}
          onChange={(e) => onChange({ ...value, coleccion: e.target.value })}
        >
          <option value="Todas">Todas</option>
          <option value="Obras Públicas">Obras Públicas</option>
          <option value="Incidentes Viales">Incidentes Viales</option>
          <option value="Eventos Culturales">Eventos Culturales</option>
          <option value="Infraestructura">Infraestructura</option>
        </select>
      </div>
      <div className={styles.rowFiltrosFechas}>
        <label>Fecha</label>

        <div className={styles.fechaInput}>
          <span>Desde</span>
          <input type="date" value={value.desde} onChange={(e) => onChange({ ...value, desde: e.target.value })} />
        </div>

        <div className={styles.fechaInput}>
          <span>Hasta</span>
          <input type="date" value={value.hasta} onChange={(e) => onChange({ ...value, hasta: e.target.value })} />
        </div>
      </div>
      <div className={styles.footer}>
        {/* <div>{resultados} resultados</div> */}
        <button
          className={styles.reset}
          onClick={() =>
            onChange({ categoria: 'Todas', fuente: 'Todas', coleccion: 'Todas', desde: '', hasta: '' })
          }
        >
          Limpiar
        </button>
        <button
          className={styles.reset}          
        >
          Buscar
        </button>
      </div>

      {/* TODO: Integrar estos filtros con API en entrega 6 (query params, server-side) */}
    </div>
  );
}
