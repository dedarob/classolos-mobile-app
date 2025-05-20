import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant || "gray",
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        headerLeft: () => (
          <Image
            source={require("../../assets/images/solos/logo-noback.png")}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          />
        ),
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="amostras"
        options={{
          headerTitle: "Classificar",
          tabBarLabel: "Classificar",
          tabBarIcon: ({ color }) => (
            <Ionicons name="layers" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="resultados"
        options={{
          headerTitle: "Resultados",
          tabBarLabel: "Resultados",
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bancoDeSolos"
        options={{
          headerTitle: "Banco de Solos",
          tabBarLabel: "Solos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="earth" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
