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

export default function PagosScreen() {
  const router = useRouter();
  const [selectedFecha, setSelectedFecha] = useState('Fecha');
  const [selectedEstado, setSelectedEstado] = useState('Estado');

  const pagos = [
    {
      id: 1,
      fecha: '24 de septiembre del 2025',
      cita: 'Ortodoncia - Ajuste de brackets',
      monto: '$400 mxn',
      metodo: 'Transferencia',
      estado: 'Pagado',
      referencia: 'RC-0924-1034',
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
          <Text style={styles.headerTitle}>Historial de pagos</Text>
          <Text style={styles.headerSubtitle}>Consulta tus pagos realizados y pendientes</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterDropdown}>
          <Text style={styles.filterDropdownText}>Fecha</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterDropdown}>
          <Text style={styles.filterDropdownText}>Estado</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Ionicons name="card-outline" size={24} color="#000" />
          <Text style={styles.sectionTitle}>Pagos Realizados:</Text>
        </View>

        {pagos.map((pago) => (
          <View key={pago.id} style={styles.pagoCard}>
            <View style={styles.pagoRow}>
              <Text style={styles.pagoLabel}>Fecha:</Text>
              <View style={styles.pagoValue}>
                <Text style={styles.pagoValueText}>{pago.fecha}</Text>
              </View>
            </View>

            <View style={styles.pagoRow}>
              <Text style={styles.pagoLabel}>Cita:</Text>
              <View style={styles.pagoValue}>
                <Text style={styles.pagoValueText}>{pago.cita}</Text>
              </View>
            </View>

            <View style={styles.pagoRowDouble}>
              <View style={styles.pagoRowHalf}>
                <Text style={styles.pagoLabel}>Monto:</Text>
                <View style={styles.pagoValueSmall}>
                  <Text style={styles.pagoValueText}>{pago.monto}</Text>
                </View>
              </View>
              <View style={styles.pagoRowHalf}>
                <Text style={styles.pagoLabel}>Estado:</Text>
                <View style={styles.estadoBadge}>
                  <Text style={styles.estadoText}>{pago.estado}</Text>
                </View>
              </View>
            </View>

            <View style={styles.pagoRow}>
              <Text style={styles.pagoLabel}>Metodo:</Text>
              <View style={styles.pagoValueSmall}>
                <Text style={styles.pagoValueText}>{pago.metodo}</Text>
              </View>
            </View>

            <View style={styles.pagoRow}>
              <Text style={styles.pagoLabel}>Referencia:</Text>
              <View style={styles.pagoValue}>
                <Text style={styles.pagoValueText}>{pago.referencia}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.separatorContainer}>
          <Ionicons name="chevron-down" size={32} color="#000" />
        </View>

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
    backgroundColor: '#7BB7F2',
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  filterDropdownText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#7BB7F2',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  pagoCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pagoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pagoRowDouble: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  pagoRowHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pagoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  pagoValue: {
    flex: 1,
    backgroundColor: '#BFDBFE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  pagoValueSmall: {
    backgroundColor: '#BFDBFE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  pagoValueText: {
    fontSize: 14,
    color: '#000',
  },
  estadoBadge: {
    backgroundColor: '#86EFAC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  separatorContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  bottomSpace: {
    height: 30,
  },
});