import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        headerLeft: () => (
          <Image
            source={require("../../assets/images/solos/logo-noback.png")}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          />
        ),
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
        name="classificar"
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
      <Tabs.Screen
        name="detalheSolo/[solo]"
        options={{
          headerShown: false,
          tabBarLabel: "Detalhes",
          tabBarIcon: ({ color }) => (
            <Ionicons name="reader" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
