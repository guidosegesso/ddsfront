'use client'
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import MapCanvas from './components/Map/mapCanvas';
import HechoDetalleModal from './components/HechoDetalleModal';
import Filters, { FiltersState } from './components/Filters';
import { MOCK_HECHOS, HechoFeature } from './components/Map/dataMocks';
import ResultsPanel from './components/ResultsPanel';
import styles from './css/Home.module.css';

// TODO: Implementar integración con backend en entrega 6
// TODO: Validar formularios
// TODO: Cargar datos reales desde API de MetaMapa

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [seleccionado, setSeleccionado] = useState<HechoFeature | null>(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState>({
    categoria: 'Todas',
    fuente: 'Todas',
    coleccion: 'Todas',
    desde: '',
    hasta: '',
  });
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sideWidth, setSideWidth] = useState<number>(360);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(360);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const delta = e.clientX - startXRef.current;
      const next = Math.max(320, startWidthRef.current + delta);
      setSideWidth(next);
    };
    const onUp = () => { draggingRef.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // En entrega 6 esto se reemplaza por datos desde API + filtros server-side.
  const hechos = MOCK_HECHOS;
  const filtrados = useMemo(() => {
    const term = search.trim().toLowerCase();
    return hechos.filter((h) => {
      if (filters.categoria !== 'Todas' && h.categoria !== filters.categoria) return false;
      if (filters.fuente !== 'Todas' && h.fuente !== filters.fuente) return false;
      if (filters.coleccion !== 'Todas' && h.coleccion !== filters.coleccion) return false;
      if (filters.desde && h.fechaISO < filters.desde) return false;
      if (filters.hasta && h.fechaISO > filters.hasta) return false;
      if (term && !h.titulo.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [hechos, filters, search]);

  const hechoSeleccionado = seleccionado
    ? {
        id: seleccionado.id,
        titulo: seleccionado.titulo,
        descripcion: seleccionado.descripcion,
        fecha: seleccionado.fechaISO,
        categoria: seleccionado.categoria,
        ubicacion: seleccionado.coords,
        adjuntos: [],
      }
    : null;

  return (
    <div className={styles.container}>
      <aside className={styles.side} style={{ width: sideWidth }}>
        <div className={styles.headerRow}>
          <div className={styles.sectionTitle}>Filtros</div>
          <button
            className={`${styles.toggle} ${filtersOpen ? styles.toggleActive : ''}`}
            onClick={() => setFiltersOpen((v) => !v)}
            aria-label={filtersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            title={filtersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
          >
            {filtersOpen ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {filtersOpen && (
          <Filters value={filters} onChange={setFilters} resultados={filtrados.length} variant="inline" />
        )}
        <div className={styles.sectionTitle}>Hechos</div>
        <ResultsPanel
          items={filtrados}
          onPick={(id) => {
            const f = filtrados.find((x) => x.id === id) || null;
            if (f) { setSeleccionado(f); setShowModal(true); }
          }}
          variant="inline"
          expanded={!filtersOpen}
        />
      </aside>
      <div
        className={styles.resizer}
        onMouseDown={(e) => {
          draggingRef.current = true;
          startXRef.current = e.clientX;
          startWidthRef.current = sideWidth;
        }}
        aria-label="Redimensionar panel"
        role="separator"
      />
      <section className={styles.map}>
        <MapCanvas
          ref={mapRef}
          features={filtrados}
          search={search}
          onSearchChange={setSearch}
          onFeatureClick={(f) => {
            setSeleccionado(f);
            setShowModal(true);
          }}
        />
      </section>

      <HechoDetalleModal
        open={showModal}
        onClose={() => setShowModal(false)}
        hecho={hechoSeleccionado}
        onViewOnMap={() => {
          const coords = hechoSeleccionado?.ubicacion;
          if (coords) {
            mapRef.current?.flyTo?.(coords);
            setShowModal(false);
          }
        }}
      />
    </div>
  );
}























































































/*
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
*/
