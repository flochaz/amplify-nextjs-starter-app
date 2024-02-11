// Component to display inventaire Depot, Allee and Emplacement

"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";

export default function InventaireLocationInfoView(props) {

  console.log("InventaireLocationInfoView props", JSON.stringify(props));
  

    return (
        <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      templateColumns="1fr 1fr 1fr"
      templateRows="auto"
      >
        <TextField
        label="Depot"
        editable={false}
        disabled={true}
        value={props.depot?.Nom}
        />
        <TextField
        label="Allee"
        editable={false}
        value={props.allee?.Lettre}
        disabled={true}
        />
        <TextField
        label="Emplacement"
        editable={false}
        value={props.inventaire?.Emplacement}
        disabled={true}
        />
      </Grid>
    )
}