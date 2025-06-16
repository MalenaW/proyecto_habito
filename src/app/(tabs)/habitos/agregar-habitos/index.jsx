import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function AgregarHabitos() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button title="Volver" onPress={() => router.back()} />
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