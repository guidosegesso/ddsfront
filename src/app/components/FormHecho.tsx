"use client";
import React, { useState } from 'react';
import styles from '../css/FormHecho.module.css';
import UploadAdjunto from './UploadAdjunto';

export type HechoInput = {
  titulo: string;
  descripcion: string;
  fecha?: string;
  categoria?: string;
  lat?: string;
  lng?: string;
  fuentes?: string;
};

export default function FormHecho({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<HechoInput>;
  onSubmit?: (data: HechoInput) => void;
}) {
  const [form, setForm] = useState<HechoInput>({
    titulo: initialData?.titulo || '',
    descripcion: initialData?.descripcion || '',
    fecha: initialData?.fecha || '',
    categoria: initialData?.categoria || '',
    lat: initialData?.lat || '',
    lng: initialData?.lng || '',
    fuentes: initialData?.fuentes || '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
    alert('Guardado (mock)');
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}>
        <label>Título</label>
        <input
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          placeholder="Título del hecho"
          required
        />
      </div>
      <div className={styles.row}>
        <label>Descripción</label>
        <textarea
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          placeholder="Describe el hecho"
          rows={4}
        />
      </div>
      <div className={styles.grid2}>
        <div className={styles.row}>
          <label>Fecha</label>
          <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
        </div>
        <div className={styles.row}>
          <label>Categoría</label>
          <input value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
        </div>
      </div>
      <div className={styles.grid2}>
        <div className={styles.row}>
          <label>Latitud</label>
          <input value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} />
        </div>
        <div className={styles.row}>
          <label>Longitud</label>
          <input value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} />
        </div>
      </div>
      <div className={styles.row}>
        <label>Fuentes</label>
        <textarea
          value={form.fuentes}
          onChange={(e) => setForm({ ...form, fuentes: e.target.value })}
          placeholder="URLs o referencias"
          rows={3}
        />
      </div>

      <UploadAdjunto />

      <div className={styles.actions}>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
}
