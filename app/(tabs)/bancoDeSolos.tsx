import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { SOLOS_INFO } from "../../data/solo";

export default function BancoDeSolos() {
  const router = useRouter();
  const theme = useTheme();

  const data = Object.entries(SOLOS_INFO).map(([nome, dados]) => ({
    nome,
    ...dados,
  }));

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={data}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/detalheSolo/[solo]",
                params: { solo: item.nome },
              })
            }
          >
            <Card.Cover source={item.imagem} style={styles.image} />
            <Card.Content>
              <Text variant="titleMedium" style={styles.title}>
                {item.nome}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  listContainer: {
    padding: 12,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    height: 140,
  },
  title: {
    marginTop: 8,
    textAlign: "center",
  },
});
