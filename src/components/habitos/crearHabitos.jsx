import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useHabitos } from "../../context/habitoContext";

export default function CrearHabitos(){
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
      dias: [fechaHoy], // para simplificar; se puede adaptar a días reales
      repeticionesPorDia: 1,
      fechaInicio: fechaHoy
    });

    router.replace('/app/(tabs)/habito');
  };

    return( 
     <View style={{ flex: 1, padding: 16 }}>
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
    </View> 
    )
}

const styles = StyleSheet.create({

    input:{
        backgroundColor: '#2195f3',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 15,
        minWidth:200
    },
        seccion:{
        backgroundColor: '#2195f3',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 15,
        minWidth:200
    },
        repeticiones:{
        backgroundColor: '#2195f3',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 15,
        minWidth:200
    },
        repeticionesTexto:{
        backgroundColor: '#2195f3',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 15,
        minWidth:200
    }
})
