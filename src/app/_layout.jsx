import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/authContext';
import { View, Text } from 'react-native';


function ProtectedLayout() {
  const { usuario, isCargando } = useAuth();
  const segments = useSegments();
  const router = useRouter();

 useEffect(() => {
  if (isCargando || segments.length === 0) return;

  const inAuthGroup = segments[0] === 'login' || segments[0] === 'registro';

  if (!usuario && !inAuthGroup) {
    router.replace('/login');
  } else if (usuario && inAuthGroup) {
    router.replace('/(tabs)');
  }
}, [usuario, segments, isCargando]);

if (isCargando) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cargando sesión...</Text>
    </View>
  );
}
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function LayoutPrincipal() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
