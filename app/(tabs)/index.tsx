import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const userName = auth?.user?.name || "Usuario";

  // Maneja el cierre de sesión
  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            await auth?.logout();
            router.replace('/screens/login');
          },
        },
      ]
    );
  };

  // Maneja la llamada de emergencia
  const handleEmergencyCall = () => {
    const phoneNumber = 'tel:911';
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert('Error', 'No se pudo realizar la llamada');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7BB7F2" />
      
      {/* Contenido con scroll */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header dentro del scroll */}
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle-outline" size={32} color="#000" />
          </View>
          <Text style={styles.headerTitle}>Bienvenido(a)</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Saludo */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>Hola {userName}!!</Text>
          <Text style={styles.greetingSubtitle}>
            Tu sonrisa es nuestra prioridad
          </Text>
        </View>

        {/* Cards Container */}
        <View style={styles.cardsContainer}>
          {/* Card 1: Tratamientos */}
          <View style={[styles.card, styles.cardBlue]}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons 
                  name="tooth-outline" 
                  size={56} 
                  color="#5A9FD4" 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Tratamientos</Text>
                <Text style={styles.cardDescription}>
                  Visualiza el avance de cada tratamiento paso a paso
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonWhite}>
                    <Text style={styles.buttonWhiteText}>Abrir</Text>
                    <Ionicons name="arrow-forward" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Card 2: Citas pendientes */}
          <View style={[styles.card, styles.cardPink]}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name="calendar-outline" 
                  size={56} 
                  color="#E8A5A5" 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Citas pendientes</Text>
                <Text style={styles.cardDescription}>
                  Consulta tus citas pasadas y próximas
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonWhite}>
                    <Text style={styles.buttonWhiteText}>Ver citas</Text>
                    <Ionicons name="arrow-forward" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Card 3: Historial de pagos */}
          <View style={[styles.card, styles.cardBlueAlt]}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons 
                  name="calculator" 
                  size={56} 
                  color="#6BA3D4" 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Historial de pagos</Text>
                <Text style={styles.cardDescription}>
                  Revisa tus pagos realizados y estado de cuenta
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonWhite}>
                    <Text style={styles.buttonWhiteText}>Ver historial</Text>
                    <Ionicons name="arrow-forward" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Card 4: Urgencia dental */}
          <View style={[styles.card, styles.cardOrange]}>
            <View style={styles.emergencyContent}>
              <View style={styles.emergencyHeader}>
                <Ionicons 
                  name="warning" 
                  size={32} 
                  color="#D97706" 
                />
                <Text style={styles.emergencyTitle}>
                  ¿Tienes una urgencia dental?
                </Text>
              </View>
              <Text style={styles.emergencyDescription}>
                Dolor intenso, fractura, inflamación o sangrado
              </Text>
              <TouchableOpacity 
                style={styles.buttonCall}
                onPress={handleEmergencyCall}
              >
                <Ionicons name="call" size={20} color="#FFF" />
                <Text style={styles.buttonCallText}>Llamar Ahora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7BB7F2',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#7BB7F2',
  },
  profileIcon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  logoutButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  greetingSubtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardBlue: {
    backgroundColor: '#D4E8F7',
  },
  cardPink: {
    backgroundColor: '#F9D5D5',
  },
  cardBlueAlt: {
    backgroundColor: '#C7DFF5',
  },
  cardOrange: {
    backgroundColor: '#F5E6D3',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  buttonWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonWhiteText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  emergencyContent: {
    alignItems: 'center',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonCall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    gap: 10,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonCallText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomSpace: {
    height: 30,
  },
});