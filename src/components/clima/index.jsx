import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { GetClima } from './getClima';
import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/theme';
import * as Location from 'expo-location';

export default function Clima() {
  const [clima, setClima] = useState(null);
  const [location, setLocation] = useState(null);
  const [estaCargando, setEstaCargando] = useState(false);


  const getLocation = async () => {
    if(location) return;
    try {
      setEstaCargando(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Necesitamos acceso a tu ubicación para mostrarte el clima local');
        return;
      }

      const locCoords = await Location.getCurrentPositionAsync({});
      setLocation(locCoords);
    } catch (error) {
      console.error("Error al obtener la ubicación", error);
    }
  };

  const getClima = async () => {
    if(!location) return;
    try{
      const clima = await GetClima(location.coords.latitude, location.coords.longitude);
      setClima(clima);
    } catch (error) {
      console.error("Error al obtener el clima", error);
    }finally{
      setEstaCargando(false);
    }
  }
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getClima();
  }, [location]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15, 
      paddingVertical: 15,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    climaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
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
      {estaCargando ? <ActivityIndicator size="large" color={COLORS.primary} /> : (
        <View style={styles.climaContainer}>
          <Image source={{ uri: `https://openweathermap.org/img/wn/${clima?.weather[0]?.icon}.png` }} style={{ width: 50, height: 50 }} />
          <View >
            <Text style={styles.texto}>{clima?.main?.temp}°C</Text>
            <Text style={styles.texto}>{clima?.weather[0]?.description}</Text>
          </View>
      </View>
      )}
    </View>
  )
}