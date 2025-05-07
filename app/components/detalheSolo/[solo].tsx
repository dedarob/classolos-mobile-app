import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { SOLOS_INFO } from "../../../data/solo";

interface SoloInfo {
  descricao: string;
  culturas: string;
  imagem: any;
}
export const options = {
  tabBarStyle: { display: "none" },
};
export default function detalheSolo() {
  const { solo } = useLocalSearchParams();

  const soloKey = Object.keys(SOLOS_INFO).find(
    (key) => key.toLowerCase() === String(solo).toLowerCase()
  ) as keyof typeof SOLOS_INFO;

  const dados = soloKey ? SOLOS_INFO[soloKey] : null;

  if (!dados) {
    return <Text>Solo não encontrado.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={dados.imagem} style={styles.image} />
      <Text style={styles.title}>{solo}</Text>
      <Text style={styles.section}>Descrição:</Text>
      <Text style={styles.text}>{dados.descricao}</Text>
      <Text style={styles.section}>Culturas:</Text>
      <Text style={styles.text}>{dados.culturas}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
});
