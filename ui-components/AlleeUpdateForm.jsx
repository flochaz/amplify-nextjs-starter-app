/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getAllee } from "./graphql/queries";
import { updateAllee } from "./graphql/mutations";
const client = generateClient();
export default function AlleeUpdateForm(props) {
  const {
    id: idProp,
    allee: alleeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Lettre: "",
  };
  const [Lettre, setLettre] = React.useState(initialValues.Lettre);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = alleeRecord
      ? { ...initialValues, ...alleeRecord }
      : initialValues;
    setLettre(cleanValues.Lettre);
    setErrors({});
  };
  const [alleeRecord, setAlleeRecord] = React.useState(alleeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getAllee.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getAllee
        : alleeModelProp;
      setAlleeRecord(record);
    };
    queryData();
  }, [idProp, alleeModelProp]);
  React.useEffect(resetStateValues, [alleeRecord]);
  const validations = {
    Lettre: [],
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
          Lettre: Lettre ?? null,
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
            query: updateAllee.replaceAll("__typename", ""),
            variables: {
              input: {
                id: alleeRecord.id,
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
      {...getOverrideProps(overrides, "AlleeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Lettre"
        isRequired={false}
        isReadOnly={false}
        value={Lettre}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Lettre: value,
            };
            const result = onChange(modelFields);
            value = result?.Lettre ?? value;
          }
          if (errors.Lettre?.hasError) {
            runValidationTasks("Lettre", value);
          }
          setLettre(value);
        }}
        onBlur={() => runValidationTasks("Lettre", Lettre)}
        errorMessage={errors.Lettre?.errorMessage}
        hasError={errors.Lettre?.hasError}
        {...getOverrideProps(overrides, "Lettre")}
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
          isDisabled={!(idProp || alleeModelProp)}
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
              !(idProp || alleeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
