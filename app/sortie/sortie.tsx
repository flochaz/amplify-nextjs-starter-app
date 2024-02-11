// Page to search in inventory and be able to free the slot
"use client";

import { use, useEffect, useState } from "react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  SelectField,
  Text,
  TextField,
  Card,
  Collection,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import InventaireUpdateForm from "@/ui-components/InventaireUpdateForm";
import InventaireLocationInfoView from "@/ui-components/InventaireLocationInfoView";
import InventaireSearchBar from "@/ui-components/InventaireSearchBar";

const client = generateClient<Schema>();

export default function Sortie() {
  const [reference, setReference] = useState("");
  const [ext, setExt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [depots, setDepots] = useState<Schema["Depot"][]>([]);
  const [allees, setAllees] = useState<Schema["Allee"][]>([]);
  const [inventaires, setInventaires] = useState<Schema["Inventaire"][]>([]);

  const [depot, setDepot] = useState<Schema["Depot"]>();
  const [allee, setAllee] = useState<Schema["Allee"]>();
  const [inventaire, setInventaire] = useState<Schema["Inventaire"]>();

  const [searchResult, setSearchResult] = useState<Schema["Inventaire"][]>();

  useEffect(() => {
    console.log("inventaire selected");
    if (inventaire) {
      console.log("setting inventaire", inventaire);
      setSearchResult([inventaire]);
    }
  }, [inventaire]);

  return (
    <Flex
      direction="column"
      width="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <Heading level={1} textAlign="center">
        Sortie
      </Heading>
      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={4}
        width="100%"
        maxWidth="1000px"
      >
        <TextField
          label="Reference"
          placeholder="Reference"
          type="text"
          onChange={(e) => {
            setReference(e.target.value);
          }}
        />
        <TextField
          label="Ext"
          placeholder="Ext"
          type="text"
          onChange={(e) => {
            setExt(e.target.value);
          }}
        />
        <InventaireSearchBar
          depots={depots}
          allees={allees}
          depot={depot}
          allee={allee}
          setDepots={setDepots}
          setDepot={setDepot}
          setAllee={setAllee}
          setAllees={setAllees}
          setInventaires={setInventaires}
          setInventaire={setInventaire}
          inventaires={inventaires}
          inventaire={inventaire}
          freeOnly={false}
        />

        <Button
          color="primary"
          columnStart={1}
          columnEnd={-1}
          isLoading={isLoading}
          disabled={!reference}
          onClick={async () => {
            await searchRef();
          }}
        >
          Rechercher Ref
        </Button>
        <Button
          isLoading={isLoading}
          color="primary"
          columnStart={1}
          columnEnd={-1}
          onClick={async () => {
            await searchFree();
          }}
        >
          Rechercher Emplacement vide
        </Button>
      </Grid>
      <Collection
        items={searchResult ?? []}
        type="list"
        direction="row"
        wrap="wrap"
        isPaginated
        itemsPerPage={12}
        width={"100%"}
        maxWidth="1000px"
      >
        {(inv, index) => (
          <Card
            key={index}
            borderRadius="medium"
            variation="elevated"
            width={"100%"}
          >
            <InventaireLocationInfoView
              depot={depot ?? inv.Depot}
              allee={allee ?? inv.Allee}
              inventaire={inv}
            />
            <InventaireUpdateForm inventaire={inv} displayEmptyButton={true} />
          </Card>
        )}
      </Collection>
    </Flex>
  );

  async function searchFree() {
    try {
      setIsLoading(true);
      setInventaires([]);
      if (!inventaire && inventaires) {
        console.log(
          "inventaires already loaded, filtering in memory list",
          inventaires
        );
        setSearchResult(
          inventaires.filter(
            (inv) => !inv.Reference || inv.Reference === "Free"
          )
        );
      } else {
        let filters: any = {
          or: [
            { Reference: { eq: "Free" } },
            { Reference: { attributeExists: false } },
          ],
        };
        if (depot) {
          filters = {
            ...filters,
            depotInventairesId: { eq: depot.id },
          };
        }
        if (allee) {
          filters = {
            ...filters,
            alleeInventairesId: { eq: allee.id },
          };
        }
        let nextToken: string | undefined = "init";
        let inventairesLibre = [];
        while (nextToken) {
          const tmpInventairesLibre: any = await client.models.Inventaire.list({
            filter: filters,
            nextToken: nextToken === "init" ? undefined : nextToken,
            selectionSet: [
              "Emplacement",
              "Allee.Lettre",
              "Reference",
              "Ext",
              "PCB",
              "NbColis",
              "Depot.*",
              "id",
            ],
          });
          if (depot) {
            // inject depot name
            tmpInventairesLibre.data.forEach((inventaire: any) => {
              inventaire.Depot = depot;
            });
          }
          inventairesLibre.push(...tmpInventairesLibre.data);
          nextToken = tmpInventairesLibre.nextToken;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function searchRef() {
    try {
      setIsLoading(true);
      setInventaires([]);

      let filters: any = {
        Reference: { eq: reference },
      };
      if (ext) {
        filters = {
          ...filters,
          Ext: { eq: ext },
        };
      }
      if (depot) {
        filters = {
          ...filters,
          depotInventairesId: { eq: depot.id },
        };
      }
      if (allee) {
        filters = {
          ...filters,
          alleeInventairesId: { eq: allee.id },
        };
      }
      let nextToken: string | undefined = "init";
      let inventairesLibre = [];
      while (nextToken) {
        const tmpInventairesLibre: any = await client.models.Inventaire.list({
          filter: filters,
          nextToken: nextToken === "init" ? undefined : nextToken,
          selectionSet: [              
          "Emplacement",
          "Allee.Lettre",
          "Reference",
          "Ext",
          "PCB",
          "NbColis",
          "Depot.*",
          "id",],
        });
        if (depot) {
          // inject depot name
          tmpInventairesLibre.data.forEach((inventaire: any) => {
            inventaire.Depot = depot;
          });
        }
        inventairesLibre.push(...tmpInventairesLibre.data);
        nextToken = tmpInventairesLibre.nextToken;
      }
      console.log("inventairesLibre", inventairesLibre);
      setSearchResult(
        inventairesLibre.sort((a, b) => a.Allee.Lettre - b.Allee.Lettre)
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }
}
