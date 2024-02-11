/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAllee = /* GraphQL */ `
  query GetAllee($id: ID!) {
    getAllee(id: $id) {
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
export const getDepot = /* GraphQL */ `
  query GetDepot($id: ID!) {
    getDepot(id: $id) {
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
export const getInventaire = /* GraphQL */ `
  query GetInventaire($id: ID!) {
    getInventaire(id: $id) {
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
export const listAllees = /* GraphQL */ `
  query ListAllees(
    $filter: ModelAlleeFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAllees(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        Lettre
        createdAt
        depotAlleesId
        id
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listDepots = /* GraphQL */ `
  query ListDepots(
    $filter: ModelDepotFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDepots(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        Nom
        createdAt
        id
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listInventaires = /* GraphQL */ `
  query ListInventaires(
    $filter: ModelInventaireFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listInventaires(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        Date
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
      nextToken
      __typename
    }
  }
`;
