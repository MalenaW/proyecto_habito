import { View, Text } from 'react-native'
import CardDeHabito from './cardDeHabito'

export default function ListaDeHabitos() {
  const listaDeHabitos = [
    {
      nombre: 'Habito 1',
      descripcion: 'Descripción 1',
      icono: '🍎',
      color: 'rojo'
    },
    {
      nombre: 'Habito 2',
      descripcion: 'Descripción 2',
      icono: '🍎',
      color: 'rojo'
    },
    {
      nombre: 'Habito 3',
      descripcion: 'Descripción 3',
      icono: '🍎',
      color: 'rojo'
    },
    
  ]
  return (
    <View style={{flex:1}}>
        {listaDeHabitos.map((habito, index) => (
          <CardDeHabito key={index} nombre={habito.nombre} descripcion={habito.descripcion} icono={habito.icono} color={habito.color} />
        ))}
    </View>
  )
}