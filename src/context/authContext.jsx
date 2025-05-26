import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (usuarioInput, password) => {
    if (usuarioInput && password) {
      console.log("DEBUG Login:", usuarioInput);
      setUsuario({ usuario: usuarioInput });
    }
  };

  const register = (usuarioInput, email, password) => {
    if (usuarioInput && email && password) {
      console.log("DEBUG Registro:", usuarioInput, email);
      setUsuario({ usuario: usuarioInput, email });
    }
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
