import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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

    return( 
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          {esEdicion ? 'Editar Hábito' : 'Crear Hábito'}
        </Text>
        
        <Text style={{ fontWeight: 'bold' }}>Nombre del hábito</Text>
        <TextInput value={nombre} onChangeText={(text) => setNombre(text)} style={{ borderBottomWidth: 1, width: '80%' }} />
        
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
        
        {!esEdicion && (
          <Text style={{ color: COLORS.primary, textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
            Fecha de inicio: {fechaInicio}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleGuardar}
          disabled={!nombre}
          style={{ marginTop: 30, backgroundColor: 'green' ,opacity: !nombre ? 0.5 : 1, padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {esEdicion ? 'Guardar cambios' : 'Guardar hábito'}
          </Text>
        </TouchableOpacity>
      </View> 
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})
