import React, { createContext, useContext, useState } from 'react';

const HabitosContext = createContext();

export const useHabitos = () => useContext(HabitosContext);


export const HabitosProvider = ({ children }) => {
  const [habitos, setHabitos] = useState([]);
  const [habitosCumplidos, setHabitosCumplidos] = useState({});

const agregarHabito = (nuevoHabito) => {
    setHabitos(prev => [...prev, { ...nuevoHabito, id: Date.now().toString() }] );
};

const editarHabito = (id, actualizacion) => {
    setHabitos(prev => prev.map(h => h.id === id ? { ...h, ...actualizacion } : h));
};

const eliminarHabito = (id) => {
    setHabitos(prev => prev.filter(h => h.id !== id));
};

const marcarHabitoComoCumplido = (fecha, habitoId) => {
  setHabitosCumplidos(prev => {
    const prevDia = prev[fecha] || [];
    const actualizado = prevDia.includes(habitoId)
      ? prevDia.filter(id => id !== habitoId)
      : [...prevDia, habitoId];

    return { ...prev, [fecha]: actualizado };
  });
};

const habitoEstaCumplido = (fecha, habitoId) => {
  return (habitosCumplidos[fecha] || []).includes(habitoId);
};



return (
    <HabitosContext.Provider value={{ habitos, agregarHabito, editarHabito, eliminarHabito, habitoEstaCumplido, marcarHabitoComoCumplido }}>
      {children}
    </HabitosContext.Provider>
  );
};
