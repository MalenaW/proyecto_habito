import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { usuariosMockInicial } from '../data/usuariosMock';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // 
  const [usuarios, setUsuarios] = useState(usuariosMockInicial); // 
  const [isCargando, setIsCargando] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const guardado = await AsyncStorage.getItem('usuario');
        if (guardado) {
          setUsuario(JSON.parse(guardado));
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar la sesión");
      } finally {
        setIsCargando(false);
      }
    };
    cargarUsuario();
  }, []);

  const login = async (usuarioInput, passwordInput) => {
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuarioInput && u.password === passwordInput
    );

    if (!usuarioEncontrado) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
      return;
    }

    setUsuario(usuarioEncontrado);
    await AsyncStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
  };

  const register = async (usuarioInput, email, passwordInput) => {
    const yaExiste = usuarios.some((u) => u.usuario === usuarioInput);

    if (yaExiste) {
      Alert.alert("Error", "Ese usuario ya está registrado");
      return;
    }

    const nuevoUsuario = {
      usuario: usuarioInput,
      email,
      password: passwordInput
    };

    const nuevosUsuarios = [...usuarios, nuevoUsuario];
    setUsuarios(nuevosUsuarios);
    setUsuario(nuevoUsuario);
    await AsyncStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  };

  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, register, logout, isCargando,setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

