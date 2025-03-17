import React, { createContext, useContext, useState, useCallback } from 'react';
import { SessionUser } from '../types/User.js';

interface AuthContextType {
  user: SessionUser | null;
  signIn: (token: string, subscriberId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SessionUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signIn = useCallback((token: string, subscriberId: string) => {
    const sessionUser: SessionUser = {
      id: subscriberId,
      name: `User-${subscriberId.slice(0, 8)}`,
      token,
    };
    setUser(sessionUser);
    localStorage.setItem('user', JSON.stringify(sessionUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
