import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";

import { useHabitos } from "../../context/habitoContext";


export default function HabitoItem({ item, onEdit, onDelete, fecha }) {
  const { marcarHabitoComoCumplido, habitoEstaCumplido } = useHabitos();
  const completado = habitoEstaCumplido(fecha, item.id);

  return (
    <View style={[styles.container, completado && styles.completado] }>
    <TouchableOpacity onPress={() => marcarHabitoComoCumplido(fecha, item.id)} style={styles.checkBox}>
        <Text style={styles.checkboxText}>
          {completado ? '✅' : '⬜'}
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.dias}>
          {item.dias?.join(' • ')}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => onEdit(item)}
        >
          <Text style={styles.buttonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  completado: {
    backgroundColor: COLORS.seleccionado,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 20
  },
  checkBox:{
      paddingRight: 15,

  },
  content: {
    flex: 1,
    paddingRight: 12,
  },
  nombre: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    alignItems: "center",
    color: COLORS.text,
    marginBottom: 4,
  },
  dias: {
    fontSize: 12,
    color: COLORS.subtitle,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  buttonText: {
    fontSize: 16,
  },
    checkboxText: {
    fontSize: 20,
  }
});