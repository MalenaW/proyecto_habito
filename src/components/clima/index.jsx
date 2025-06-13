import { View, Text, Image, StyleSheet } from 'react-native'
import { GetClima } from './getClima';
import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/theme';

export default function Clima() {
  const [clima, setClima] = useState(null);
  const getClima = async () => {
    try{
      const clima = await GetClima(-34.603722, -58.381592);
      setClima(clima);
    } catch (error) {
      console.error("Error al obtener el clima", error);
    }
  }

  useEffect(() => {
    getClima();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      paddingHorizontal: 15, 
      paddingVertical: 15,
      flexDirection: 'row',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    texto: {
      fontSize: 14,
      marginLeft: 6,
      color: COLORS.text,
      fontWeight: 'bold',
      fontStyle: 'italic',
      textTransform: 'capitalize',
    },
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: `https://openweathermap.org/img/wn/${clima?.weather[0]?.icon}.png` }} style={{ width: 50, height: 50 }} />
      <View >
        <Text style={styles.texto}>{clima?.main?.temp}°C</Text>
        <Text style={styles.texto}>{clima?.weather[0]?.description}</Text>
      </View>
    </View>
  )
}