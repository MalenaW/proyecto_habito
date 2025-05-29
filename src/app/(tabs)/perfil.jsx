import { View, Text, Button } from 'react-native'

import { useAuth } from '../../context/authContext';
import { COLORS } from '../../constants/theme';
export default function Perfil() {
    const { logout } = useAuth();
    return (
        <View style={styles.container}>
          <Text style={styles.saludo}>
            Perfil
          </Text>
          <Text style={styles.bienvenida}>Aquí podrás ver tu perfil</Text>
          <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Cerrar sesión" onPress={logout} />
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
  },
  button: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  }
};