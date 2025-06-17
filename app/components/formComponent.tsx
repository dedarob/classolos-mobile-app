import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

interface FieldProps {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
}

const Field: React.FC<FieldProps> = ({ label, name, control, placeholder }) => {
  const theme = useTheme();

  return (
    <View style={styles.fieldContainer}>
      <Text
        variant="titleMedium"
        style={{ marginBottom: 6, color: theme.colors.onSurfaceVariant }}
      >
        {label}
      </Text>
      <Controller
        control={control}
        rules={{ required: false }}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            placeholder={placeholder || label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={
              ["number", "percent", "ph", "cmolc"].some((part) =>
                name.includes(part)
              )
                ? "numeric"
                : "default"
            }
            style={{ backgroundColor: theme.colors.surface }}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            autoCapitalize="none"
          />
        )}
      />
    </View>
  );
};

interface FormComponentProps {
  control: any;
  step: number;
  setStep: (step: number) => void;
  totalSteps: number;
}

const ALL_FIELDS: { label: string; name: string }[] = [
  { label: "Identificador da amostra", name: "identificador" },
  { label: "Localização da coleta", name: "localizacao" },
  { label: "Horizonte diagnóstico subsuperficial", name: "horizonte" },
  { label: "Cor (Padrão Munsell)", name: "cor_munsell" },
  { label: "Cor (Visual)", name: "cor_visual" },
  { label: "Cerosidade", name: "cerosidade" },

  { label: "Areia grossa (%)", name: "areia_grossa" },
  { label: "Areia fina (%)", name: "areia_fina" },
  { label: "Silte (%)", name: "silte" },
  { label: "Argila total (%)", name: "argila_total" },
  { label: "Argila dispersa em água (%)", name: "argila_dispersa" },
  { label: "Grau de floculação (%)", name: "grau_floculacao" },

  { label: "Silte/Argila", name: "silte_argila" },
  { label: "Silte/Areia fina", name: "silte_areia_fina" },
  { label: "pH água", name: "ph_agua" },
  { label: "pH KCl", name: "ph_kcl" },
  { label: "Delta pH", name: "delta_ph" },
  { label: "Ca (cmolc/dm³)", name: "ca" },
  { label: "Mg (cmolc/dm³)", name: "mg" },
  { label: "K (cmolc/dm³)", name: "k" },
  { label: "Na (cmolc/dm³)", name: "na" },
  { label: "Al (cmolc/dm³)", name: "al" },
  { label: "H (cmolc/dm³)", name: "h" },

  { label: "Soma bases (cmolc/dm³)", name: "soma_bases" },
  { label: "CTCt (cmolc/dm³)", name: "ctct" },
  { label: "Sat Al (%)", name: "sat_al" },
  { label: "CTCT (cmolc/dm³)", name: "ctct_efetiva" },
  { label: "Sat bases (%)", name: "sat_bases" },
  { label: "Retenção cátions", name: "retencao_cations" },
  { label: "Atividade argila (cmolc/kg)", name: "atividade_argila" },
  { label: "COS (%)", name: "cos" },
  { label: "Equivalente umidade (%)", name: "equivalente_umidade" },
];

const FIELDS_PER_STEP = 5;

const FormComponent: React.FC<FormComponentProps> = ({
  control,
  step,
  setStep,
}) => {
  const theme = useTheme();

  const totalSteps = Math.ceil(ALL_FIELDS.length / FIELDS_PER_STEP);

  const startIndex = step * FIELDS_PER_STEP;
  const fieldsForStep = ALL_FIELDS.slice(
    startIndex,
    startIndex + FIELDS_PER_STEP
  );

  const onNext = () => setStep(Math.min(step + 1, totalSteps - 1));
  const onPrev = () => setStep(Math.max(step - 1, 0));

  return (
    <View>
      {fieldsForStep.map(({ label, name }) => (
        <Field key={String(name)} label={label} name={name} control={control} />
      ))}

      <View style={styles.buttonsContainer}>
        <Button
          mode="outlined"
          onPress={onPrev}
          disabled={step === 0}
          style={styles.button}
        >
          Anterior
        </Button>

        <Text style={{ alignSelf: "center", marginHorizontal: 8 }}>
          Etapa {step + 1} de {totalSteps}
        </Text>

        <Button
          mode="contained"
          onPress={onNext}
          disabled={step === totalSteps - 1}
          style={styles.button}
        >
          Próximo
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: { marginBottom: 16 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    minWidth: 100,
  },
});

export default FormComponent;
