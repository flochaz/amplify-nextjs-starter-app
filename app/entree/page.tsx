// Page to display a form where you can add an item to the inventory

"use client";

import InventaireUpdateForm from "@/ui-components/InventaireUpdateForm";
import { Flex, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Schema } from "@/amplify/data/resource";
import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import InventaireSearchBar from "@/ui-components/InventaireSearchBar";

const client = generateClient<Schema>();

export default function EntreePage() {
    const [depot, setDepot] = useState<Schema["Depot"]>();
  const [allee, setAllee] = useState<Schema["Allee"]>();

  const [depots, setDepots] = useState<Schema["Depot"][]>([]);
    const [allees, setAllees] = useState<Schema["Allee"][]>([]);
    const [inventaires, setInventaires] = useState<Schema["Inventaire"][]>([]);
const [inventaire, setInventaire] = useState<Schema["Inventaire"]>();


  // Remove inventaire from the list since it's been updated and set it to the next one
  const onSuccess = () => {
    const trimInventaires = inventaires.filter((inv) => inv.id !== inventaire?.id);
    setInventaires(trimInventaires);
  };
  return (
    <Flex
      direction="column"
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <Heading level={1} textAlign="center">
        Entree
      </Heading>
      <InventaireUpdateForm inventaire={inventaire} onSuccess={onSuccess}/>
      <InventaireSearchBar 
      depots={depots}
      allees={allees}
      inventaires={inventaires}
      depot={depot}
      allee={allee}
      setDepots={setDepots}
      setDepot={setDepot}
      setAllee={setAllee}
      setAllees={setAllees}
      setInventaires={setInventaires}
      setInventaire={setInventaire}
      inventaire={inventaire}
      freeOnly={true}/>
    </Flex>
  );
}
