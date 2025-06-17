import React, { useState,  } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/theme';
import { useHabitos } from '../../../context/habitoContext';
import { Calendar } from 'react-native-calendars';

export default function Habitos (){
  const link = {
        href: '/crearHabito', label: 'Agregar Hábitos'
  }
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const { habitos } = useHabitos();
  const router = useRouter();

  const habitosFiltrados = habitos.filter(h => h.dias.includes(fechaSeleccionada));

return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 , alignContent: "center"}}>Hábitos del día</Text>
      <Calendar
        onDayPress={(day) => setFechaSeleccionada(day.dateString)}
        markedDates={{
          [fechaSeleccionada]: {
            selected: true,
            marked: true,
            selectedColor: 'blue'
          }
        }}
      />
      
      <FlatList
        data={habitosFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: '#eee', marginVertical: 5 }}>
            <Text>{item.nombre}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => console.log(router.push('/habitos/crear-habito') )}
        style={{ marginTop: 20, backgroundColor: '#007bff', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Agregar Hábito</Text>
      </TouchableOpacity>

    </View>

  );
}





const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.background
    },
    button:{
        backgroundColor: '#2195f3',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 15,
        minWidth:200
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
    }
})