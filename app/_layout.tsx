import { Stack } from 'expo-router';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

// Componente de contenido del layout
function LayoutContent() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: AuthProvider no encontrado</Text>
      </View>
    );
  }

  const { loading, isLoggedIn } = auth;

  // Pantalla de carga
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  // Navegación condicional basada en autenticación
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // Usuario autenticado
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen 
            name="modal" 
            options={{ presentation: 'modal' }} 
          />
        </>
      ) : (
        // Usuario no autenticado
        <Stack.Screen name="screens/login" />
      )}
    </Stack>
  );
}

// Layout raíz con el provider
export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
  },
});