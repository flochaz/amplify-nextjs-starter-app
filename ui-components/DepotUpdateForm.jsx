/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getDepot } from "./graphql/queries";
import { updateDepot } from "./graphql/mutations";
const client = generateClient();
export default function DepotUpdateForm(props) {
  const {
    id: idProp,
    depot: depotModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Nom: "",
  };
  const [Nom, setNom] = React.useState(initialValues.Nom);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = depotRecord
      ? { ...initialValues, ...depotRecord }
      : initialValues;
    setNom(cleanValues.Nom);
    setErrors({});
  };
  const [depotRecord, setDepotRecord] = React.useState(depotModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getDepot.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getDepot
        : depotModelProp;
      setDepotRecord(record);
    };
    queryData();
  }, [idProp, depotModelProp]);
  React.useEffect(resetStateValues, [depotRecord]);
  const validations = {
    Nom: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Nom: Nom ?? null,
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
            query: updateDepot.replaceAll("__typename", ""),
            variables: {
              input: {
                id: depotRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "DepotUpdateForm")}
      {...rest}
    >
      <TextField
        label="Nom"
        isRequired={false}
        isReadOnly={false}
        value={Nom}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Nom: value,
            };
            const result = onChange(modelFields);
            value = result?.Nom ?? value;
          }
          if (errors.Nom?.hasError) {
            runValidationTasks("Nom", value);
          }
          setNom(value);
        }}
        onBlur={() => runValidationTasks("Nom", Nom)}
        errorMessage={errors.Nom?.errorMessage}
        hasError={errors.Nom?.hasError}
        {...getOverrideProps(overrides, "Nom")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || depotModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || depotModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
