import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#3CB371",
    secondary: "#03DAC6",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#FFFFFF",
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4CAF50",
    secondary: "#03DAC6",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    text: "#000000",
  },
};
