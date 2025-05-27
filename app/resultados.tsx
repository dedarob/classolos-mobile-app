// Resultados.tsx
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { format } from "date-fns";

const logoImage = require("../assets/images/solos/logo-noback.png");

export function getResponseData(data: any, color: string) {
  let displayText = "";

  if (typeof data === "string") {
    displayText = data.replace(/\\n/g, "\n").replace(/\\\\n/g, "\n");
  } else {
    displayText = JSON.stringify(data, null, 2).replace(/\\n/g, "\n");
  }

  return (
    <Text selectable style={[styles.text, { color }]}>
      {displayText}
    </Text>
  );
}

export default function Resultados() {
  const theme = useTheme();
  const { response } = useLocalSearchParams();

  let parsedResponse: any;
  try {
    parsedResponse =
      typeof response === "string" ? JSON.parse(response) : response;
  } catch (e) {
    parsedResponse = { error: "Invalid response format" };
  }

  function formatText(data: any) {
    if (typeof data === "string") {
      return data.replace(/\\n/g, "\n").replace(/\\\\n/g, "\n");
    } else {
      return JSON.stringify(data, null, 2).replace(/\\n/g, "\n");
    }
  }

  const displayText = formatText(parsedResponse);

  async function getImageBase64() {
    try {
      const { Asset } = await import("expo-asset");
      const asset = await Asset.fromModule(logoImage).downloadAsync();

      const base64 = await FileSystem.readAsStringAsync(
        asset.localUri || asset.uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );
      return `data:image/png;base64,${base64}`;
    } catch (error) {
      console.warn("Erro ao carregar imagem base64", error);
      return null;
    }
  }

  async function handleSavePdf() {
    try {
      const base64Image = await getImageBase64();

      // Garante que parsedResponse é array para iterar ou cria array com 1 item
      const samples = Array.isArray(parsedResponse)
        ? parsedResponse.slice(0, 99) // até 99 amostras
        : [parsedResponse];

      // Função para normalizar strings (identificador, localizacao)
      const normalize = (str: string) =>
        String(str || "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9]/g, "_")
          .replace(/_+/g, "_")
          .replace(/^_|_$/g, "")
          .toLowerCase()
          .trim();

      // Monta HTML com info de cada amostra para cabeçalho
      const headerInfoHtml = samples
        .map((item, i) => {
          const identificadorRaw =
            item?.dados?.identificador || `identificador_${i + 1}`;
          const localizacaoRaw =
            item?.dados?.localizacao || `localizacao_${i + 1}`;
          const dataClassificacaoRaw =
            item?.dados?.data_classificacao || format(new Date(), "dd/MM/yyyy");

          return `
          <div>
            <strong>Amostra ${i + 1}:</strong><br />
            Identificador: ${identificadorRaw}<br />
            Localização: ${localizacaoRaw}<br />
            Data da Classificação: ${dataClassificacaoRaw}
          </div>
          <br />
        `;
        })
        .join("\n");

      // Para nome do arquivo, junta os identificadores das primeiras 3 amostras (exemplo)
      const nomeArquivo =
        samples
          .slice(0, 3)
          .map((item) => normalize(item?.dados?.identificador))
          .filter(Boolean)
          .join("_") || "classificacao";

      // Conteúdo HTML completo
      const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: monospace;
              font-size: 14px;
              line-height: 1.5;
              margin: 40px 20px 20px 20px;
            }
            header {
              margin-bottom: 30px;
              border-bottom: 2px solid #444;
              padding-bottom: 15px;
            }
            header img {
              height: 160px;
              margin-bottom: 20px;
            }
            header .info div {
              margin-bottom: 10px;
            }
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <header>
            ${base64Image ? `<img src="${base64Image}" alt="Logo" />` : ""}
            <div class="info">
              ${headerInfoHtml}
            </div>
          </header>
          <pre>${displayText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</pre>
        </body>
      </html>
    `;

      const fileName = `classificacao_${nomeArquivo}.pdf`;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      const newPath = FileSystem.documentDirectory + fileName;
      await FileSystem.moveAsync({ from: uri, to: newPath });

      await Sharing.shareAsync(newPath);
    } catch (error) {
      console.error("Erro ao salvar/compartilhar PDF:", error);
    }
  }

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator
      >
        {getResponseData(parsedResponse, theme.colors.onBackground)}
      </ScrollView>

      <Button
        mode="contained"
        onPress={handleSavePdf}
        style={{ margin: 16 }}
        icon="download"
      >
        Salvar Amostra
      </Button>
    </View>
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
