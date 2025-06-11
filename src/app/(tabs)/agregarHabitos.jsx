import { View, Text } from 'react-native';

export default function AgregarHabitos() {
  return (
    <View style={styles.container}>
      <Text>Agregar Hábitos</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};