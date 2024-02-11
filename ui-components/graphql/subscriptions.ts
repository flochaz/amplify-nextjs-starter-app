/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAllee = /* GraphQL */ `
  subscription OnCreateAllee($filter: ModelSubscriptionAlleeFilterInput) {
    onCreateAllee(filter: $filter) {
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
export const onCreateDepot = /* GraphQL */ `
  subscription OnCreateDepot($filter: ModelSubscriptionDepotFilterInput) {
    onCreateDepot(filter: $filter) {
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
export const onCreateInventaire = /* GraphQL */ `
  subscription OnCreateInventaire(
    $filter: ModelSubscriptionInventaireFilterInput
  ) {
    onCreateInventaire(filter: $filter) {
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
export const onDeleteAllee = /* GraphQL */ `
  subscription OnDeleteAllee($filter: ModelSubscriptionAlleeFilterInput) {
    onDeleteAllee(filter: $filter) {
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
export const onDeleteDepot = /* GraphQL */ `
  subscription OnDeleteDepot($filter: ModelSubscriptionDepotFilterInput) {
    onDeleteDepot(filter: $filter) {
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
export const onDeleteInventaire = /* GraphQL */ `
  subscription OnDeleteInventaire(
    $filter: ModelSubscriptionInventaireFilterInput
  ) {
    onDeleteInventaire(filter: $filter) {
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
export const onUpdateAllee = /* GraphQL */ `
  subscription OnUpdateAllee($filter: ModelSubscriptionAlleeFilterInput) {
    onUpdateAllee(filter: $filter) {
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
export const onUpdateDepot = /* GraphQL */ `
  subscription OnUpdateDepot($filter: ModelSubscriptionDepotFilterInput) {
    onUpdateDepot(filter: $filter) {
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
export const onUpdateInventaire = /* GraphQL */ `
  subscription OnUpdateInventaire(
    $filter: ModelSubscriptionInventaireFilterInput
  ) {
    onUpdateInventaire(filter: $filter) {
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
