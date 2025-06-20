import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";

export default function HabitoItem({ item, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.nombre}>{item.nombre}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => onEdit(item)}
        >
          <Text style={styles.buttonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
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
    padding: 10,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    flex: 1
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: COLORS.text
  },
  actions: {
    flexDirection: 'row',
    gap: 8
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editButton: {
    backgroundColor: '#4CAF50'
  },
  deleteButton: {
    backgroundColor: '#f44336'
  },
  buttonText: {
    fontSize: 14
  }
});