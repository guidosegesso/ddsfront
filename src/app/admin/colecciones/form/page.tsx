"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from '../../../components/SessionContext';
import styles from '../../../css/AdminConfig.module.css';
import { findColeccion } from '../../../lib/configData';

const CATEGORIAS = ['Robos', 'Obras', 'Incidentes', 'Eventos', 'Dato'];
const ALGORITMOS = ['may_simple', 'prioridad_alta', 'relevancia'];

function ColeccionFormContent() {
  const { role } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ titulo: '', descripcion: '', categoria: '', algoritmo: '', fuente: '' });

  useEffect(() => {
    if (isEdit && id) {
      const data = findColeccion(id);
      if (data) {
        setForm({
          titulo: data.nombre,
          descripcion: data.descripcion,
          categoria: data.categoria,
          algoritmo: data.algoritmo,
          fuente: data.fuente,
        });
      }
    }
  }, [isEdit, id]);

  if (role !== 'Administrador') {
    return (
      <div className={styles.page}>
        <div className={styles.formWrap}>
          <div className={styles.formTitle}>Colección</div>
          <p>Solo Administradores pueden acceder a este formulario.</p>
        </div>
      </div>
    );
  }

  const setField = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className={styles.page}>
      <div className={styles.formWrap}>
        <div className={styles.formTitle}>{isEdit ? 'Editar Colección' : 'Nueva Colección'}</div>
        <div className={styles.field}>
          <label className={styles.label}>Título</label>
          <input className={styles.input} placeholder="Colección de ..." value={form.titulo} onChange={(e) => setField('titulo', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Descripción</label>
          <textarea className={styles.textarea} placeholder="Es una colección sobre..." value={form.descripcion} onChange={(e) => setField('descripcion', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Categoría</label>
          <select className={styles.select} value={form.categoria} onChange={(e) => setField('categoria', e.target.value)}>
            <option value="">Selecciona una categoría</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Algoritmo</label>
          <select className={styles.select} value={form.algoritmo} onChange={(e) => setField('algoritmo', e.target.value)}>
            <option value="">Selecciona un algoritmo</option>
            {ALGORITMOS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Fuente</label>
          <input className={styles.input} placeholder="Ej: unicornio.com" value={form.fuente} onChange={(e) => setField('fuente', e.target.value)} />
        </div>
        <div className={styles.formActions}>
          <button className={styles.btnPrimary} onClick={() => { alert('Colección guardada (mock)'); router.back(); }}>Guardar Colección</button>
          <button className={styles.btnDanger} onClick={() => router.back()}>Cancelar Acción</button>
        </div>
      </div>
    </div>
  );
}

export default function ColeccionFormPage() {
  return (
    <Suspense fallback={<div className={styles.page}>Cargando formulario...</div>}>
      <ColeccionFormContent />
    </Suspense>
  );
}
