import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green", // Cor da aba ativa
        tabBarInactiveTintColor: "gray", // Cor da aba inativa
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="classificar"
        options={{
          title: "Classificar",
          tabBarIcon: ({ color }) => (
            <Ionicons name="file-tray-stacked" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bancoDeSolos"
        options={{
          title: "Banco De Solos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="earth" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resultados"
        options={{
          title: "Resultados",
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
