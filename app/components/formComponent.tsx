import React from "react";
import { Controller } from "react-hook-form";
import { ScrollView, Text, TextInput, View } from "react-native";

interface FieldProps {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
}

const Field: React.FC<FieldProps> = ({ label, name, control, placeholder }) => (
  <View style={{ marginBottom: 16 }}>
    <Text>{label}</Text>
    <Controller
      control={control}
      rules={{ required: true }}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 10,
            padding: 8,
          }}
          placeholder={placeholder || label}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )}
    />
  </View>
);

interface FormComponentProps {
  control: any;
}

const FormComponent: React.FC<FormComponentProps> = ({ control }) => (
  <ScrollView contentContainerStyle={{ padding: 16 }}>
    <Field
      label="Identificador da amostra"
      name="identificador"
      control={control}
    />
    <Field label="Localização da coleta" name="localizacao" control={control} />
    <Field
      label="Horizonte diagnóstico subsuperficial"
      name="horizonte"
      control={control}
    />
    <Field label="Cor (Padrão Munsell)" name="cor_munsell" control={control} />
    <Field label="Cor (Visual)" name="cor_visual" control={control} />
    <Field label="Cerosidade" name="cerosidade" control={control} />
    <Field label="Areia grossa (%)" name="areia_grossa" control={control} />
    <Field label="Areia fina (%)" name="areia_fina" control={control} />
    <Field label="Silte (%)" name="silte" control={control} />
    <Field label="Argila total (%)" name="argila_total" control={control} />
    <Field
      label="Argila dispersa em água (%)"
      name="argila_dispersa"
      control={control}
    />
    <Field
      label="Grau de floculação (%)"
      name="grau_floculacao"
      control={control}
    />
    <Field label="Silte/Argila" name="silte_argila" control={control} />
    <Field label="Silte/Areia fina" name="silte_areia_fina" control={control} />
    <Field label="pH água" name="ph_agua" control={control} />
    <Field label="pH KCl" name="ph_kcl" control={control} />
    <Field label="Delta pH" name="delta_ph" control={control} />
    <Field label="Ca (cmolc/dm³)" name="ca" control={control} />
    <Field label="Mg (cmolc/dm³)" name="mg" control={control} />
    <Field label="K (cmolc/dm³)" name="k" control={control} />
    <Field label="Na (cmolc/dm³)" name="na" control={control} />
    <Field label="Al (cmolc/dm³)" name="al" control={control} />
    <Field label="H (cmolc/dm³)" name="h" control={control} />
    <Field label="Soma bases (cmolc/dm³)" name="soma_bases" control={control} />
    <Field label="CTCt (cmolc/dm³)" name="ctct" control={control} />
    <Field label="Sat Al (%)" name="sat_al" control={control} />
    <Field label="CTCT (cmolc/dm³)" name="ctct_efetiva" control={control} />
    <Field label="Sat bases (%)" name="sat_bases" control={control} />
    <Field label="Retenção cátions" name="retencao_cations" control={control} />
    <Field
      label="Atividade argila (cmolc/kg)"
      name="atividade_argila"
      control={control}
    />
    <Field label="COS (%)" name="cos" control={control} />
    <Field
      label="Equivalente umidade (%)"
      name="equivalente_umidade"
      control={control}
    />
  </ScrollView>
);

export default FormComponent;
