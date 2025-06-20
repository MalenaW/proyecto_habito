import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAfter, addMinutes } from 'date-fns';

const CLIMA_KEY = 'clima_data';
const LOCATION_KEY = 'location_data';
const TIMESTAMP_KEY = 'clima_timestamp';

export const climaCache = {
  guardar: async (climaData, locationData) => {
    try {
      await AsyncStorage.setItem(CLIMA_KEY, JSON.stringify(climaData));
      await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(locationData));
      await AsyncStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
    } catch (error) {
      console.log('Error guardando en caché:', error);
    }
  },

  cargar: async () => {
    try {
      const climaGuardado = await AsyncStorage.getItem(CLIMA_KEY);
      const locationGuardada = await AsyncStorage.getItem(LOCATION_KEY);
      const timestamp = await AsyncStorage.getItem(TIMESTAMP_KEY);
      
      if (!climaGuardado || !timestamp) {
        return null;
      }
      
      const fechaGuardada = new Date(timestamp);
      const fechaExpiracion = addMinutes(fechaGuardada, 10);
      const ahora = new Date();
      
      if (isAfter(ahora, fechaExpiracion)) {
        return null;
      }
      
      return {
        clima: JSON.parse(climaGuardado),
        location: locationGuardada ? JSON.parse(locationGuardada) : null
      };
    } catch (error) {
      console.log('Error cargando caché:', error);
      return null;
    }
  },
};