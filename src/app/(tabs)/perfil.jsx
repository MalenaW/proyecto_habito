import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/authContext';
import { COLORS } from '../../constants/theme';

export default function Perfil() {
  const { usuario, setUsuario, usuarios, setUsuarios, logout } = useAuth();
  const [imageUri, setImageUri] = useState(null);
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(usuario?.usuario || '');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) setImageUri(savedImage);
      } catch (error) {
        console.error('Error cargando imagen:', error);
      }
    };
    loadImage();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem('profileImage', uri);
      setUsuario({ ...usuario, profileImage: uri });
    }
  };

  const handleGuardarNombre = async () => {
    if (!nuevoNombre.trim()) {
      Alert.alert('Nombre inválido', 'El nombre no puede estar vacío');
      return;
    }

    const actualizado = { ...usuario, usuario: nuevoNombre.trim() };
    setUsuario(actualizado);

    const nuevosUsuarios = usuarios.map((u) =>
      u.email === actualizado.email ? actualizado : u
    );
    setUsuarios(nuevosUsuarios);

    await AsyncStorage.setItem('usuario', JSON.stringify(actualizado));
    await AsyncStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));

    setEditandoNombre(false);
    Alert.alert('¡Listo!', 'Tu nombre fue actualizado');
  };

  const handleBorrarCuenta = async () => {
   
    Alert.alert(
      '¿Estás segura/o?',
      'Esta acción eliminará tu cuenta permanentemente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, borrar',
          style: 'destructive',
          onPress: async () => {
            try {
              const usuariosActualizados = usuarios.filter(u => u.email !== usuario.email);
              setUsuarios(usuariosActualizados);
              await AsyncStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
              await AsyncStorage.removeItem('usuario');
              await AsyncStorage.removeItem('profileImage');
              setUsuario(null);
            } catch (error) {
              Alert.alert('Error', 'No se pudo borrar la cuenta');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {!editandoNombre ? (
          <Text style={styles.saludo}>¡Hola {usuario?.usuario || 'Usuario'}!</Text>
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              placeholder="Nuevo nombre"
            />
            <Pressable style={styles.blueButton} onPress={handleGuardarNombre}>
              <Text style={styles.buttonText}>Guardar nombre</Text>
            </Pressable>
          </>
        )}

        <Image
          source={imageUri ? { uri: imageUri } : require('../../../assets/icon.png')}
          style={styles.image}
        />
        <Text style={styles.email}>{usuario?.email}</Text>

        <View style={styles.buttonGroup}>
          <Pressable style={styles.blueButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
          </Pressable>

          <Pressable
            style={styles.blueButton}
            onPress={() => setEditandoNombre(!editandoNombre)}
          >
            <Text style={styles.buttonText}>
              {editandoNombre ? 'Cancelar cambio de nombre' : 'Cambiar nombre de usuario'}
            </Text>
          </Pressable>

          <Pressable style={styles.redButton} onPress={logout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={handleBorrarCuenta}>
            <Text style={styles.buttonText}>Borrar cuenta</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  saludo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  email: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: 15,
    width: '100%',
    gap: 10,
  },
  blueButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: COLORS.bordo,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
