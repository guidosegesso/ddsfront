"use client";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaRegBell, FaRegMap, FaRegEdit, FaRegChartBar, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { VscTools } from 'react-icons/vsc';
import styles from '../css/Toolbar.module.css';
import { useSession } from './SessionContext';

export default function Toolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { role, isAuthenticated, logout } = useSession();

  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        {pathname !== '/' && (
          <button className={styles.icon} onClick={() => router.replace('/')} title="Inicio">
            <FaRegMap />
          </button>
        )}
        {isAuthenticated && (role === 'Contribuyente' || role === 'Administrador') && (
          <button className={styles.icon} onClick={() => router.push('/hecho/nuevo')} title="Crear Hecho">
            <FaRegEdit />
          </button>
        )}
      </div>
      <div className={styles.center}>MetaMapa</div>
      <div className={styles.right}>
        {isAuthenticated && role === 'Administrador' && (
          <>
            <button className={styles.icon} onClick={() => router.push('/admin/solicitudes')} title="Solicitudes Pendientes">
              <FaRegBell />
            </button>
            <button className={styles.icon} onClick={() => router.push('/admin/configuracion')} title="Fuentes y Colecciones">
              <VscTools />
            </button>
            <button className={styles.icon} onClick={() => router.push('/admin/estadisticas')} title="Estadísticas">
              <FaRegChartBar />
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <button className={styles.textBtn} onClick={() => router.push('/auth/login')} title="Iniciar sesión">
              <FaSignInAlt />&nbsp;Ingresar
            </button>
            <button className={styles.textBtn} onClick={() => router.push('/auth/registro')} title="Registrarse">
              <FaUserPlus />&nbsp;Registro
            </button>
          </>
        )}

        {isAuthenticated && (
          <button className={styles.textBtn} onClick={logout} title="Cerrar sesión">
            Salir
          </button>
        )}
      </div>
    </div>
  );
}
