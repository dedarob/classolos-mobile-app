import { Image, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/solos/logo-noback.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}
