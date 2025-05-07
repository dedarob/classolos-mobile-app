import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SOLOS_INFO } from "../../data/solo";

export default function bancoDeSolos() {
  const router = useRouter();
  const data = Object.entries(SOLOS_INFO).map(([nome, dados]) => ({
    nome,
    ...dados,
  }));

  return (
    <View style={styles.view}>
      <FlatList
        data={data}
        contentContainerStyle={{ padding: 8 }}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/detalheSolo/[solo]",
                params: { solo: item.nome },
              })
            }
          >
            <Image source={item.imagem} style={styles.image} />
            <Text style={styles.title}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    width: "100%",
  },
  card: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    backgroundColor: "#eee",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  title: {
    padding: 8,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
