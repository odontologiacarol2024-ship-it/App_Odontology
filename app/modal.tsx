<<<<<<< HEAD
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
=======
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
>>>>>>> feature/diseno-interfaz

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
<<<<<<< HEAD
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
=======
      <ThemedText type="title">Información Adicional</ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Regresar al Inicio</ThemedText>
>>>>>>> feature/diseno-interfaz
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
=======
    alignItems: "center",
    justifyContent: "center",
>>>>>>> feature/diseno-interfaz
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
