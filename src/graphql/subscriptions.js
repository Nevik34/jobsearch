/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
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
export const onCreateUpdate = /* GraphQL */ `
  subscription OnCreateUpdate($filter: ModelSubscriptionUpdateFilterInput) {
    onCreateUpdate(filter: $filter) {
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
export const onUpdateUpdate = /* GraphQL */ `
  subscription OnUpdateUpdate($filter: ModelSubscriptionUpdateFilterInput) {
    onUpdateUpdate(filter: $filter) {
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
export const onDeleteUpdate = /* GraphQL */ `
  subscription OnDeleteUpdate($filter: ModelSubscriptionUpdateFilterInput) {
    onDeleteUpdate(filter: $filter) {
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
export const onCreateListing = /* GraphQL */ `
  subscription OnCreateListing($filter: ModelSubscriptionListingFilterInput) {
    onCreateListing(filter: $filter) {
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
export const onUpdateListing = /* GraphQL */ `
  subscription OnUpdateListing($filter: ModelSubscriptionListingFilterInput) {
    onUpdateListing(filter: $filter) {
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
export const onDeleteListing = /* GraphQL */ `
  subscription OnDeleteListing($filter: ModelSubscriptionListingFilterInput) {
    onDeleteListing(filter: $filter) {
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
export const onCreateRecruiter = /* GraphQL */ `
  subscription OnCreateRecruiter(
    $filter: ModelSubscriptionRecruiterFilterInput
  ) {
    onCreateRecruiter(filter: $filter) {
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
export const onUpdateRecruiter = /* GraphQL */ `
  subscription OnUpdateRecruiter(
    $filter: ModelSubscriptionRecruiterFilterInput
  ) {
    onUpdateRecruiter(filter: $filter) {
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
export const onDeleteRecruiter = /* GraphQL */ `
  subscription OnDeleteRecruiter(
    $filter: ModelSubscriptionRecruiterFilterInput
  ) {
    onDeleteRecruiter(filter: $filter) {
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
