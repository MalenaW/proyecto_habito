import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/theme';
import { useHabitos } from '../../../context/habitoContext';
import { Calendar } from 'react-native-calendars';
import { format, getDay, isAfter, isSameDay, parseISO } from 'date-fns';
import HabitoItem from '../../../components/habito';

export default function Habitos() {
  const hoy = format(new Date(), 'yyyy-MM-dd');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);
  const { habitos, eliminarHabito } = useHabitos();
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
    
    return h.dias.length === 0 ? isSameDay(fechaInicioHabito, fechaSeleccionadaDate): h.dias.includes(diaString);
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

  const fechaFormateada = format(parseISO(fechaSeleccionada), 'dd/MM/yyyy');
  const esDiaFuturoOHoy = fechaSeleccionada >= hoy;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mis Hábitos</Text>
        <Text style={styles.subtitulo}>Selecciona un día para ver tus hábitos</Text>
      </View>
      <View style={styles.calendarioContainer}>
        <Calendar
          onDayPress={(day) => setFechaSeleccionada(day.dateString)}
          markedDates={{
            [fechaSeleccionada]: {
              selected: true,
              marked: true,
              selectedColor: COLORS.secondary
            }
          }}
          minDate={hoy}
          theme={{
            selectedDayBackgroundColor: COLORS.secondary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: COLORS.primary,
            dayTextColor: COLORS.text,
            monthTextColor: COLORS.text,
            arrowColor: COLORS.secondary,
            disabledArrowColor: '#d9e1e8',
            textDisabledColor: '#d9e1e8',
          }}
        />
      </View>

      <View style={styles.habitosSection}>
        <View style={styles.habitosHeader}>
          <Text style={styles.habitosTitulo}>
            📅 {fechaFormateada}
          </Text>
          <Text style={styles.habitosContador}>
            {habitosFiltrados.length} hábito{habitosFiltrados.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.listaContainer}>
          {habitosFiltrados.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyTexto}>No hay hábitos para este día</Text>
            </View>
          ) : (
            <FlatList
              data={habitosFiltrados}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <HabitoItem 
                  item={item} 
                  onEdit={handleEdit} 
                  onDelete={eliminarHabito} 
                  fecha={fechaSeleccionada}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listaContent}
            /> 
 
          )}
        </View>
      </View>

      {esDiaFuturoOHoy && (
        <TouchableOpacity
          onPress={() => router.push({
            pathname: '/habitos/crear-habito',
            params: { fechaSeleccionada }
          })}
          style={styles.botonFlotante}
        >
          <Text style={styles.botonIcono}>+</Text>
        </TouchableOpacity>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: COLORS.subtitle,
  },
  calendarioContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitosSection: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  habitosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  habitosTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  habitosContador: {
    fontSize: 14,
    color: COLORS.subtitle,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  listaContainer: {
    flex: 1,
    marginBottom: 20,
  },
  listaContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtexto: {
    fontSize: 14,
    color: COLORS.subtitle,
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: COLORS.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  botonIcono: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  containerBox :{
    flexDirection: 'row',
    marginBottom: 10,
   
  }
});