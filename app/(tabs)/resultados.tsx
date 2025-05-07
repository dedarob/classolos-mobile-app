import { Image, View } from "react-native";

export default function resultados() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/logotipo.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}
