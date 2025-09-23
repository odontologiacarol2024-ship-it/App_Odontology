import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DetalleCitaScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7BB7F2" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles de la cita</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.citaHeader}>
            <View style={styles.citaTitleContainer}>
              <Ionicons name="calendar" size={32} color="#000" />
              <View>
                <Text style={styles.citaTitle}>Cita 1</Text>
                <Text style={styles.citaSession}>sesión: 1 de 6</Text>
              </View>
            </View>
            <View style={styles.citaDateContainer}>
              <Text style={styles.citaDate}>Miércoles, 24 de</Text>
              <Text style={styles.citaDate}>septiembre de 2025</Text>
              <Text style={styles.citaTime}>10:00 AM</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Paciente:</Text>
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>Emmanuel Rodriguez Martinez</Text>
              </View>
            </View>
            <View style={styles.infoColumnSmall}>
              <Text style={styles.infoLabel}>Edad:</Text>
              <View style={styles.infoBadgeSmall}>
                <Text style={styles.infoText}>20</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoFullRow}>
            <Text style={styles.infoLabel}>Odontologo:</Text>
            <View style={styles.infoBadge}>
              <Text style={styles.infoText}>Dr. Hugo Gómez Ramírez</Text>
            </View>
          </View>

          <View style={styles.infoFullRow}>
            <Text style={styles.infoLabel}>Tratamiento:</Text>
            <View style={styles.infoBadge}>
              <Text style={styles.infoText}>Ortodoncia – Ajuste de brackets</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Estado:</Text>
              <View style={styles.estadoBadge}>
                <Text style={styles.estadoText}>Completada</Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Duración estimada:</Text>
              <View style={styles.infoBadgeSmall}>
                <Text style={styles.infoText}>40 min</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Pago:</Text>
              <View style={styles.pagoBadge}>
                <Text style={styles.pagoText}>$600 MXN</Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Estatus:</Text>
              <View style={styles.infoBadgeSmall}>
                <Text style={styles.infoText}>Pagado</Text>
              </View>
            </View>
          </View>

          <View style={styles.notasContainer}>
            <Text style={styles.infoLabel}>Notas clínicas:</Text>
            <View style={styles.notasBox}>
              <Text style={styles.notasText}>
                Se ajustó arco superior y se cambiaron ligas elásticas. Ligera sensibilidad esperada por 24-48 h
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={styles.navButtonText}>Atras</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Siguiente cita</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#7BB7F2',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  citaHeader: {
    marginBottom: 24,
  },
  citaTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  citaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  citaSession: {
    fontSize: 14,
    color: '#6B7280',
  },
  citaDateContainer: {
    alignItems: 'flex-end',
  },
  citaDate: {
    fontSize: 16,
    color: '#000',
  },
  citaTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  infoColumn: {
    flex: 1,
  },
  infoColumnSmall: {
    width: 100,
  },
  infoFullRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  infoBadge: {
    backgroundColor: '#BFDBFE',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  infoBadgeSmall: {
    backgroundColor: '#BFDBFE',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: 14,
    color: '#000',
  },
  estadoBadge: {
    backgroundColor: '#86EFAC',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  estadoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  pagoBadge: {
    backgroundColor: '#FDE68A',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  pagoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  notasContainer: {
    marginTop: 8,
  },
  notasBox: {
    backgroundColor: '#BFDBFE',
    padding: 16,
    borderRadius: 12,
  },
  notasText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  bottomSpace: {
    height: 30,
  },
});