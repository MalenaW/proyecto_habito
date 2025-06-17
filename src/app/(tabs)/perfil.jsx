import { useContext, useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/authContext';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../context/authContext';

export default function Perfil() {
const { usuario,setUsuario, logout} = useAuth();

  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) setImageUri(savedImage);
      } catch (error) {
        console.log('Error cargando imagen:', error);
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

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>¡Hola {usuario?.nombre || 'Usuario'}!</Text>
      <Image
        source={imageUri ? { uri: imageUri } : require('../../../assets/icon.png')}
        style={styles.image}
      />
      <Button title="Cambiar foto de perfil" onPress={pickImage} />
      <Text style={styles.email}>{usuario?.email}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={logout} color={COLORS.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  saludo: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginVertical: 20,
    backgroundColor: '#ddd',
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});
