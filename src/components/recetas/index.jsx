import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { getRecetasSaludables } from './getRecetas';
import { COLORS } from '../../constants/theme';

export default function Recetas() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const data = await getRecetasSaludables();
        setRecetas(data);
      } catch (error) {
        console.error('Error al cargar recetas', error);
      }
    };

    fetchRecetas();
  }, []);

  if (recetas.length === 0) return null;

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.seccionTitulo}>Recetas saludables</Text>
      <FlatList
        data={recetas}
        keyExtractor={(item) => item.idMeal}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL(`https://www.themealdb.com/meal.php?c=${item.idMeal}`)}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.thumbnail} />
            <Text style={styles.cardTitulo}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.secondary,
    paddingHorizontal: 5,
  },
  card: {
    width: 180,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  thumbnail: {
    width: '100%',
    height: 100,
  },
  cardTitulo: {
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
