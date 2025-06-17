import { View, Text, TextInput, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/theme'

export default function CardDeHabito({nombre, descripcion, frecuencia,icono, inicio, fin}) {
  //nombre, descripcion, frecuencia, desde/hasta,
  return (
    <View style= {styles.container}> 
      <Text>Card de Habito</Text>
      <Text>{nombre}</Text>
      <Text>{descripcion}</Text>
      <Text>{frecuencia}</Text>
      <Text>{icono}</Text>
      <Text>{inicio}</Text>
      <Text>{fin}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.background
    },
  })
