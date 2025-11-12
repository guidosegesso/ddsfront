"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from '../../../components/SessionContext';
import styles from '../../../css/AdminConfig.module.css';
import { findFuente } from '../../../lib/configData';

function FuenteFormContent() {
  const { role } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');
  const isEdit = Boolean(id);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const fuente = findFuente(id);
      if (fuente) setNombre(fuente.nombre);
    }
  }, [isEdit, id]);

  if (role !== 'Administrador') {
    return (
      <div className={styles.page}>
        <div className={styles.formWrap}>
          <div className={styles.formTitle}>Fuente</div>
          <p>Solo Administradores pueden acceder a este formulario.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.formWrap}>
        <div className={styles.formTitle}>{isEdit ? 'Editar Fuente' : 'Nueva Fuente'}</div>
        <div className={styles.field}>
          <label className={styles.label}>Nombre</label>
          <input className={styles.input} placeholder="Nombre de la fuente" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Hechos</label>
          <div className={styles.drop}>Adjunte los hechos de la fuente</div>
        </div>
        <div className={styles.formActions}>
          <button className={styles.btnPrimary} onClick={() => { alert('Fuente guardada (mock)'); router.back(); }}>Guardar Fuente</button>
          <button className={styles.btnDanger} onClick={() => router.back()}>Cancelar Acción</button>
        </div>
      </div>
    </div>
  );
}

export default function FuenteFormPage() {
  return (
    <Suspense fallback={<div className={styles.page}>Cargando formulario...</div>}>
      <FuenteFormContent />
    </Suspense>
  );
}
