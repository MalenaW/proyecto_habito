import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Navbar from '../../components/Navbar';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginBottom: 60, // Espacio para el navbar
  },
}); 