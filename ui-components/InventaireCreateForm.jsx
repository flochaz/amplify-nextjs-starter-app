/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createInventaire } from "./graphql/mutations";
const client = generateClient();
export default function InventaireCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Emplacement: "",
    Reference: "",
    Ext: "",
    PCB: "",
    NbColis: "",
    Quantite: "",
    Date: "",
  };
  const [Emplacement, setEmplacement] = React.useState(
    initialValues.Emplacement
  );
  const [Reference, setReference] = React.useState(initialValues.Reference);
  const [Ext, setExt] = React.useState(initialValues.Ext);
  const [PCB, setPCB] = React.useState(initialValues.PCB);
  const [NbColis, setNbColis] = React.useState(initialValues.NbColis);
  const [Quantite, setQuantite] = React.useState(initialValues.Quantite);
  const [Date, setDate] = React.useState(initialValues.Date);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmplacement(initialValues.Emplacement);
    setReference(initialValues.Reference);
    setExt(initialValues.Ext);
    setPCB(initialValues.PCB);
    setNbColis(initialValues.NbColis);
    setQuantite(initialValues.Quantite);
    setDate(initialValues.Date);
    setErrors({});
  };
  const validations = {
    Emplacement: [],
    Reference: [],
    Ext: [],
    PCB: [],
    NbColis: [],
    Quantite: [],
    Date: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Emplacement,
          Reference,
          Ext,
          PCB,
          NbColis,
          Quantite,
          Date,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createInventaire.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "InventaireCreateForm")}
      {...rest}
    >
      <TextField
        label="Emplacement"
        isRequired={false}
        isReadOnly={false}
        value={Emplacement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Emplacement: value,
              Reference,
              Ext,
              PCB,
              NbColis,
              Quantite,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.Emplacement ?? value;
          }
          if (errors.Emplacement?.hasError) {
            runValidationTasks("Emplacement", value);
          }
          setEmplacement(value);
        }}
        onBlur={() => runValidationTasks("Emplacement", Emplacement)}
        errorMessage={errors.Emplacement?.errorMessage}
        hasError={errors.Emplacement?.hasError}
        {...getOverrideProps(overrides, "Emplacement")}
      ></TextField>
      <TextField
        label="Reference"
        isRequired={false}
        isReadOnly={false}
        value={Reference}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Emplacement,
              Reference: value,
              Ext,
              PCB,
              NbColis,
              Quantite,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.Reference ?? value;
          }
          if (errors.Reference?.hasError) {
            runValidationTasks("Reference", value);
          }
          setReference(value);
        }}
        onBlur={() => runValidationTasks("Reference", Reference)}
        errorMessage={errors.Reference?.errorMessage}
        hasError={errors.Reference?.hasError}
        {...getOverrideProps(overrides, "Reference")}
      ></TextField>
      <TextField
        label="Ext"
        isRequired={false}
        isReadOnly={false}
        value={Ext}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Emplacement,
              Reference,
              Ext: value,
              PCB,
              NbColis,
              Quantite,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.Ext ?? value;
          }
          if (errors.Ext?.hasError) {
            runValidationTasks("Ext", value);
          }
          setExt(value);
        }}
        onBlur={() => runValidationTasks("Ext", Ext)}
        errorMessage={errors.Ext?.errorMessage}
        hasError={errors.Ext?.hasError}
        {...getOverrideProps(overrides, "Ext")}
      ></TextField>
      <TextField
        label="Pcb"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={PCB}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Emplacement,
              Reference,
              Ext,
              PCB: value,
              NbColis,
              Quantite,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.PCB ?? value;
          }
          if (errors.PCB?.hasError) {
            runValidationTasks("PCB", value);
          }
          setPCB(value);
        }}
        onBlur={() => runValidationTasks("PCB", PCB)}
        errorMessage={errors.PCB?.errorMessage}
        hasError={errors.PCB?.hasError}
        {...getOverrideProps(overrides, "PCB")}
      ></TextField>
      <TextField
        label="Nb colis"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={NbColis}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Emplacement,
              Reference,
              Ext,
              PCB,
              NbColis: value,
              Quantite,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.NbColis ?? value;
          }
          if (errors.NbColis?.hasError) {
            runValidationTasks("NbColis", value);
          }
          setNbColis(value);
        }}
        onBlur={() => runValidationTasks("NbColis", NbColis)}
        errorMessage={errors.NbColis?.errorMessage}
        hasError={errors.NbColis?.hasError}
        {...getOverrideProps(overrides, "NbColis")}
      ></TextField>
      <TextField
        label="Quantite"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Quantite}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Emplacement,
              Reference,
              Ext,
              PCB,
              NbColis,
              Quantite: value,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.Quantite ?? value;
          }
          if (errors.Quantite?.hasError) {
            runValidationTasks("Quantite", value);
          }
          setQuantite(value);
        }}
        onBlur={() => runValidationTasks("Quantite", Quantite)}
        errorMessage={errors.Quantite?.errorMessage}
        hasError={errors.Quantite?.hasError}
        {...getOverrideProps(overrides, "Quantite")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={Date && convertToLocal(new Date(Date))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              Emplacement,
              Reference,
              Ext,
              PCB,
              NbColis,
              Quantite,
              Date: value,
            };
            const result = onChange(modelFields);
            value = result?.Date ?? value;
          }
          if (errors.Date?.hasError) {
            runValidationTasks("Date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("Date", Date)}
        errorMessage={errors.Date?.errorMessage}
        hasError={errors.Date?.hasError}
        {...getOverrideProps(overrides, "Date")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
