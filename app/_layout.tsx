import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AmostrasProvider } from "../contexts/AmostrasContext";
import { darkTheme, theme } from "../themes/theme";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <AmostrasProvider>
      <SafeAreaProvider>
        <PaperProvider theme={isDarkMode ? darkTheme : theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="detalheSolo/[solo]"
              options={{ headerShown: true, headerTitle: "Solos" }}
            />
          </Stack>
        </PaperProvider>
      </SafeAreaProvider>
    </AmostrasProvider>
  );
}
