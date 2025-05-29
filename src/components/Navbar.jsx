import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { RUTAS } from '../constants/routes';
import { useRouter, usePathname } from 'expo-router';
import { COLORS } from '../constants/theme';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {RUTAS.map((ruta) => (
        <TouchableOpacity
          key={ruta.ruta}
          style={styles.tab}
          onPress={() => router.push(ruta.ruta)}
        >
          <FontAwesome5
            name={ruta.icono}
            size={24}
            color={pathname === ruta.ruta ? COLORS.white : COLORS.secondary}
          />
          <Text
            style={[
              styles.tabText,
              { color: pathname === ruta.ruta ? COLORS.white : COLORS.secondary },
            ]}
          >
            {ruta.nombre}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 60,
    padding: 5,
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
}); 