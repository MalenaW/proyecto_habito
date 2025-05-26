import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/authContext';

function ProtectedLayout() {
  const { usuario } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("usuario en layout:", usuario);
    console.log("segments:", segments);

    if (usuario === null) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'registro';

    if (!usuario && !inAuthGroup) {
      router.replace('/login');
    } else if (usuario && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [usuario, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function LayoutPrincipal() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
