import React, { createContext, useContext, useState } from 'react';

const HabitosContext = createContext();

export const useHabitos = () => useContext(HabitosContext);


export const HabitosProvider = ({ children }) => {
  const [habitos, setHabitos] = useState([]);

const agregarHabito = (nuevoHabito) => {
    setHabitos(prev => [...prev, { ...nuevoHabito, id: Date.now().toString() }]);
};

const editarHabito = (id, actualizacion) => {
    setHabitos(prev => prev.map(h => h.id === id ? { ...h, ...actualizacion } : h));
};

const eliminarHabito = (id) => {
    setHabitos(prev => prev.filter(h => h.id !== id));
};

return (
    <HabitosContext.Provider value={{ habitos, agregarHabito, editarHabito, eliminarHabito }}>
      {children}
    </HabitosContext.Provider>
  );
};
