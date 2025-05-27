import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";

const logoImage = require("../../assets/images/solos/logo-noback.png");

const quotes = [
  {
    text: "A terra não pertence ao homem; é o homem que pertence à terra.",
    author: "Chief Seattle",
  },
  {
    text: "A natureza não faz nada em vão.",
    author: "Aristóteles",
  },
  {
    text: "O futuro depende daquilo que fazemos no presente.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Não podemos resolver nossos problemas com o mesmo pensamento que usamos quando os criamos.",
    author: "Albert Einstein",
  },
  {
    text: "O que fazemos à natureza, fazemos a nós mesmos.",
    author: "David Suzuki",
  },
  {
    text: "Proteja o seu corpo, proteja a sua mente, e proteja o planeta.",
    author: "Jane Goodall",
  },
  {
    text: "A água é a força motriz de toda a natureza.",
    author: "Leonardo da Vinci",
  },
  {
    text: "A floresta é o pulmão do nosso planeta.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Seus atos podem inspirar uma mudança global.",
    author: "Greta Thunberg",
  },
  {
    text: "Nós não herdamos a terra de nossos antepassados, nós a tomamos emprestada de nossos filhos.",
    author: "Provérbio nativo americano",
  },
  {
    text: "Somos todos visitantes deste planeta. Estamos apenas de passagem.",
    author: "Provérbio Navajo",
  },
];

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % quotes.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  function goToClassificar() {
    router.push("/amostras");
  }

  const { text, author } = quotes[index];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Image source={logoImage} style={styles.logo} />
      <Surface
        style={[
          styles.quoteContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.quoteText, { color: theme.colors.primary }]}>
            “{text}”
          </Text>
          <Text style={[styles.quoteAuthor, { color: theme.colors.onSurface }]}>
            — {author}
          </Text>
        </Animated.View>
      </Surface>
      <Button mode="contained" onPress={goToClassificar} style={styles.button}>
        Começar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  quoteContainer: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    width: "90%",
    elevation: 3,
    minHeight: 160,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
  },
  button: {
    width: "60%",
  },
});
