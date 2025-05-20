import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Menu, Surface, Text, useTheme } from "react-native-paper";

export default function Amostras() {
  const [numero, setNumero] = useState<number | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  return (
    <Surface
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text variant="titleMedium" style={styles.label}>
        Selecione a quantidade de amostras
      </Text>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.menuButton}
            contentStyle={{ paddingVertical: 8 }}
          >
            {numero !== null ? numero : "Selecione"}
          </Button>
        }
      >
        {[...Array(100).keys()].map((num) => (
          <Menu.Item
            key={num}
            title={num.toString()}
            onPress={() => {
              setNumero(num);
              setMenuVisible(false);
            }}
          />
        ))}
      </Menu>

      <Button
        mode="contained"
        onPress={() => {
          if (numero !== null && numero !== undefined) {
            router.push({
              pathname: "../classificar",
              params: { total: numero.toString(), indice: "0" },
            });
          }
        }}
        style={styles.startButton}
        disabled={numero === null}
      >
        Iniciar
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontWeight: "600",
    marginBottom: 16,
  },
  menuButton: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
  },
  startButton: {
    marginTop: 24,
    borderRadius: 8,
  },
});
