import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { useAuth } from '../context/authContext';
import { COLORS } from '../constants/theme';

export default function Login() {
  const { login, register } = useAuth();

  const [usuario, setUsuario] = useState('');

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [esLogin, setEsLogin] = useState(true);

const emailValido = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const handleSubmit = () => {
  if (!usuario || !password || (!esLogin && !email)) {
    Alert.alert('Error', 'Completá todos los campos');
    return;
  }

  if (usuario.length < 3) {
    Alert.alert('Error', 'El usuario debe tener al menos 3 caracteres');
    return;
  }

  if (password.length < 4) {
    Alert.alert('Error', 'La contraseña debe tener al menos 4 caracteres');
    return;
  }

  if (!esLogin && !emailValido(email)) {
    Alert.alert('Error', 'Ingresá un email válido');
    return;
  }

  if (esLogin) {
    login(usuario, password);
  } else {
    register(usuario, email, password);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>

      <Text>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresá tu usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      {!esLogin && (
        <>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresá tu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </>
      )}

      <Text>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresá tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={esLogin ? 'INGRESAR' : 'REGISTRAR'}
        onPress={handleSubmit}
      />

      <Text style={{ marginTop: 20 }}>
        {esLogin ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Ingresá'}
      </Text>

      <Switch value={!esLogin} onValueChange={() => setEsLogin(!esLogin)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 16,
    borderRadius: 10,
  },
});
