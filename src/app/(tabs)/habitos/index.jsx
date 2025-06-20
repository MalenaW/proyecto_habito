import React, { useState,  } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/theme';
import { useHabitos } from '../../../context/habitoContext';
import { Calendar } from 'react-native-calendars';
import { format, getDay, isAfter , parseISO} from 'date-fns';
import HabitoItem from '../../../components/habito';

export default function Habitos (){
  const hoy = format(new Date(), 'yyyy-MM-dd');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);
  const { habitos, eliminarHabito, editarHabito } = useHabitos();
  const router = useRouter();

  const habitosFiltrados = habitos.filter(h => {
    const fechaSeleccionadaDate = parseISO(fechaSeleccionada);
    const fechaInicioHabito = parseISO(h.fechaInicio);
    
    if (isAfter(fechaInicioHabito, fechaSeleccionadaDate)) {
      return false;
    }
    
    const diaSeleccionado = getDay(fechaSeleccionadaDate);
    const diasSemanaMap = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const diaString = diasSemanaMap[diaSeleccionado];
    
    return h.dias.includes(diaString);
  });

  const handleEdit = (habito) => {
    router.push({
      pathname: '/habitos/crear-habito',  
      params: { 
        habitoId: habito.id,              
        fechaSeleccionada,                
      }
    });
  };


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
        renderItem={({ item }) => <HabitoItem item={item} onEdit={handleEdit} onDelete={eliminarHabito} />}
      />
      <TouchableOpacity
        onPress={() => router.push({
          pathname: '/habitos/crear-habito',
          params: { fechaSeleccionada }
        })}
        style={styles.boton}
      >
        <Text style={styles.botonTexto}>Agregar Hábito</Text>
      </TouchableOpacity>

    </View>

  );
}





const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },
  item: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
    borderRadius: 5,
  },
  boton: {
    marginTop: 20,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
