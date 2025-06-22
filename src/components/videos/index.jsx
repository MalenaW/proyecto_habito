import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { COLORS } from '../../constants/theme';

const videos = [
  {
    titulo: 'Meditación guiada para dormir',
    thumbnail: 'https://i.ytimg.com/vi/1vx8iUvfyCY/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY'
  },
  {
    titulo: 'Yoga suave para ansiedad',
    thumbnail: 'https://i.ytimg.com/vi/4pLUleLdwY4/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=4pLUleLdwY4'
  },
  {
    titulo: 'Relajación con música',
    thumbnail: 'https://i.ytimg.com/vi/2OEL4P1Rz04/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=2OEL4P1Rz04'
  }
];

export default function Videos() {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.seccionTitulo}>Videos de relajación</Text>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL(item.url)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
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
