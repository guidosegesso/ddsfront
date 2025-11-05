"use client";
import React, { useState } from 'react';
import { useSession } from '../../components/SessionContext';

// TODO: Implementar integración con backend en entrega 6
// TODO: Validar formularios
// TODO: Cargar datos reales desde API de MetaMapa

export default function ConfiguracionPage() {
  const { role } = useSession();
  const [fuentes] = useState([
    { id: 'F-001', nombre: 'Boletín Oficial' },
    { id: 'F-002', nombre: 'Dataset Público' },
  ]);
  const [colecciones] = useState([
    { id: 'C-001', nombre: 'Obras Públicas' },
    { id: 'C-002', nombre: 'Incidentes Viales' },
  ]);

  if (role !== 'Administrador') {
    return (
      <div style={{ padding: 16 }}>
        <h2>Fuentes y Colecciones</h2>
        <p>Solo Administradores pueden acceder a esta vista. (UI mock)</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Administrar Fuentes y Colecciones</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <section>
          <h3>Fuentes</h3>
          <ul>
            {fuentes.map((f) => (
              <li key={f.id} style={{ margin: '6px 0' }}>
                {f.nombre}
                <div style={{ marginTop: 6 }}>
                  <button style={{ marginRight: 6 }}>Editar</button>
                  <button>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <button>Agregar Fuente</button>
        </section>
        <section>
          <h3>Colecciones</h3>
          <ul>
            {colecciones.map((c) => (
              <li key={c.id} style={{ margin: '6px 0' }}>
                {c.nombre}
                <div style={{ marginTop: 6 }}>
                  <button style={{ marginRight: 6 }}>Editar</button>
                  <button>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <button>Agregar Colección</button>
        </section>
      </div>
    </div>
  );
}

