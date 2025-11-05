"use client";
import React from 'react';
import { useSession } from '../../components/SessionContext';

// TODO: Implementar integración con backend en entrega 6
// TODO: Validar formularios
// TODO: Cargar datos reales desde API de MetaMapa

export default function EstadisticasPage() {
  const { role } = useSession();

  if (role !== 'Administrador') {
    return (
      <div style={{ padding: 16 }}>
        <h2>Estadísticas</h2>
        <p>Solo Administradores pueden acceder a esta vista. (UI mock)</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Estadísticas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div style={{ padding: 16, border: '1px solid #334155', borderRadius: 12 }}>
          <h3>Hechos Totales</h3>
          <p style={{ fontSize: 32 }}>1,245</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #334155', borderRadius: 12 }}>
          <h3>Contribuyentes Activos</h3>
          <p style={{ fontSize: 32 }}>76</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #334155', borderRadius: 12 }}>
          <h3>Solicitudes Pendientes</h3>
          <p style={{ fontSize: 32 }}>12</p>
        </div>
      </div>
    </div>
  );
}

