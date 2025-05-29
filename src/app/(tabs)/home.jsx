import { View, Text, Button } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../context/authContext';

export default function Home() {
  const {  usuario } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>
       ¡Hola {usuario?.usuario ?? ''}!
      </Text>
      <Text style={styles.bienvenida}>Bienvenidx a la app de hábitos 🧠✨</Text>
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