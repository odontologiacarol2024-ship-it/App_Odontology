import React, { useState } from 'react';
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

export default function TratamientosScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Ortodoncia');

  const citasPasadas = [
    {
      id: 1,
      titulo: 'Cita 1',
      fecha: '24 de septiembre de 2025',
      hora: '10:00 am',
      tratamiento: 'Ortodoncia - Ajuste de Brackets',
    },
    {
      id: 2,
      titulo: 'Cita 2',
      fecha: '15 de Octubre de 2025',
      hora: '11:00 am',
      tratamiento: 'Ortodoncia - Revisión Mensual',
    },
    {
      id: 3,
      titulo: 'Cita 3',
      fecha: '5 de Noviembre de 2025',
      hora: '10:30 am',
      tratamiento: 'Ortodoncia - Cambio de ligas',
    },
  ];

  const citasPendientes = [
    {
      id: 6,
      titulo: 'Cita 6',
      fecha: '22 de Diciembre de 2025',
      hora: '10:00 am',
      tratamiento: 'Ortodoncia - Ajuste de Brackets',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Historial de tratamientos</Text>
          <Text style={styles.headerSubtitle}>Consulta tus citas pasadas y próximas</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'Ortodoncia' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('Ortodoncia')}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === 'Ortodoncia' && styles.filterTextActive,
            ]}
          >
            Ortodoncia
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'Extracción' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('Extracción')}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === 'Extracción' && styles.filterTextActive,
            ]}
          >
            Extracción dental
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Citas Pasadas */}
        <View style={styles.section}>
          {citasPasadas.map((cita) => (
            <View key={cita.id} style={styles.citaCard}>
              <View style={styles.citaHeader}>
                <View style={styles.citaTitleContainer}>
                  <Ionicons name="calendar" size={32} color="#000" />
                  <Text style={styles.citaTitle}>{cita.titulo}</Text>
                </View>
                <View style={styles.citaDateContainer}>
                  <Text style={styles.citaDate}>{cita.fecha}</Text>
                  <Text style={styles.citaTime}>{cita.hora}</Text>
                </View>
              </View>
              <Text style={styles.citaTratamiento}>
                <Text style={styles.tratamientoLabel}>Tratamiento realizado{'\n'}</Text>
                {cita.tratamiento}
              </Text>
              <TouchableOpacity
                style={styles.verDetallesButton}
                onPress={() => router.push('/screens/detalle-cita')}
              >
                <Text style={styles.verDetallesText}>Ver detalles de la cita</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Separador */}
        <View style={styles.separatorContainer}>
          <Ionicons name="chevron-down" size={32} color="#000" />
        </View>

        {/* Pendientes */}
        <View style={styles.pendientesHeader}>
          <Text style={styles.pendientesTitle}>Pendientes</Text>
        </View>

        <View style={styles.section}>
          {citasPendientes.map((cita) => (
            <View key={cita.id} style={styles.citaCard}>
              <View style={styles.citaHeader}>
                <View style={styles.citaTitleContainer}>
                  <Ionicons name="calendar" size={32} color="#000" />
                  <Text style={styles.citaTitle}>{cita.titulo}</Text>
                </View>
                <View style={styles.citaDateContainer}>
                  <Text style={styles.citaDate}>{cita.fecha}</Text>
                  <Text style={styles.citaTime}>{cita.hora}</Text>
                </View>
              </View>
              <Text style={styles.citaTratamiento}>
                <Text style={styles.tratamientoLabel}>Tratamiento realizado{'\n'}</Text>
                {cita.tratamiento}
              </Text>
              <TouchableOpacity
                style={[styles.verDetallesButton, styles.verDetallesButtonPending]}
                onPress={() => router.push('/screens/detalle-cita')}
              >
                <Text style={styles.verDetallesText}>Ver detalles de la cita</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.verProcesoButton}>
          <Text style={styles.verProcesoText}>Ver el proceso</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#7BB7F2',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  filterTextActive: {
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  section: {
    paddingHorizontal: 16,
  },
  citaCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  citaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  citaTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  citaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  citaDateContainer: {
    alignItems: 'flex-end',
  },
  citaDate: {
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
  citaTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  citaTratamiento: {
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
  },
  tratamientoLabel: {
    fontWeight: '600',
  },
  verDetallesButton: {
    backgroundColor: '#86EFAC',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  verDetallesButtonPending: {
    backgroundColor: '#FCA5A5',
  },
  verDetallesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  separatorContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  pendientesHeader: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    alignItems: 'center',
  },
  pendientesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  verProcesoButton: {
    backgroundColor: '#FDB975',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  verProcesoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  bottomSpace: {
    height: 30,
  },
});