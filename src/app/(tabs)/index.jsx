import { View, Text, Button } from 'react-native';
import { useAuth } from '../../context/authContext';

export default function HomeTabs() {
  const { logout, usuario } = useAuth();



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenidx a la app de hábitos 🧠✨</Text>
      <Text style={{ marginTop: 10 }}>
        Usuario: {usuario?.usuario ?? 'No definido'}
      </Text>

      <View style={{ marginTop: 30 }}>
        <Button title="Cerrar sesión" onPress={() => {
        
          logout();
        }} />
      </View>
    </View>
  );
}
