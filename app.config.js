export default {
  expo: {
    name: "ClasSolosBr",
    slug: "solosbr",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/solos/logo-noback.png",
    scheme: "solosbr",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    splash: {
      image: "./assets/images/solos/logo-noback.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: true,
    },

    android: {
      package: "com.dedarob.solosbr",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,

      usesCleartextTraffic: true,
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/solos/logo-noback.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      API_URL: process.env.API_URL,
      eas: {
        projectId: "738430a0-bf4f-4ab3-9523-d732ee3f2144",
      },
    },
  },
};
