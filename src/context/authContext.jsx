import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { usuariosMockInicial } from '../data/usuariosMock';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState(usuariosMockInicial);
  const [isCargando, setIsCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const guardado = await AsyncStorage.getItem('usuario');
        const listaGuardada = await AsyncStorage.getItem('usuarios');
        if (guardado) {
           const usuarioCargado = JSON.parse(guardado);
          setUsuario(JSON.parse(guardado));
             }
        if (listaGuardada) {
          setUsuarios(JSON.parse(listaGuardada));
        }
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los datos");
      } finally {
        setIsCargando(false);
      }
    };
    cargarDatos();
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
    await AsyncStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
  };

  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      setUsuario,
      usuarios,
      setUsuarios,
      login,
      register,
      logout,
      isCargando
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
