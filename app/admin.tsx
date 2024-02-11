// Page to create Depot and Allee using ui-components/*Form.jsx
"use client";

import * as Papa from "papaparse";
import { generateClient } from 'aws-amplify/data';
import { Schema } from "@/amplify/data/resource";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { cookiesClient } from "@/utils/amplify-utils";

const client = generateClient<Schema>();

export default async function Admin() {
  const { data: allees } = await cookiesClient.models.Allee.list();
  const { data: depots } = await cookiesClient.models.Depot.list();
  const { data: inventaires } = await cookiesClient.models.Inventaire.list();


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
          cookiesClient.models.Depot.create({
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
          if (existingAllee) {
            console.log("Allee already exists", existingAllee);
            cookiesClient.models.Allee.update({
              id: existingAllee.id,
              depotAlleesId: depots?.find(
                (depot) => depot.Nom === allee.Depot
              )!.id,
            });
          } else {
            console.log("Allee does not exist yet: " + allee.Lettre);
            cookiesClient.models.Allee.create({
              Lettre: allee.Lettre,
              depotAlleesId: depots?.find(
                (depot) => depot.Nom === allee.Depot
              )!.id,
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
          if (existingInventaire) {
            console.log("Inventaire already exists", existingInventaire);
            cookiesClient.models.Inventaire.update({
              id: existingInventaire.id,
              Emplacement: inventaire.Emplacement,
              Reference: inventaire.Reference,
              Ext: inventaire.Ext,
              PCB: inventaire.PCB,
              NbColis: inventaire.NbColis,
              Quantite: inventaire.Quantite,
              Date: date,
              depotInventairesId: depots?.find(
                (depot) => depot.Nom === inventaire.Depot
              )!.id,
              alleeInventairesId: allees?.find(
                (allee) => allee.Lettre === inventaire.Allee
              )!.id,
            });
          } else {
            console.log("Inventaire does not exist yet: " + inventaire.Lettre);
            cookiesClient.models.Inventaire.create({
              Emplacement: inventaire.Emplacement,
              Reference: inventaire.Reference,
              Ext: inventaire.Ext,
              PCB: inventaire.PCB,
              NbColis: inventaire.NbColis,
              Quantite: inventaire.Quantite,
              Date: date,
              depotInventairesId: depots?.find(
                (depot) => depot.Nom === inventaire.Depot
              )!.id,
              alleeInventairesId: allees?.find(
                (allee) => allee.Lettre === inventaire.Allee
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
        {/* Table showing current Depot */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nom</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {depots?.map((depot) => (
              <TableRow key={depot.id}>
                <TableCell>{depot.id}</TableCell>
                <TableCell>{depot.Nom}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
        {/* Table showing current Allee */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Depot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allees?.map((allee) => (
              <TableRow key={allee.id}>
                <TableCell>{allee.id}</TableCell>
                <TableCell>{allee.Lettre}</TableCell>
                <TableCell>{allee.depotAlleesId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
        {/* Table showing current Inventaire */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Emplacement</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Ext</TableCell>
              <TableCell>PCB</TableCell>
              <TableCell>NbColis</TableCell>
              <TableCell>Quantite</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Depot</TableCell>
              <TableCell>Allee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventaires?.map((inventaire:any) => (
              <TableRow key={inventaire.id}>
                <TableCell>{inventaire.id}</TableCell>
                <TableCell>{inventaire.Emplacement}</TableCell>
                <TableCell>{inventaire.Reference}</TableCell>
                <TableCell>{inventaire.Ext}</TableCell>
                <TableCell>{inventaire.PCB}</TableCell>
                <TableCell>{inventaire.NbColis}</TableCell>
                <TableCell>{inventaire.Quantite}</TableCell>
                <TableCell>{inventaire.Date}</TableCell>
                <TableCell>{inventaire.Depot?.Nom}</TableCell>
                <TableCell>{inventaire.Allee?.Lettre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </>
  );
}
