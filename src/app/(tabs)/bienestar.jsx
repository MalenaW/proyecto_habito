import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Videos from '../../components/videos';
import Recetas from '../../components/recetas';
import EstadosAnimo from '../../components/bienestar/estadosDeAnimo';

export default function Bienestar() {
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
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.titulo}>Bienestar</Text>
        
        <EstadosAnimo />
        
        <Text style={styles.subtitulo}>Frases favoritas:</Text>

        {favoritas.length === 0 ? (
          <Text style={styles.noFrases}>Todavía no guardaste ninguna frase</Text>
        ) : (
          <View style={styles.frasesContainer}>
            {favoritas.map((item, index) => (
              <View key={index} style={styles.fraseItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.frase}>"{item.q}"</Text>
                  <Text style={styles.autor}>– {item.a}</Text>
                </View>
                <TouchableOpacity onPress={() => borrarFrase(item)}>
                  <Text style={{ color: 'red', fontSize: 18 }}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <Videos />
        <Recetas />
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
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
  noFrases: {
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.subtitle,
    fontStyle: 'italic',
  },
  frasesContainer: {
    marginBottom: 20,
  },
  fraseItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  frase: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
  },
  autor: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.subtitle,
  },
});