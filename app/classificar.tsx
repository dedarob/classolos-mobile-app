import { AmostraData } from "@/types/AmostraData";
import axios from "axios";
import Constants from "expo-constants";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAmostras } from "../contexts/AmostrasContext";
import FormComponent from "./components/formComponent";

export default function Classificar() {
  const [isLoading, setIsLoading] = useState(false);

  const { total, indice } = useLocalSearchParams();
  const totalAmostras = total ? parseInt(total as string, 10) : 0;
  const indiceNumero = indice ? parseInt(indice as string, 10) : 0;

  const navigation = useNavigation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const { dadosAmostras, setDadosAmostras } = useAmostras();

  const { control, handleSubmit, reset } = useForm<AmostraData>({
    defaultValues: {} as AmostraData,
  });

  const [indiceAtual, setIndiceAtual] = useState(indiceNumero);
  const [formStep, setFormStep] = useState(0);

  const TOTAL_STEPS = 4;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Amostra ${indiceNumero + 1} de ${totalAmostras}`,
      headerShown: true,
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: "#fff",
    });

    if (dadosAmostras[indiceNumero]) {
      reset(dadosAmostras[indiceNumero]);
    } else {
      reset({} as AmostraData);
    }

    setIndiceAtual(indiceNumero);
    setFormStep(0);
  }, [
    indiceNumero,
    dadosAmostras,
    reset,
    navigation,
    theme.colors.surface,
    totalAmostras,
  ]);

  const onSubmit: SubmitHandler<AmostraData> = (data) => {
    const newDados = [...dadosAmostras];
    newDados[indiceAtual] = data;
    setDadosAmostras(newDados);
  };

  const { height } = Dimensions.get("window");
  const offsetIos = (height * 10) / 100;
  const offsetAndroid = (height * 15) / 100;

  const API_URL =
    Constants.expoConfig?.extra?.API_URL ?? "http://localhost:3000";

  function sendData(amostras: AmostraData[]) {
    const payload = amostras.map((dado) => ({ dados: dado }));
    setIsLoading(true);

    axios
      .post(`${API_URL}/api/solo/classificar`, payload)
      .then((res) => {
        router.push({
          pathname: "/resultados",
          params: {
            response: JSON.stringify(res.data),
          },
        });
      })
      .catch((err) => {
        const errorData = err.response?.data || err.message;
        router.push({
          pathname: "/resultados",
          params: {
            response: JSON.stringify({ error: errorData }),
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      keyboardVerticalOffset={Platform.OS === "ios" ? offsetIos : offsetAndroid}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: insets.bottom + 20 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
            Classificação de Dados
          </Text>

          <FormComponent
            control={control}
            step={formStep}
            setStep={setFormStep}
            totalSteps={TOTAL_STEPS}
          />

          <View
            style={{
              marginTop: 40,
              paddingTop: 20,
              borderTopWidth: 1,
              borderColor: theme.colors.outline,
            }}
          >
            <Button
              mode="contained"
              onPress={() => {
                if (indiceAtual > 0) {
                  handleSubmit((data) => {
                    onSubmit(data);
                    router.push({
                      pathname: "/classificar",
                      params: {
                        total: totalAmostras.toString(),
                        indice: (indiceAtual - 1).toString(),
                      },
                    });
                  })();
                }
              }}
              style={[
                styles.button,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}
              labelStyle={{ color: theme.colors.onSecondaryContainer }}
              contentStyle={{ paddingVertical: 8 }}
              disabled={indiceAtual === 0}
            >
              Amostra anterior
            </Button>

            <Button
              mode="contained"
              onPress={() => {
                if (indiceAtual + 1 < totalAmostras) {
                  handleSubmit((data) => {
                    onSubmit(data);
                    router.push({
                      pathname: "/classificar",
                      params: {
                        total: totalAmostras.toString(),
                        indice: (indiceAtual + 1).toString(),
                      },
                    });
                  })();
                }
              }}
              style={[
                styles.button,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}
              labelStyle={{ color: theme.colors.onSecondaryContainer }}
              contentStyle={{ paddingVertical: 8 }}
              disabled={indiceAtual + 1 >= totalAmostras}
            >
              Próxima amostra
            </Button>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              handleSubmit((data) => {
                const newDados = [...dadosAmostras];
                newDados[indiceAtual] = data;
                setDadosAmostras(newDados);
                sendData(newDados);
              })();
            }}
            style={[styles.button, { marginTop: 30 }]}
            contentStyle={{ paddingVertical: 8 }}
            loading={isLoading}
            disabled={isLoading}
          >
            Terminar classificação
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContainer: {
    padding: 10,
    flexGrow: 1,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
