import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Videos from '../../components/videos';
import Recetas from '../../components/recetas';


export default function Historial() {
  const [favoritas, setFavoritas] = useState([]);

  useEffect(() => {
    const cargarFavoritas = async () => {
      try {
        const data = await AsyncStorage.getItem('frasesFavoritas');
        if (data) {
          setFavoritas(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error al cargar frases favoritas', error);
      }
    };

    cargarFavoritas();
  }, []);

  const borrarFrase = async (frase) => {
    const actualizadas = favoritas.filter(f => !(f.q === frase.q && f.a === frase.a));
    setFavoritas(actualizadas);
    await AsyncStorage.setItem('frasesFavoritas', JSON.stringify(actualizadas));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Bienestar</Text>
      <Text style={styles.subtitulo}>Frases favoritas:</Text>

      {favoritas.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Todavía no guardaste ninguna frase</Text>
      ) : (
        <FlatList
          data={favoritas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.fraseItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.frase}>"{item.q}"</Text>
                <Text style={styles.autor}>– {item.a}</Text>
              </View>
              <TouchableOpacity onPress={() => borrarFrase(item)}>
                <Text style={{ color: 'red', fontSize: 18 }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
<Videos /> 
      <Recetas />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  fraseItem: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  frase: {
    fontSize: 16,
    color: COLORS.text,
  },
  autor: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.subtitle,
  },
});
