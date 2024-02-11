/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import {
  getInventaire,
  listAllees,
  listDepots,
  listInventaires,
} from "./graphql/queries";
import { updateInventaire } from "./graphql/mutations";
const client = generateClient();
export default function InventaireUpdateForm(props) {
  const {
    id: idProp,
    inventaire: inventaireModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    displayEmptyButton,
    ...rest
  } = props;
  const initialValues = {
    Depot: "",
    Allee: "",
    Emplacement: "",
    Reference: "",
    Ext: "",
    PCB: "",
    NbColis: "",
    Quantite: "",
  };
  const [depot, setDepot] = React.useState(initialValues.Depot);
  const [allee, setAllee] = React.useState(initialValues.Allee);

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
  const revertStateValues = () => {
      const cleanValues = inventaireRecord
        ? { ...initialValues, ...inventaireRecord } : initialValues;
    setAllee(cleanValues.Allee);
    setDepot(cleanValues.Depot);
    setEmplacement(cleanValues.Emplacement);
    setReference(cleanValues.Reference);
    setExt(cleanValues.Ext);
    setPCB(cleanValues.PCB);
    setNbColis(cleanValues.NbColis);
    setQuantite(cleanValues.Quantite);
    setDate(cleanValues.Date);
    setErrors({});
    }
  const resetStateValues = () => {

    // setAllee(initialValues.Allee);
    // setDepot(initialValues.Depot);
    // setEmplacement(initialValues.Emplacement);
    setReference(initialValues.Reference);
    setExt(initialValues.Ext);
    setPCB(initialValues.PCB);
    setNbColis(initialValues.NbColis);
    setQuantite(initialValues.Quantite);
    setDate(initialValues.Date);
    setErrors({});
  };
  const [inventaireRecord, setInventaireRecord] =
    React.useState(inventaireModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getInventaire.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getInventaire
        : inventaireModelProp;
      setInventaireRecord(record);
    };
    queryData();
  }, [idProp, inventaireModelProp]);
  React.useEffect(revertStateValues, [inventaireRecord]);
  const validations = {
    Emplacement: [],
    Reference: [],
    Ext: [],
    PCB: [],
    NbColis: [],
    Quantite: [],
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
      templateColumns="1fr 1fr 1fr"
      templateRows="1fr 1fr 0.5fr 0.5fr"
      onSubmit={async event => save(event)}
      {...getOverrideProps(overrides, "InventaireUpdateForm")}
      {...rest}
    >
      <TextField
        label="Extension"
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
              date,
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
        label="Quantite"
        isRequired={false}
        isReadOnly={true}
        disabled={true}
        type="number"
        step="any"
        value={PCB * NbColis}
        onBlur={() => runValidationTasks("Quantite", Quantite)}
        errorMessage={errors.Quantite?.errorMessage}
        hasError={errors.Quantite?.hasError}
        {...getOverrideProps(overrides, "Quantite")}
      ></TextField>
      <Button
        children="Effacer"
        type="reset"
        onClick={(event) => {
          event.preventDefault();
          resetStateValues();
        }}
        {...getOverrideProps(overrides, "ResetButton")}
      ></Button>

{displayEmptyButton && <Button
        children="Vider"
        type="submit"
        variation="primary"
        columnStart={1}
        columnEnd={-1}
        isDisabled={
          !(idProp || inventaireModelProp) ||
          Object.values(errors).some((e) => e?.hasError)
        }
        {...getOverrideProps(overrides, "SubmitButton")}
        onClick={(event) => {
          resetStateValues();
          save(event, true);
        }
      }
      ></Button>}
      <Button
        children="Sauvegarder"
        type="submit"
        variation="primary"
        columnStart={1}
        columnEnd={-1}
        isDisabled={
          !(idProp || inventaireModelProp) ||
          Object.values(errors).some((e) => e?.hasError)
        }
        {...getOverrideProps(overrides, "SubmitButton")}
      ></Button>
    </Grid>
  );

  async function save(event, empty = false) {
      event.preventDefault();
      let modelFields = {
        Emplacement: Emplacement ?? null,
        Reference: empty ? null : Reference ?? null,
        Ext: empty ? null : Ext ?? null,
        PCB: empty ? null : PCB ?? null,
        NbColis: empty ? null : NbColis ?? null,
        Quantite: empty ? null : Quantite ?? null,
      };
      const validationResponses = await Promise.all(
        Object.keys(validations).reduce((promises, fieldName) => {
          if (Array.isArray(modelFields[fieldName])) {
            promises.push(
              ...modelFields[fieldName].map((item) => runValidationTasks(fieldName, item)
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
          query: updateInventaire.replaceAll("__typename", ""),
          variables: {
            input: {
              id: inventaireRecord.id,
              ...modelFields,
              depotInventairesId: inventaireRecord.depotInventairesId,
              alleeInventairesId: inventaireRecord.alleeInventairesId,
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
      
    };
  }
}
