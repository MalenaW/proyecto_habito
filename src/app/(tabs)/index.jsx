import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../context/authContext';
import Clima from '../../components/clima';
import Frases from '../../components/frases';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { useEstados } from '../../context/estadosContext';

export default function Home() {
  const { usuario } = useAuth();
  const router = useRouter();
  const hoy = format(new Date(), 'yyyy-MM-dd');
  const { estados } = useEstados();
  const estadoHoy = estados[hoy];
  const obtenerNombreEstado = (emoji) => {
    const estados = {
      '😢': 'Triste',
      '😐': 'Neutro', 
      '😊': 'Bien',
      '😄': 'Feliz',
      '🥳': 'Genial'
    };
    return estados[emoji] || 'Estado';
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.encabezado}>
        <View style={styles.climaContainer}>
          <Clima />
        </View>
        
        <TouchableOpacity 
          onPress={() => router.push('/bienestar')}
        >
          {estadoHoy ? (
            <View style={styles.estadoContainer}>
              <Text style={styles.estadoEmoji}>{estadoHoy}</Text>
              <Text style={styles.estadoTexto}>
                Hoy me siento {obtenerNombreEstado(estadoHoy)}
              </Text>
            </View>
          ) : (
            <View style={styles.estadoVacio}>
              <Text style={styles.estadoTexto}>
                ¿Cómo te sentís? 🤔
              </Text>
            </View>
          )}
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
  },
    encabezado: {
    flexDirection: 'row',
    paddingVertical: 12,
    gap: 10,
    alignItems: 'flex-start',
  },
  climaContainer: {
    flex: 1,
  },
  estadoContainer: {
    backgroundColor: COLORS.white,
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 70,
  },
  estadoVacio: {
    backgroundColor: COLORS.white,
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
  },
  estadoEmoji: {
    fontSize: 24,
    marginBottom: 2,
  },
  estadoTexto: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
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
    bottom: 70, 
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