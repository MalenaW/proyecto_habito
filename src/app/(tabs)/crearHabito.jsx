import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, TouchableOpacity,
  StyleSheet, ScrollView,
  Pressable
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Link, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { COLORS } from '../../constants/theme';
import CrearHabitos from '../../components/habitos/crearHabitos';
import { useHabitos } from '../../context/habitoContext';

export default function CrearHabito(){

  

    const link = {
       href: '/habito', label:' Volver'
     }
      const router = useRouter();
         const [nombre, setNombre] = useState('');
         const [motivacion, setMotivacion] = useState('');
         const [dias, setDias] = useState([]);
         const { agregarHabito } = useHabitos();
        
     
       const diasSemana = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
     
       const toggleDia = (dia) => {
         setDias(prev =>
           prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
         );
       };
     
       const handleGuardar = () => {
         const fechaHoy = new Date().toISOString().split('T')[0];
     
         agregarHabito({
           nombre,
           motivacion,
           dias: [fechaHoy], 
           repeticionesPorDia: 1,
           fechaInicio: fechaHoy
         });
     
         router.replace('/habito')
        }
     
 
  return(
  
      <View style = {styles.container}>
          <Text style={{ fontWeight: 'bold' }}>Nombre del hábito</Text>
      <TextInput value={nombre} onChangeText={setNombre} style={{ borderBottomWidth: 1 }} />

      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Motivación</Text>
      <TextInput value={motivacion} onChangeText={setMotivacion} style={{ borderBottomWidth: 1 }} />

      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Días</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {diasSemana.map(dia => (
          <TouchableOpacity
            key={dia}
            onPress={() => toggleDia(dia)}
            style={{
              padding: 8,
              margin: 4,
              backgroundColor: dias.includes(dia) ? '#007bff' : '#ccc',
              borderRadius: 5
            }}
          >
            <Text style={{ color: dias.includes(dia) ? '#fff' : '#000' }}>{dia}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleGuardar}
        style={{ marginTop: 30, backgroundColor: 'green', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Guardar hábito</Text>
      </TouchableOpacity>
      <CrearHabitos/>
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