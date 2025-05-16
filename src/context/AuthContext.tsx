import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { checkAuth } from '../api/api';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const refreshAuth = useCallback(async () => {
    try {
      const ok = await checkAuth();
      setAuthenticated(ok);
    } catch {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
