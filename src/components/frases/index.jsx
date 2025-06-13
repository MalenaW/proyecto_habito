import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import GetFrases from './getFrases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/theme';

export default function Frases() {
  const [frase, setFrase] = useState(null);

  useEffect(() => {
    const obtenerFraseDelDia = async () => {
      const hoy = new Date().toISOString().split('T')[0];

      try {
        const guardada = await AsyncStorage.getItem('fraseDelDia');

        if (guardada) {
          const { fecha, frase: fraseGuardada } = JSON.parse(guardada);

          if (fecha === hoy && fraseGuardada) {
            setFrase(fraseGuardada);
            return;
          }
        }

        const nuevaFrase = await GetFrases();
        const fraseDelDia = nuevaFrase[0];

        setFrase(fraseDelDia);
        await AsyncStorage.setItem(
          'fraseDelDia',
          JSON.stringify({ fecha: hoy, frase: fraseDelDia })
        );
      } catch (error) {
        console.error('Error al obtener la frase', error);
      }
    };

    obtenerFraseDelDia();
  }, []);

  if (!frase) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.frase}>{frase.q}</Text>
      <Text style={styles.autor}>– {frase.a}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15, 
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  frase: {
    fontSize: 15, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: COLORS.text,
  },
  autor: {
    fontSize: 16, 
    color: COLORS.subtitle, 
    fontStyle: 'italic',
    textAlign: 'right',
  }
});