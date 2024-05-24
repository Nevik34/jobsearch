/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUpdate = /* GraphQL */ `
  query GetUpdate($id: ID!) {
    getUpdate(id: $id) {
      id
      listingId
      notes
      listing {
        id
        company
        title
        source
        link
        recruiterId
        status
        notes
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUpdates = /* GraphQL */ `
  query ListUpdates(
    $filter: ModelUpdateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUpdates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        listingId
        notes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getListing = /* GraphQL */ `
  query GetListing($id: ID!) {
    getListing(id: $id) {
      id
      company
      title
      source
      link
      recruiterId
      recruiter {
        id
        first
        last
        email
        company
        createdAt
        updatedAt
        __typename
      }
      status
      notes
      updates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listListings = /* GraphQL */ `
  query ListListings(
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        company
        title
        source
        link
        recruiterId
        status
        notes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRecruiter = /* GraphQL */ `
  query GetRecruiter($id: ID!) {
    getRecruiter(id: $id) {
      id
      referrals {
        nextToken
        __typename
      }
      first
      last
      email
      company
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRecruiters = /* GraphQL */ `
  query ListRecruiters(
    $filter: ModelRecruiterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecruiters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first
        last
        email
        company
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const updatesByListingId = /* GraphQL */ `
  query UpdatesByListingId(
    $listingId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUpdateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    updatesByListingId(
      listingId: $listingId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        listingId
        notes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listingsByRecruiterId = /* GraphQL */ `
  query ListingsByRecruiterId(
    $recruiterId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listingsByRecruiterId(
      recruiterId: $recruiterId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        company
        title
        source
        link
        recruiterId
        status
        notes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
