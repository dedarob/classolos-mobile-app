import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import FormComponent from "../components/formComponent";

interface FormData {
  identificador: string;
  localizacao: string;
  horizonte: string;
  cor_munsell: string;
  cor_visual: string;
  cerosidade: string;
  areia_grossa: number;
  areia_fina: number;
  silte: number;
  argila_total: number;
  argila_dispersa: number;
  grau_floculacao: number;
  silte_argila: number;
  silte_areia_fina: number;
  ph_agua: number;
  ph_kcl: number;
  delta_ph: number;
  ca: number;
  mg: number;
  k: number;
  na: number;
  al: number;
  h: number;
  soma_bases: number;
  ctct: number;
  sat_al: number;
  ctct_efetiva: number;
  sat_bases: number;
  retencao_cations: number;
  atividade_argila: number;
  cos: number;
  equivalente_umidade: number;
}

export default function Classificar() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{
            padding: 65,
            flexGrow: 1,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
            Classificação de Dados
          </Text>

          <FormComponent control={control} />

          <Button title="Classificar" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
