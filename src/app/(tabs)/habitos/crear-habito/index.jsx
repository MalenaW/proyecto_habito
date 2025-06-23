import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../../constants/theme";
import { format, parseISO } from "date-fns";
import { useHabitos } from "../../../../context/habitoContext";

export default function CrearHabito(){
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [dias, setDias] = useState([]);
    const { agregarHabito, editarHabito, habitos } = useHabitos(); 
    const params = useLocalSearchParams();
    const diasSemana = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

    const esEdicion = !!params.habitoId;
    
    useEffect(() => {
      if (esEdicion) {
        const habito = habitos.find(h => h.id === params.habitoId);
        if (habito) {
          setNombre(habito.nombre);
          setDias(habito.dias || []);
        }
      }
    }, [esEdicion, params.habitoId, habitos]);

    const fecha = parseISO(params.fechaSeleccionada || new Date().toISOString());
    const fechaInicio = format(fecha, 'dd/MM/yyyy');

    const toggleDia = (dia) => {
      setDias(prev =>
        prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
      );
    };

    const handleGuardar = () => {
      if (esEdicion) {
        editarHabito(params.habitoId, {
          nombre,
          dias,
        });
      } else {
        agregarHabito({
          nombre,
          dias,
          repeticionesPorDia: 1,
          fechaInicio: params.fechaSeleccionada
        });
      }

      router.replace('/habitos');
    };

    const isDisabled = !nombre || dias.length === 0;

    return( 
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.titulo}>
              {esEdicion ? 'Editar Hábito' : 'Crear Hábito'}
            </Text>
            <Text style={styles.subtitulo}>
              {esEdicion ? 'Modifica tu hábito' : 'Define tu nuevo hábito saludable'}
            </Text>
          </View>

          <View style={styles.form}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre del hábito</Text>
              <TextInput 
                value={nombre} 
                onChangeText={setNombre}
                style={styles.input}
                placeholder="Ej: Tomar agua, Ejercitarse..."
                placeholderTextColor={COLORS.subtitle}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Días de la semana</Text>
              <Text style={styles.labelSubtitle}>Selecciona cuándo quieres realizarlo</Text>
              
              <View style={styles.diasContainer}>
                {diasSemana.map(dia => (
                  <TouchableOpacity
                    key={dia}
                    onPress={() => toggleDia(dia)}
                    style={[
                      styles.diaButton,
                      dias.includes(dia) && styles.diaButtonSelected
                    ]}
                  >
                    <Text style={[
                      styles.diaText,
                      dias.includes(dia) && styles.diaTextSelected
                    ]}>
                      {dia}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {!esEdicion && (
              <View style={styles.fechaInfo}>
                <Text style={styles.fechaLabel}>📅 Fecha de inicio</Text>
                <Text style={styles.fechaValor}>{fechaInicio}</Text>
              </View>
            )}

          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleGuardar}
              disabled={isDisabled}
              style={[styles.botonGuardar, isDisabled && styles.botonDeshabilitado]}
            >
              <Text style={styles.botonTexto}>
                {esEdicion ? 'Guardar cambios' : 'Crear hábito'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.botonCancelar}
            >
              <Text style={styles.botonCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: COLORS.subtitle,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  labelSubtitle: {
    fontSize: 14,
    color: COLORS.subtitle,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  diasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  diaButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
    minWidth: 50,
    alignItems: 'center',
  },
  diaButtonSelected: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  diaText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  diaTextSelected: {
    color: COLORS.white,
  },
  fechaInfo: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  fechaLabel: {
    fontSize: 14,
    color: COLORS.subtitle,
    marginBottom: 4,
  },
  fechaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footer: {
    paddingTop: 20,
    gap: 12,
  },
  botonGuardar: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botonDeshabilitado: {
    backgroundColor: COLORS.subtitle,
    opacity: 0.6,
  },
  botonTexto: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonCancelar: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  botonCancelarTexto: {
    color: COLORS.subtitle,
    fontSize: 16,
    fontWeight: '600',
  },
});