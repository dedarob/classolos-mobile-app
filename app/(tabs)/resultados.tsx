import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function getResponseData(data: any, color: string) {
  return (
    <Text selectable style={[styles.text, { color }]}>
      {JSON.stringify(data, null, 2)}
    </Text>
  );
}

export default function Resultados() {
  const theme = useTheme();
  const { response } = useLocalSearchParams();

  let parsedResponse;
  try {
    parsedResponse =
      typeof response === "string" ? JSON.parse(response) : response;
  } catch (e) {
    parsedResponse = { error: "Invalid response format" };
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      {getResponseData(parsedResponse, theme.colors.onBackground)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    padding: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
  },
});
