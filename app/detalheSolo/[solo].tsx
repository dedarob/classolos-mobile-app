import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SOLOS_INFO } from "../../data/solo";

interface SoloInfo {
  descricao: string;
  culturas: string;
  imagem: any;
}

export const options = {
  tabBarStyle: { display: "none" },
};

export default function DetalheSolo() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Solos",
      headerShown: true,
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: "#fff",
    });
  }, [navigation]);
  const { solo } = useLocalSearchParams();
  const theme = useTheme();

  const soloKey = Object.keys(SOLOS_INFO).find(
    (key) => key.toLowerCase() === String(solo).toLowerCase()
  ) as keyof typeof SOLOS_INFO;

  const dados = soloKey ? SOLOS_INFO[soloKey] : null;

  if (!dados) {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text variant="bodyLarge">Solo não encontrado.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Image source={dados.imagem} style={styles.image} />
      <Text variant="headlineMedium" style={styles.title}>
        {solo}
      </Text>

      <Text variant="titleMedium" style={styles.section}>
        Descrição:
      </Text>
      <Text variant="bodyMedium" style={styles.text}>
        {dados.descricao}
      </Text>

      <Text variant="titleMedium" style={styles.section}>
        Culturas:
      </Text>
      <Text variant="bodyMedium" style={styles.text}>
        {dados.culturas}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
  },
  text: {
    marginTop: 8,
  },
});
