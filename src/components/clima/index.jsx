import { View, Text, Image } from 'react-native'
import { GetClima } from './getClima';
import { useState, useEffect } from 'react';

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
  return (
    <View>
      <Text>El clima es: {clima?.weather[0]?.description}</Text>
      <Text>La temperatura es: {clima?.main?.temp}°C</Text>
      <Image source={{ uri: `https://openweathermap.org/img/wn/${clima?.weather[0]?.icon}.png` }} style={{ width: 100, height: 100 }} />
    </View>
  )
}