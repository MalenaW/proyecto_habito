import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../context/authContext';
import Clima from '../../components/clima';
import Frases from '../../components/frases';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const { usuario } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: COLORS.background,
      paddingHorizontal: 15,
    },
    climaContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    contenido: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    saludo: {
      fontSize: 36, 
      fontWeight: 'bold',
      color: COLORS.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    bienvenida: {
      fontSize: 18,
      color: COLORS.text,
      textAlign: 'center',
      marginBottom: 30,
    },
    logo: {
      width: 180, 
      height: 180,
      marginBottom: 20,
    },
    
    buttonFlotante: {
      position: 'absolute',
      bottom: 80, 
      right: 20,
      backgroundColor: COLORS.secondary,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    buttonFlotanteText: {
      color: COLORS.white,
      fontSize: 24,
      fontWeight: 'bold',
    },
    
    motivacion: {
      backgroundColor: COLORS.white,
      padding: 15,
      borderRadius: 12,
      marginTop: 20,
      marginHorizontal: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    motivacionText: {
      fontSize: 16,
      color: COLORS.text,
      textAlign: 'center',
      fontStyle: 'italic',
    },
    
    frasesMovidas: {
      width: '100%',
      maxWidth: 320,
      marginTop: 10,
    }
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.encabezado}>
        <View style={styles.climaContainer}>
          <Clima />
        </View>
      </View>
      
      <View style={styles.contenido}>
        <Text style={styles.saludo}>
          ¡Hola {usuario?.usuario ?? ''}!
        </Text>
        <Text style={styles.bienvenida}>
          Tu espacio para hábitos saludables
        </Text>
        
        <Image 
          source={require('../../../assets/planning.png')} 
          style={styles.logo} 
        />
        
        <View style={styles.frasesMovidas}>
          <Frases />
        </View>
      </View>
      
      <View style={styles.motivacion}>
        <Text style={styles.motivacionText}>
          "Cada pequeño paso cuenta hacia una vida más saludable"
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.buttonFlotante} 
        onPress={() => router.push('/habitos')}
      >
        <Text style={styles.buttonFlotanteText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}