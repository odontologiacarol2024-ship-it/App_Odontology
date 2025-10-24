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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={26} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tratamientos</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <MaterialCommunityIcons name="tooth-outline" size={36} color="#FFF" />
        <Text style={styles.infoTitle}>Historial de tratamientos</Text>
        <Text style={styles.infoSubtitle}>
          Consulta tus citas pasadas y próximas
        </Text>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'Ortodoncia' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('Ortodoncia')}
          activeOpacity={0.7}
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
          activeOpacity={0.7}
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

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Citas Pasadas */}
        <View style={styles.section}>
          {citasPasadas.map((cita) => (
            <View key={cita.id} style={styles.citaCard}>
              <View style={styles.citaHeader}>
                <View style={styles.iconContainer}>
                  <Ionicons name="calendar" size={28} color="#FFF" />
                </View>
                <View style={styles.citaInfo}>
                  <Text style={styles.citaTitle}>{cita.titulo}</Text>
                  <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={14} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.citaDate}>{cita.fecha}</Text>
                  </View>
                  <View style={styles.dateRow}>
                    <Ionicons name="time-outline" size={14} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.citaTime}>{cita.hora}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.tratamientoContainer}>
                <Text style={styles.tratamientoLabel}>Tratamiento realizado</Text>
                <Text style={styles.citaTratamiento}>{cita.tratamiento}</Text>
              </View>

              <TouchableOpacity
                style={styles.verDetallesButton}
                onPress={() => router.push('/screens/detalle-cita')}
                activeOpacity={0.7}
              >
                <Text style={styles.verDetallesText}>Ver detalles de la cita</Text>
                <Ionicons name="chevron-forward" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Separador */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <View style={styles.separatorIcon}>
            <Ionicons name="chevron-down" size={24} color="#FFF" />
          </View>
          <View style={styles.separatorLine} />
        </View>

        {/* Pendientes Header */}
        <View style={styles.pendientesHeader}>
          <MaterialCommunityIcons name="clock-outline" size={28} color="#FFF" />
          <Text style={styles.pendientesTitle}>Citas Pendientes</Text>
        </View>

        {/* Citas Pendientes */}
        <View style={styles.section}>
          {citasPendientes.map((cita) => (
            <View key={cita.id} style={[styles.citaCard, styles.citaPendiente]}>
              <View style={styles.citaHeader}>
                <View style={[styles.iconContainer, styles.iconPendiente]}>
                  <Ionicons name="calendar" size={28} color="#FFF" />
                </View>
                <View style={styles.citaInfo}>
                  <Text style={styles.citaTitle}>{cita.titulo}</Text>
                  <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={14} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.citaDate}>{cita.fecha}</Text>
                  </View>
                  <View style={styles.dateRow}>
                    <Ionicons name="time-outline" size={14} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.citaTime}>{cita.hora}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.tratamientoContainer}>
                <Text style={styles.tratamientoLabel}>Tratamiento programado</Text>
                <Text style={styles.citaTratamiento}>{cita.tratamiento}</Text>
              </View>

              <TouchableOpacity
                style={[styles.verDetallesButton, styles.verDetallesButtonPending]}
                onPress={() => router.push('/screens/detalle-cita')}
                activeOpacity={0.7}
              >
                <Text style={styles.verDetallesText}>Ver detalles de la cita</Text>
                <Ionicons name="chevron-forward" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Botón Ver Proceso */}
        <TouchableOpacity style={styles.verProcesoButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chart-timeline-variant" size={22} color="#FFF" />
          <Text style={styles.verProcesoText}>Ver el proceso completo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  placeholder: {
    width: 44,
  },
  infoCard: {
    marginHorizontal: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 12,
    marginBottom: 6,
  },
  infoSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
  },
  citaCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  citaPendiente: {
    borderColor: 'rgba(251, 191, 36, 0.4)',
  },
  citaHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  iconPendiente: {
    backgroundColor: 'rgba(251, 191, 36, 0.3)',
  },
  citaInfo: {
    flex: 1,
    gap: 4,
  },
  citaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  citaDate: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  citaTime: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tratamientoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  tratamientoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  citaTratamiento: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 20,
  },
  verDetallesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(21, 128, 61, 0.9)',
  },
  verDetallesButtonPending: {
    backgroundColor: 'rgba(251, 191, 36, 0.9)',
    borderBottomColor: 'rgba(217, 119, 6, 0.9)',
  },
  verDetallesText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 8,
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  separatorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  pendientesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  pendientesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  verProcesoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
    gap: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  verProcesoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});