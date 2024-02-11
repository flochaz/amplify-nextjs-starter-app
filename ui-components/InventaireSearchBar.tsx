// Page to display a form where you can add an item to the inventory

"use client";

import { Grid, SelectField } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function InventaireSearchBar(props: { 
  depots: Schema["Depot"][],
  depot: Schema["Depot"] | undefined,
  allees: Schema["Allee"][],
  allee: Schema["Allee"] | undefined,
  inventaires: Schema["Inventaire"][],
  inventaire: Schema["Inventaire"] | undefined,
  setDepots: any,
  setAllees: any,
  setInventaires: any,
  setInventaire: any, 
  setDepot: any,
  setAllee: any,
  freeOnly: boolean; 
}) {
  const { 
    depots,
    allees,
    inventaires,
    depot,
    allee,
    setDepots,
    setDepot,
    setAllee,
    setAllees,
    setInventaires,
    setInventaire, freeOnly } = props;

  const [loadingDepots, setLoadingDepots] = useState(false);
  const [loadingAllees, setLoadingAllees] = useState(false);
  const [loadingInventaires, setLoadingInventaires] = useState(false);
  const [emplacementPlaceHolder, setEmplacementPlaceHolder] = useState("Selectionner une allée");

  const loadDepots = async () => {
    setLoadingDepots(true);
    const listDepotsResponse = await client.models.Depot.list();
    setDepots(listDepotsResponse.data);
    setLoadingDepots(false);
    return listDepotsResponse.data;
  };

  const loadAllees = async () => {
    if (!depot) return [];
    setLoadingAllees(true);
    const listAlleesResponse = await client.models.Allee.list({
      filter: {
        depotAlleesId: {
          eq: depot.id,
        },
      },
    });
    setAllees(listAlleesResponse.data);
    setLoadingAllees(false);
    return listAlleesResponse.data;
  };

  const loadInventaires = async () => {
    if (!allee) return [];
    setLoadingInventaires(true);
    setEmplacementPlaceHolder("Recherche en cours ...");
    let filter: any = {
      alleeInventairesId: {
        eq: allee.id,
      },
    };
    if (freeOnly) {
      filter = {
        ...filter,
        or: [
          { Reference: { eq: "Free" } },
          { Reference: { attributeExists: false } },
        ],
      };
    }
    let nextToken: string | undefined = "init";
            let listInventaires = [];
            while (nextToken) {
              const listInventairesResponse: any = await client.models.Inventaire.list({
                filter,
                nextToken: nextToken === "init" ? undefined : nextToken,
              });
              listInventaires.push(...listInventairesResponse.data);
              nextToken = listInventairesResponse.nextToken;
            }

    setInventaires(listInventaires);
    
    if (listInventaires.length === 0) {
      setEmplacementPlaceHolder("Pas d'emplacement disponible");
    } else {
      setEmplacementPlaceHolder("Selectionner un emplacement");
    }
    setLoadingInventaires(false);
  };

  useState(() => {
    loadDepots();
  });

  useEffect(() => {
    loadAllees();
  }, [depot]);

  useEffect(() => {
    loadInventaires();
  }, [allee]);

  return (

      <Grid
        as="form"
        rowGap="15px"
        columnGap="15px"
        padding="20px"
        templateColumns="1fr 1fr 1fr"
        templateRows="1fr 1fr 1fr"
      >
        <SelectField
          label="Depot"
          shrink="0"
          placeholder={loadingDepots ? "Chargement en cours ..." : "Choisir un depot"}
          size="small"
          isDisabled={false}
          labelHidden={false}
          onChange={(event) => {
            setAllee(undefined);
            const depotId = event.target.value;
            const depot = depots?.find((depot) => depot.id === depotId);
            setDepot(depot);
            console.log("depot", depot);
          }}
        >
          {depots
            ?.sort((a, b) => a.Nom!.localeCompare(b.Nom!))
            .map((depot) => (
              <option key={depot.id} value={depot.id}>
                {depot.Nom}
              </option>
            ))}
        </SelectField>
        <SelectField
          label="Allee"
          placeholder={loadingAllees ? "Chargement en cours ..." : "Choisir une allée"}

          shrink="0"
          size="small"
          isDisabled={depot === undefined || loadingAllees}
          labelHidden={false}
          onChange={(event) => {
            setInventaire(undefined);
            const alleeId = event.target.value;
            const allee = allees?.find((allee) => allee.id === alleeId);
            setAllee(allee);
            console.log("allee", allee);
          }}
        >
          {allees
            ?.filter((allee) => allee.depotAlleesId === depot?.id)
            .sort((a, b) => a.Lettre!.localeCompare(b.Lettre!))
            .map((allee) => (
              <option key={allee.id} value={allee.id}>
                {allee.Lettre}
              </option>
            ))}
        </SelectField>
        <SelectField
          label="Emplacement"
          placeholder={loadingInventaires || loadingAllees || loadingDepots ? "Chargement en cours ..." : "selectionner un emplacement"}
          shrink="0"
          size="small"
          isDisabled={allee === undefined || loadingInventaires}
          labelHidden={false}
          onChange={(event) => {
            const inventaireId = event.target.value;
            const inventaire = inventaires?.find(
              (inventaire) => inventaire.id === inventaireId
            );
            setInventaire(inventaire);
            console.log("inventaire", inventaire);
          }}
        >
          {inventaires
          .sort((a, b) => a.Emplacement!.localeCompare(b.Emplacement!) )
          .map((inventaire) => (
              <option key={inventaire.id} value={inventaire.id}>
                {inventaire.Emplacement}
              </option>
            ))}
        </SelectField>
      </Grid>
  );
}
