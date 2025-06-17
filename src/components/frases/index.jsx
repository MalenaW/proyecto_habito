import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import GetFrases from './getFrases';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { translate } from '@vitalets/google-translate-api';


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
 // const { text } =  translate(frase.q, { to: 'es' });

  return (
    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>{frase.q}</Text>
      <Text style={{ fontSize: 14, color: '#555', marginTop: 4 }}>– {frase.a}</Text>
    </View>
  );
}