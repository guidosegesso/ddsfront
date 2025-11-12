'use client'
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import Map, { Marker } from 'react-map-gl/mapbox-legacy'
import 'mapbox-gl/dist/mapbox-gl.css'
import Navbar from '../navbar/Navbar'
import '../../css/mapa.css'
import metamapaLogo from '../../assets/imgs/metamapa.png'

const MapCanvas = forwardRef(({ features = [], onFeatureClick, search = '', onSearchChange }, ref) => {
  const mapRef = useRef(null)

  // Ajusta el encuadre del mapa cuando cambian los resultados
  useEffect(() => {
    const map = mapRef.current?.getMap?.() || mapRef.current
    if (!map) return

    const padding = 60
    // Argentina bounds aproximados
    const ARG_BOUNDS = [
      [-73.0, -55.2], // SW (lng, lat)
      [-53.0, -21.5], // NE (lng, lat)
    ]

    if (!features || features.length === 0) {
      try { map.fitBounds(ARG_BOUNDS, { padding, duration: 600 }) } catch {}
      return
    }

    if (features.length === 1) {
      const { lat, lng } = features[0].coords
      try { map.flyTo({ center: [lng, lat], zoom: 11, duration: 650 }) } catch {}
      return
    }

    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity
    features.forEach((f) => {
      const { lat, lng } = f.coords || {}
      if (typeof lat !== 'number' || typeof lng !== 'number') return
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
    })

    if (isFinite(minLng) && isFinite(maxLng) && isFinite(minLat) && isFinite(maxLat)) {
      try { map.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding, duration: 650, maxZoom: 12 }) } catch {}
    } else {
      try { map.fitBounds(ARG_BOUNDS, { padding, duration: 600 }) } catch {}
    }
  }, [features])

  // Exponer una API imperativa para centrar el mapa desde afuera
  useImperativeHandle(ref, () => ({
    flyTo: (coords) => {
      const map = mapRef.current?.getMap?.() || mapRef.current
      if (!map || !coords) return
      try {
        map.flyTo({ center: [coords.lng, coords.lat], zoom: 12, duration: 700 })
      } catch {}
    },
    flyToById: (id) => {
      const f = (features || []).find((x) => x.id === id)
      if (f?.coords) {
        const map = mapRef.current?.getMap?.() || mapRef.current
        if (!map) return
        try { map.flyTo({ center: [f.coords.lng, f.coords.lat], zoom: 12, duration: 700 }) } catch {}
      }
    }
  }), [features])
  return (
    <div style={{ position: 'relative', width: '95.42vw', height: '100vh' }}>
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoibHVjaWFub3ZtOTUiLCJhIjoiY21nenB4N2J0MDJzcTJrb2lsa2U4YWxvMSJ9.sY25TNYSzH60rvSyfbsyEg"
        initialViewState={{
          longitude: -58.598268,
          latitude: -34.691543,
          zoom: 3.5
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {features.map((f) => (
          <Marker key={f.id} longitude={f.coords.lng} latitude={f.coords.lat} anchor="bottom">
            <button
              onClick={() => onFeatureClick?.(f)}
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                background: '#e11',
                border: '2px solid #fff',
                boxShadow: '0 0 3px rgba(0,0,0,0.4)',
                cursor: 'pointer'
              }}
              aria-label={`Ver ${f.titulo}`}
            />
          </Marker>
        ))}
      </Map>

      {/* Marca MetaMapa: controlable por CSS (tamaño y lado) */}
      <div className='map-brand'>
        {/* Usamos <img> para permitir control total desde CSS */}
        <img src={(metamapaLogo?.src || metamapaLogo)} alt="MetaMapa" />
      </div>

      <div style={{
        position: 'absolute',
        width: 'auto',
        top: '10px',
        left: '10px',
        zIndex: 10
      }} className='filter-navbar'>
        <Navbar search={search} onSearchChange={onSearchChange} />
      </div>

      <div style={{
        position: 'absolute',
        width: 'auto',
        top: '10px',
        left: '83vw',
        zIndex: 10
      }} className='filter-navbar'>
        <button className='login'>Iniciar Sesión</button>
        <button className='register'>Registrarse</button>
      </div>

      <div style={{
        position: 'absolute',
        width: '100vw',
        top: '85vh',
        left: '91vw',
        zIndex: 10
      }} className='ajustes'>
        <button className='ajuste'>+</button>
        <button className='ajuste'>-</button>
      </div>
    </div>
  )
})

export default MapCanvas
