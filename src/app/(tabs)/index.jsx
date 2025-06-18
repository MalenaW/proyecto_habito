import { View, Text, Button , SafeAreaView, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../context/authContext';
import Clima from '../../components/clima';
import Frases from '../../components/frases';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const {  usuario } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: COLORS.background,
    },
    encabezado: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '25%',
      alignItems: 'stretch',
      width: '100%',
      paddingHorizontal: 10,
    },
    climaContainer: {
      flex: 1,
      marginRight: 5,
    },
    frasesContainer: {
      flex: 1,
      marginLeft: 5,
    },
    contenido: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    saludo: {
      marginTop: 10,
      fontSize: 40,
      fontWeight: 'bold',
      color: COLORS.text
    },
    bienvenida: {
      fontSize: 18,
      color: COLORS.text
    },
    logo: {
      width:250,
      height: 250,
    },
    actionContainer: {
      backgroundColor: COLORS.white,
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: COLORS.secondary,
      padding: 15,
      borderRadius: 20,
      marginTop: 10,
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    }
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.encabezado}>
        <View style={styles.climaContainer}>
          <Clima />
        </View>
        <View style={styles.frasesContainer}>
          <Frases />
        </View>
      </View>
      <View style={styles.contenido}>
        <Text style={styles.saludo}>
        ¡Hola {usuario?.usuario ?? ''}!
        </Text>
        <Text style={styles.bienvenida}>Tu espacio para hábitos saludable</Text>
      <Image source={require('../../../assets/planning.png')} style={styles.logo} />
      <View style={styles.actionContainer}>
        <Text style={styles.bienvenida}>Establece metas diarias, cuida tu bienestar</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/habitos')}>
          <Text style={styles.buttonText}>Agregar Hábito</Text>
        </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  );
} 

