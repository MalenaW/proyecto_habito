import { View, Text, Button } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../context/authContext';
import Clima from '../../components/clima';
import Frases from '../../components/frases';
import { useRouter } from 'expo-router';

export default function Home() {
  const {  usuario } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Clima />
      <Frases />

      <Text style={styles.saludo}>
       ¡Hola {usuario?.usuario ?? ''}!
      </Text>
      <Text style={styles.bienvenida}>Bienvenidx a la app de hábitos 🧠✨</Text>
      <View style={styles.buttonContainer}>
      <Text style={styles.bienvenida}>Empezá a crear tus hábitos</Text>
        <Button title="Agregar Hábito" onPress={() => router.push('/agregarHabitos')} />
      </View>
    </View>
  );
} 

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  saludo: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text
  },
  bienvenida: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text
  }
};