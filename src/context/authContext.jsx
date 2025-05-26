import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isCargando, setIsCargando] = useState(true);
  
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const guardado = await AsyncStorage.getItem('usuario');
        if (guardado) {
          setUsuario(JSON.parse(guardado));
          console.log("DEBUG Usuario cargado de AsyncStorage:", guardado);
        }
      } catch (error) {
        console.error("DEBUG Error cargando usuario:", error);
      } finally {
      setIsCargando(false); // 
    }
  };
    cargarUsuario();
  }, []);

  const login = async (usuarioInput, password) => {
    if (usuarioInput && password) {
      const datos = { usuario: usuarioInput };
      setUsuario(datos);
      await AsyncStorage.setItem('usuario', JSON.stringify(datos));
      console.log("DEBUG Usuario logueado y guardado:", datos);
    }
  };

  const register = async (usuarioInput, email, password) => {
    if (usuarioInput && email && password) {
      const datos = { usuario: usuarioInput, email };
      setUsuario(datos);
      await AsyncStorage.setItem('usuario', JSON.stringify(datos));
      console.log("DEBUG Usuario registrado y guardado:", datos);
    }
  };

  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem('usuario');
    console.log("DEBU Usuario deslogueado y eliminado de AsyncStorage");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, register, logout, isCargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
