// Page to create Depot and Allee using ui-components/*Form.jsx
"use client";
import * as Papa from "papaparse";

import { generateClient } from 'aws-amplify/data';
import { Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

export default  function Admin() {
  const [depots, setDepots] = useState<Schema["Depot"][]>();
  const [allees, setAllees] = useState<Schema["Allee"][]>();
  const [inventaires, setInventaires] = useState<Schema["Inventaire"][]>();

  useEffect(() => {
    client.models.Depot.list().then((response) => {
      setDepots(response.data);
    });
    client.models.Allee.list().then((response) => {
      setAllees(response.data);
    });
    client.models.Inventaire.list().then((response) => {
      setInventaires(response.data);
    });
  }, []);


  const depotChangeHandler = async (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results: any) {
        console.log(results.data);
        for (let i = 0; i < results.data.length; i++) {
          const depot = results.data[i];
          console.log(depot);
          // check if depot with this Nom already exists
          const existingDepot = depots?.find(
            (existingDepot: any) => existingDepot.Nom === depot.Nom
          );
          if (existingDepot) {
            console.log("Depot already exists", existingDepot);
            continue;
          }
          client.models.Depot.create({
              Nom: depot.Nom,
          });
        }
      },
    });
  };

  const alleeChangeHandler = async (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results: any) {
        console.log(results.data);
        for (let i = 0; i < results.data.length; i++) {
          const allee = results.data[i];
          console.log(allee);
          // check if allee with this Nom already exists
          const existingAllee = allees?.find(
            (existingAllee: any) => existingAllee.Lettre === allee.Lettre
          );
          const depot = depots?.find(
            (depot: Schema["Depot"]) => depot.Nom === allee.Depot
          );
          if (existingAllee && depot) {
            console.log("Allee already exists", existingAllee);
            client.models.Allee.update({
              id: existingAllee.id,
              depotAlleesId: depot.id,
            });
          } else {
            console.log("Allee does not exist yet: " + allee.Lettre);
            client.models.Allee.create({
              Lettre: allee.Lettre,
              depotAlleesId: depots?.find(
                (depot: Schema["Depot"]) => depot.Nom === allee.Depot
              )?.id,
            });
          }
        }
      },
    });
  };

  const inventaireChangeHandler = async (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results: any) {
        console.log(results.data);
        for (let i = 0; i < results.data.length; i++) {
          const inventaire = results.data[i];
          console.log(inventaire);
          // check if inventaire with this Nom already exists
          const existingInventaire = inventaires?.find(
            (existingInventaire: any) =>
              existingInventaire.Emplacement === inventaire.Emplacement
          );
          
          const date = convertHoneycodeDateToAWSDate(inventaire.Date);
          const depot = depots?.find(
            (depot: Schema["Depot"]) => depot.Nom === inventaire.Depot
          );
          const allee = allees?.find(
            (allee: Schema["Allee"]) => allee.Lettre === inventaire.Allee
          );
          if (existingInventaire && depot && allee) {
            console.log("Inventaire already exists", existingInventaire);
            client.models.Inventaire.update({
              id: existingInventaire.id,
              Emplacement: inventaire.Emplacement,
              Reference: inventaire.Reference,
              Ext: inventaire.Ext,
              PCB: inventaire.PCB,
              NbColis: inventaire.NbColis,
              Quantite: inventaire.Quantite,
              Date: date,
              depotInventairesId: depot.id,
              alleeInventairesId: allee.id,
            });
          } else {
            console.log("Inventaire does not exist yet: " + inventaire.Lettre);
            client.models.Inventaire.create({
              Emplacement: inventaire.Emplacement,
              Reference: inventaire.Reference,
              Ext: inventaire.Ext,
              PCB: inventaire.PCB,
              NbColis: inventaire.NbColis,
              Quantite: inventaire.Quantite,
              Date: date,
              depotInventairesId: depots?.find(
                (depot: Schema["Depot"]) => depot.Nom === inventaire.Depot
              )!.id,
              alleeInventairesId: allees?.find(
                (allee: Schema["Allee"]) => allee.Lettre === inventaire.Allee
              )!.id,
            });
          }
        }
      },
    });

    /**
     * Convert date in a format that put month first to AWSDate format
     * @param honeycodeDate Date in Honeycode format (mm/dd/yy) ex:10/23/23
     */
    function convertHoneycodeDateToAWSDate(honeycodeDate: string): string {
      const date = new Date(honeycodeDate);
      console.log("date", date);
      try {
        const awsDate = date.toISOString().split("T")[0];
        return awsDate;
      } catch (error) {
        console.error(`Error converting date ${honeycodeDate}`, error);
        return (new Date()).toISOString().split("T")[0];
      }
    }

  };

  return (
    <>
      <>
        <h1>Depot</h1>
        <input
        type="file"
        name="file"
        accept=".csv"
        onChange={depotChangeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
        {/* table showing current Depot */}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {depots?.map((depot) => (
              <tr key={depot.id}>
                <td>{depot.id}</td>
                <td>{depot.Nom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      <>
        <h1>Allee</h1>
        <input
        type="file"
        name="file"
        accept=".csv"
        onChange={alleeChangeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
        {/* table showing current Allee */}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Depot</th>
            </tr>
          </thead>
          <tbody>
            {allees?.map((allee) => (
              <tr key={allee.id}>
                <td>{allee.id}</td>
                <td>{allee.Lettre}</td>
                <td>{allee.depotAlleesId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      <>
        <h1>Inventaire</h1>
        <input
        type="file"
        name="file"
        accept=".csv"
        onChange={inventaireChangeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
        {/* table showing current Inventaire */}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Emplacement</th>
              <th>Reference</th>
              <th>Ext</th>
              <th>PCB</th>
              <th>NbColis</th>
              <th>Quantite</th>
              <th>Date</th>
              <th>Depot</th>
              <th>Allee</th>
            </tr>
          </thead>
          <tbody>
            {inventaires?.map((inventaire:any) => (
              <tr key={inventaire.id}>
                <td>{inventaire.id}</td>
                <td>{inventaire.Emplacement}</td>
                <td>{inventaire.Reference}</td>
                <td>{inventaire.Ext}</td>
                <td>{inventaire.PCB}</td>
                <td>{inventaire.NbColis}</td>
                <td>{inventaire.Quantite}</td>
                <td>{inventaire.Date}</td>
                <td>{inventaire.Depot?.Nom}</td>
                <td>{inventaire.Allee?.Lettre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </>
  );
}
