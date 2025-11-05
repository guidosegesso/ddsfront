"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../../components/SessionContext';
import styles from '../../css/AuthForm.module.css';

// TODO: Implementar integración con backend en entrega 6
// TODO: Validar formularios
// TODO: Cargar datos reales desde API de MetaMapa

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login('Contribuyente');
    router.replace('/');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Iniciar Sesión</div>
      <form onSubmit={submit} className={styles.form}>
        <div className={styles.row}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Contraseña</label>
          <input className={styles.input} placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={styles.actions}>
          <button className={styles.btn} type="submit">Ingresar (mock)</button>
          <button className={styles.btn} type="button" onClick={() => router.push('/auth/registro')}>Ir a Registro</button>
          <button className={styles.btn} type="button" onClick={() => { router.replace('/'); }}>Invitado</button>
        </div>
        <div className={styles.actions}>
          <button className={styles.btn} type="button" onClick={() => { login('Administrador'); router.replace('/'); }}>Entrar como Admin (mock)</button>
        </div>
      </form>
    </div>
  );
}
