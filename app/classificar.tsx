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
} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAmostras } from "../contexts/AmostrasContext";
import FormComponent from "./components/formComponent";

export default function Classificar() {
  const { total, indice } = useLocalSearchParams();
  const totalAmostras = total ? parseInt(total as string) : 0;
  const indiceNumero = indice ? parseInt(indice as string) : 0;

  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { dadosAmostras, setDadosAmostras } = useAmostras();

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {} as FormData,
  });

  const [indiceAtual, setIndiceAtual] = useState(indiceNumero);

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
      reset({} as FormData);
    }

    setIndiceAtual(indiceNumero);
  }, [
    indiceNumero,
    dadosAmostras,
    reset,
    navigation,
    theme.colors.surface,
    totalAmostras,
  ]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newDados = [...dadosAmostras];
    newDados[indiceAtual] = data;
    setDadosAmostras(newDados);
  };

  const { height } = Dimensions.get("window");
  const offsetIos = (height * 10) / 100;
  const offsetAndroid = (height * 15) / 100;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      keyboardVerticalOffset={Platform.OS === "ios" ? offsetIos : offsetAndroid}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: insets.bottom + 20 },
          ]}
        >
          <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
            Classificação de Dados
          </Text>

          <FormComponent control={control} />

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
            style={styles.button}
            contentStyle={{ paddingVertical: 8 }}
            disabled={indiceAtual === 0}
          >
            Anterior
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
            style={styles.button}
            contentStyle={{ paddingVertical: 8 }}
            disabled={indiceAtual + 1 >= totalAmostras}
          >
            Próximo
          </Button>

          <Button
            mode="contained"
            onPress={() => {
              handleSubmit((data) => {
                onSubmit(data);
                console.log("Dados finais das amostras:", dadosAmostras);
                // todo: jogar pro backend via axios
              })();
            }}
            style={[styles.button, { marginTop: 30 }]}
            contentStyle={{ paddingVertical: 8 }}
          >
            Terminar classificação
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
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
});
