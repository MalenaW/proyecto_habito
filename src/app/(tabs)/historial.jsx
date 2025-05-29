import { View, Text } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function Historial() {
  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>
        Historial de hábitos
      </Text>
      <Text style={styles.bienvenida}>Aquí podrás ver tu historial de hábitos</Text>
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