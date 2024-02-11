/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAllee = /* GraphQL */ `
  mutation CreateAllee(
    $condition: ModelAlleeConditionInput
    $input: CreateAlleeInput!
  ) {
    createAllee(condition: $condition, input: $input) {
      Depot {
        Nom
        createdAt
        id
        updatedAt
        __typename
      }
      Inventaires {
        nextToken
        __typename
      }
      Lettre
      createdAt
      depotAlleesId
      id
      updatedAt
      __typename
    }
  }
`;
export const createDepot = /* GraphQL */ `
  mutation CreateDepot(
    $condition: ModelDepotConditionInput
    $input: CreateDepotInput!
  ) {
    createDepot(condition: $condition, input: $input) {
      Allees {
        nextToken
        __typename
      }
      Inventaires {
        nextToken
        __typename
      }
      Nom
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const createInventaire = /* GraphQL */ `
  mutation CreateInventaire(
    $condition: ModelInventaireConditionInput
    $input: CreateInventaireInput!
  ) {
    createInventaire(condition: $condition, input: $input) {
      Allee {
        Lettre
        createdAt
        depotAlleesId
        id
        updatedAt
        __typename
      }
      Date
      Depot {
        Nom
        createdAt
        id
        updatedAt
        __typename
      }
      Emplacement
      Ext
      NbColis
      PCB
      Quantite
      Reference
      alleeInventairesId
      createdAt
      depotInventairesId
      id
      updatedAt
      __typename
    }
  }
`;
export const deleteAllee = /* GraphQL */ `
  mutation DeleteAllee(
    $condition: ModelAlleeConditionInput
    $input: DeleteAlleeInput!
  ) {
    deleteAllee(condition: $condition, input: $input) {
      Depot {
        Nom
        createdAt
        id
        updatedAt
        __typename
      }
      Inventaires {
        nextToken
        __typename
      }
      Lettre
      createdAt
      depotAlleesId
      id
      updatedAt
      __typename
    }
  }
`;
export const deleteDepot = /* GraphQL */ `
  mutation DeleteDepot(
    $condition: ModelDepotConditionInput
    $input: DeleteDepotInput!
  ) {
    deleteDepot(condition: $condition, input: $input) {
      Allees {
        nextToken
        __typename
      }
      Inventaires {
        nextToken
        __typename
      }
      Nom
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const deleteInventaire = /* GraphQL */ `
  mutation DeleteInventaire(
    $condition: ModelInventaireConditionInput
    $input: DeleteInventaireInput!
  ) {
    deleteInventaire(condition: $condition, input: $input) {
      Allee {
        Lettre
        createdAt
        depotAlleesId
        id
        updatedAt
        __typename
      }
      Date
      Depot {
        Nom
        createdAt
        id
        updatedAt
        __typename
      }
      Emplacement
      Ext
      NbColis
      PCB
      Quantite
      Reference
      alleeInventairesId
      createdAt
      depotInventairesId
      id
      updatedAt
      __typename
    }
  }
`;
export const updateAllee = /* GraphQL */ `
  mutation UpdateAllee(
    $condition: ModelAlleeConditionInput
    $input: UpdateAlleeInput!
  ) {
    updateAllee(condition: $condition, input: $input) {
      Depot {
        Nom
        createdAt
        id
        updatedAt
        __typename
      }
      Inventaires {
        nextToken
        __typename
      }
      Lettre
      createdAt
      depotAlleesId
      id
      updatedAt
      __typename
    }
  }
`;
export const updateDepot = /* GraphQL */ `
  mutation UpdateDepot(
    $condition: ModelDepotConditionInput
    $input: UpdateDepotInput!
  ) {
    updateDepot(condition: $condition, input: $input) {
      Allees {
        nextToken
        __typename
      }
      Inventaires {
        nextToken
        __typename
      }
      Nom
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const updateInventaire = /* GraphQL */ `
  mutation UpdateInventaire(
    $condition: ModelInventaireConditionInput
    $input: UpdateInventaireInput!
  ) {
    updateInventaire(condition: $condition, input: $input) {
      Allee {
        Lettre
        createdAt
        depotAlleesId
        id
        updatedAt
        __typename
      }
      Date
      Depot {
        Nom
        createdAt
        id
        updatedAt
        __typename
      }
      Emplacement
      Ext
      NbColis
      PCB
      Quantite
      Reference
      alleeInventairesId
      createdAt
      depotInventairesId
      id
      updatedAt
      __typename
    }
  }
`;
