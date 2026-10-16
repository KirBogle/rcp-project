import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const login = () => setIsAuthorized(true);

  return (
    <AuthContext.Provider value={{ isAuthorized, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
