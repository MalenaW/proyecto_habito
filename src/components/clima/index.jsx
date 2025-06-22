// src/components/clima/index.jsx - VERSIÓN COMPACTA
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { GetClima } from './getClima';
import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/theme';
import * as Location from 'expo-location';
import { climaCache } from './climaCache';

export default function Clima() {
  const [clima, setClima] = useState(null);
  const [location, setLocation] = useState(null);
  const [estaCargando, setEstaCargando] = useState(false);
  
  useEffect(() => {
    pedirClima();
  }, []);

  useEffect(() => {
    if (location && !clima) {
      getClima();
    }
  }, [location]);

  const pedirClima = async () => {
    const datosCache = await climaCache.cargar();
    
    if (datosCache) {
      setClima(datosCache.clima);
      setLocation(datosCache.location);
    } else {
      getLocation();
    }
  };

  const getLocation = async () => {
    if(location) return;
    try {
      setEstaCargando(true);
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      
      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
      }

      const locCoords = await Location.getCurrentPositionAsync({});
      setLocation(locCoords);
    } catch (error) {
      console.error("Error al obtener la ubicación", error);
      Alert.alert('Error', 'No se pudo obtener la ubicación. Verifica que tengas GPS activado.');
    } finally {
      setEstaCargando(false);
    }
  };

  const getClima = async () => {
    if(!location) return;
    try{
      setEstaCargando(true);
      const climaData = await GetClima(location.coords.latitude, location.coords.longitude);
      setClima(climaData);
      
      await climaCache.guardar(climaData, location);
      
    } catch (error) {
      console.error("Error al obtener el clima", error);
    } finally {
      setEstaCargando(false);
    }
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      padding: 8,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    contenido: {
      flexDirection: 'row',
      alignItems: 'center',
    },
 
    temp: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    descripcion: {
      fontSize: 12,
      color: COLORS.subtitle,
      textTransform: 'capitalize',
    },
    ciudad: {
      fontSize: 11,
      color: COLORS.subtitle,
      fontWeight: '500',
    },
  });

  const climaRedondeado = Math.round(clima?.main?.temp);

  return (
    clima && (
      <View style={styles.container}>
        {estaCargando ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <View style={styles.contenido}>
            <Image 
              source={{ uri: `https://openweathermap.org/img/wn/${clima?.weather[0]?.icon}.png` }} 
              style={{ width: 40, height: 40 }} 
            />
            <View style={styles.info}>
              <Text style={styles.temp}>{climaRedondeado}°C</Text>
              <Text style={styles.descripcion}>{clima?.weather[0]?.description}</Text>
              <Text style={styles.ciudad}>{clima?.name}</Text>
            </View>
          </View>
        )}
      </View>
    )
  );
}