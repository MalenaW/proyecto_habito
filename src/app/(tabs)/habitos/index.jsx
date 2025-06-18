import React, { useState,  } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/theme';
import { useHabitos } from '../../../context/habitoContext';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';

export default function Habitos (){
  const hoy = format(new Date(), 'yyyy-MM-dd');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);
  const { habitos } = useHabitos();
  const router = useRouter();

  const habitosFiltrados = habitos.filter(h => h.fechaInicio === fechaSeleccionada);

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
        {habitosFiltrados.length === 0 && <Text>No hay hábitos para este día</Text>}
      </View>
      
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
        onPress={() => router.push({
          pathname: '/habitos/crear-habito',
          params: { fechaSeleccionada }
        })}
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