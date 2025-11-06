"use client";
import React from 'react';
import FormHecho from '../../components/FormHecho';
import { useSession } from '../../components/SessionContext';
import formStyles from '../../css/FormHecho.module.css';

// TODO: Implementar integración con backend en entrega 6
// TODO: Validar formularios
// TODO: Cargar datos reales desde API de MetaMapa

export default function CrearHechoPage() {
  const { role } = useSession();

  return (
    <div className={formStyles.pageWrap}>
      <h2>Crear Hecho</h2>
      {role !== 'Contribuyente' && role !== 'Administrador' ? (
        <p style={{ opacity: 0.8 }}>
          Debes iniciar sesión para crear hechos. (UI mock)
        </p>
      ) : (
        <FormHecho />
      )}
    </div>
  );
}
