"use client";
import React from 'react';
import { useSession } from '../../components/SessionContext';

// TODO: Implementar integración con backend en entrega 6
// TODO: Validar formularios
// TODO: Cargar datos reales desde API de MetaMapa

export default function SolicitudesPage() {
  const { role } = useSession();
  const mockSolicitudes = [
    { id: 'S-001', tipo: 'Alta de Hecho', usuario: 'contrib1', estado: 'Pendiente' },
    { id: 'S-002', tipo: 'Edición de Hecho', usuario: 'contrib2', estado: 'Pendiente' },
  ];

  if (role !== 'Administrador') {
    return (
      <div style={{ padding: 16 }}>
        <h2>Solicitudes Pendientes</h2>
        <p>Solo Administradores pueden acceder a esta vista. (UI mock)</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Solicitudes Pendientes</h2>
      <ul>
        {mockSolicitudes.map((s) => (
          <li key={s.id} style={{ margin: '8px 0' }}>
            <strong>{s.id}</strong> — {s.tipo} — Solicitante: {s.usuario} — {s.estado}
            <div style={{ marginTop: 6 }}>
              <button style={{ marginRight: 8 }}>Aprobar</button>
              <button>Rechazar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

