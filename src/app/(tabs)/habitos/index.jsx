import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/theme';
import { useHabitos } from '../../../context/habitoContext';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';

export default function Habitos() {
  const hoy = format(new Date(), 'yyyy-MM-dd');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);
  const { habitos } = useHabitos();
  const router = useRouter();

  const habitosFiltrados = habitos.filter(h => h.fechaInicio === fechaSeleccionada);

  const fechasConHabitos = habitos.reduce((acc, habito) => {
    if (!acc[habito.fechaInicio]) {
      acc[habito.fechaInicio] = {
        marked: true,
        dotColor: 'green', 
      };
    }
    return acc;
  }, {});

  if (fechasConHabitos[fechaSeleccionada]) {
    fechasConHabitos[fechaSeleccionada] = {
      ...fechasConHabitos[fechaSeleccionada],
      selected: true,
      selectedColor: 'blue',
    };
  } else {
    fechasConHabitos[fechaSeleccionada] = {
      selected: true,
      selectedColor: 'blue',
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Hábitos del día</Text>

      <Calendar
        onDayPress={(day) => setFechaSeleccionada(day.dateString)}
        markedDates={fechasConHabitos}
      />

      <View style={styles.mensaje}>
        {habitosFiltrados.length === 0 && <Text>No hay hábitos para este día</Text>}
      </View>

      <FlatList
        data={habitosFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
          </View>
        )}
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  mensaje: {
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
