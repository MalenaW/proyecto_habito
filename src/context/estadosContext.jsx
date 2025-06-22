import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EstadosContext = createContext();

export const useEstados = () => useContext(EstadosContext);

export const EstadosProvider = ({ children }) => {
  const [estados, setEstados] = useState({});

  useEffect(() => {
    cargarEstados();
  }, []);

  const cargarEstados = async () => {
    try {
      const guardados = await AsyncStorage.getItem('estadosAnimo');
      if (guardados) {
        setEstados(JSON.parse(guardados));
      }
    } catch (error) {
      console.error('Error al cargar estados:', error);
    }
  };

  const guardarEstado = async (fecha, emoji) => {
    try {
      const nuevosEstados = { ...estados, [fecha]: emoji };
      setEstados(nuevosEstados);
      await AsyncStorage.setItem('estadosAnimo', JSON.stringify(nuevosEstados));
    } catch (error) {
      console.error('Error al guardar estado:', error);
    }
  };

  const eliminarEstado = async (fecha) => {
    try {
      const nuevosEstados = { ...estados };
      delete nuevosEstados[fecha];
      setEstados(nuevosEstados);
      await AsyncStorage.setItem('estadosAnimo', JSON.stringify(nuevosEstados));
    } catch (error) {
      console.error('Error al eliminar estado:', error);
    }
  };

  return (
    <EstadosContext.Provider value={{
      estados,
      guardarEstado,
      eliminarEstado,
      cargarEstados
    }}>
      {children}
    </EstadosContext.Provider>
  );
};