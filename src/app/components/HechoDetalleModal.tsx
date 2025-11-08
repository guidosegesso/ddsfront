"use client";
import React from 'react';
import styles from '../css/Modal.module.css';

type Hecho = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha?: string;
  categoria?: string;
  ubicacion?: { lat: number; lng: number };
  adjuntos?: Array<{ id: string; url: string; tipo: 'imagen' | 'video' }>;
};

export default function HechoDetalleModal({
  open,
  onClose,
  hecho,
  onViewOnMap,
}: {
  open: boolean;
  onClose: () => void;
  hecho: Hecho | null | undefined;
  onViewOnMap?: () => void;
}) {
  if (!open || !hecho) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{hecho.titulo}</h3>
          <button className={styles.close} onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className={styles.content}>
          <p className={styles.meta}><strong>ID:</strong> {hecho.id}</p>
          {hecho.fecha && <p className={styles.meta}><strong>Fecha:</strong> {hecho.fecha}</p>}
          {hecho.categoria && <p className={styles.meta}><strong>Categoría:</strong> {hecho.categoria}</p>}
          {hecho.ubicacion && (
            <p className={styles.meta}>
              <strong>Ubicación:</strong> {hecho.ubicacion.lat.toFixed(4)}, {hecho.ubicacion.lng.toFixed(4)}
            </p>
          )}
          <p className={styles.descripcion}>{hecho.descripcion}</p>

          {!!hecho.adjuntos?.length && (
            <div className={styles.adjuntos}>
              {hecho.adjuntos!.map((a) => (
                <div key={a.id} className={styles.adjuntoItem}>
                  {a.tipo === 'imagen' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.url} alt="Adjunto" />
                  ) : (
                    <video src={a.url} controls />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => { onViewOnMap?.() }}
          >
            Ver en Mapa
          </button>
        </div>
      </div>
    </div>
  );
}
