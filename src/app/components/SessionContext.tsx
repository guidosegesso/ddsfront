"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Role = 'Visitante' | 'Contribuyente' | 'Administrador';

interface SessionContextProps {
  role: Role;
  isAuthenticated: boolean;
  login: (role?: Exclude<Role, 'Visitante'>) => void; // default: Contribuyente
  logout: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('Visitante');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('metamapa-role');
      const savedAuth = localStorage.getItem('metamapa-auth');
      if (savedRole === 'Visitante' || savedRole === 'Contribuyente' || savedRole === 'Administrador') {
        setRoleState(savedRole);
      }
      if (savedAuth === 'true') setIsAuthenticated(true);
    } catch {}
  }, []);

  const login = (withRole: Exclude<Role, 'Visitante'> = 'Contribuyente') => {
    setRoleState(withRole);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('metamapa-role', withRole);
      localStorage.setItem('metamapa-auth', 'true');
    } catch {}
  };

  const logout = () => {
    setRoleState('Visitante');
    setIsAuthenticated(false);
    try {
      localStorage.setItem('metamapa-role', 'Visitante');
      localStorage.setItem('metamapa-auth', 'false');
    } catch {}
  };

  return (
    <SessionContext.Provider value={{ role, isAuthenticated, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession debe usarse dentro de SessionProvider');
  return ctx;
}
