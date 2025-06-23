import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useEstados } from '../../context/estadosContext';
import { COLORS } from '../../constants/theme';
import { format } from 'date-fns';

const emojis = [
  { emoji: '😢', nombre: 'Triste' },
  { emoji: '😐', nombre: 'Neutro' },
  { emoji: '😊', nombre: 'Bien' },
  { emoji: '😄', nombre: 'Feliz' },
  { emoji: '🥳', nombre: 'Genial' }
];

export default function EstadosAnimo() {
  const { estados, guardarEstado, eliminarEstado } = useEstados();
  const [mostrarSelector, setMostrarSelector] = useState(false);
  
  const hoy = format(new Date(), 'yyyy-MM-dd');
  const estadoHoy = estados[hoy];

  const seleccionarEmoji = async (emoji) => {
    await guardarEstado(hoy, emoji);
    setMostrarSelector(false);
    Alert.alert('', `Estado guardado: ${emoji}`);
  };

  const eliminarEstadoHoy = async () => {
    Alert.alert(
      'Eliminar estado',
      '¿Querés eliminar tu estado de hoy?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            await eliminarEstado(hoy);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¿Cómo te sentís hoy?</Text>
      
      {estadoHoy ? (
        <View style={styles.estadoActual}>
          <Text style={styles.emojiGrande}>{estadoHoy}</Text>
          <TouchableOpacity 
            style={styles.botonCambiar}
            onPress={() => setMostrarSelector(true)}
          >
            <Text style={styles.textoBoton}>Cambiar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.botonEliminar}
            onPress={eliminarEstadoHoy}
          >
            <Text style={styles.textoBoton}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.botonAgregar}
          onPress={() => setMostrarSelector(true)}
        >
          <Text style={styles.textoBoton}>Seleccionar estado</Text>
        </TouchableOpacity>
      )}

      {mostrarSelector && (
        <View style={styles.selector}>
          <Text style={styles.subtitulo}>Seleccioná tu estado:</Text>
          <View style={styles.emojisContainer}>
            {emojis.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.emojiBoton}
                onPress={() => seleccionarEmoji(item.emoji)}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.nombreEmoji}>{item.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity 
            style={styles.botonCancelar}
            onPress={() => setMostrarSelector(false)}
          >
            <Text style={styles.textoBoton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 15,
    textAlign: 'center',
  },
  estadoActual: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiGrande: {
    fontSize: 40,
  },
  botonCambiar: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  botonEliminar: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  botonAgregar: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
  selector: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emojisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  emojiBoton: {
    alignItems: 'center',
    padding: 8,
  },
  emoji: {
    fontSize: 30,
  },
  nombreEmoji: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  botonCancelar: {
    backgroundColor: '#888',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
});