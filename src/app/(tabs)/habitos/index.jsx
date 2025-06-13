import { View, Text } from 'react-native';
import { useAuth } from '../../../context/authContext';
import { COLORS } from '../../../constants/theme';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function Habitos() {
const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>
       Tus hábitos
      </Text>
      <Text style={styles.bienvenida}>Aquí podrás gestionar tus hábitos diarios</Text>
      <View style={styles.buttonContainer}>
      <Text style={styles.bienvenida}>Empezá a crear tus hábitos</Text>
        <Button title="Agregar Hábito" onPress={() => router.navigate('/habitos/agregar-habitos')} />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text
  }
};