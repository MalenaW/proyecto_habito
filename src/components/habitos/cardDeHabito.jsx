import { View, Text } from 'react-native'

export default function CardDeHabito({nombre, descripcion, icono, color}) {
  //nombre, descripcion, frecuencia, desde/hasta,
  return (
    <View>
      <Text>Card de Habito</Text>
      <Text>{nombre}</Text>
      <Text>{descripcion}</Text>
      <Text>{icono}</Text>
      <Text>{color}</Text>
    </View>
  )
}