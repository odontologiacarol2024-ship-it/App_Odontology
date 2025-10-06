import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import dentistImage from "../../assets/images/dentist.png";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="stethoscope"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Servicios Odontológicos</ThemedText>
      </ThemedView>
      <Collapsible title="Limpieza Dental">
        <ThemedText>Programar una limpieza profesional.</ThemedText>
      </Collapsible>
      <Collapsible title="Ortodoncia">
        <ThemedText>Consulta para aparatos y alineación dental.</ThemedText>
      </Collapsible>
      <Collapsible title="Blanqueamiento">
        <ThemedText>Opción para un blanqueamiento seguroooo.</ThemedText>
        <Image
          source={dentistImage}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
