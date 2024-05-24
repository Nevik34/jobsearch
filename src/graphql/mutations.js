/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
export const createUpdate = /* GraphQL */ `
  mutation CreateUpdate(
    $input: CreateUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    createUpdate(input: $input, condition: $condition) {
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
export const updateUpdate = /* GraphQL */ `
  mutation UpdateUpdate(
    $input: UpdateUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    updateUpdate(input: $input, condition: $condition) {
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
export const deleteUpdate = /* GraphQL */ `
  mutation DeleteUpdate(
    $input: DeleteUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    deleteUpdate(input: $input, condition: $condition) {
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
export const createListing = /* GraphQL */ `
  mutation CreateListing(
    $input: CreateListingInput!
    $condition: ModelListingConditionInput
  ) {
    createListing(input: $input, condition: $condition) {
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
export const updateListing = /* GraphQL */ `
  mutation UpdateListing(
    $input: UpdateListingInput!
    $condition: ModelListingConditionInput
  ) {
    updateListing(input: $input, condition: $condition) {
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
export const deleteListing = /* GraphQL */ `
  mutation DeleteListing(
    $input: DeleteListingInput!
    $condition: ModelListingConditionInput
  ) {
    deleteListing(input: $input, condition: $condition) {
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
export const createRecruiter = /* GraphQL */ `
  mutation CreateRecruiter(
    $input: CreateRecruiterInput!
    $condition: ModelRecruiterConditionInput
  ) {
    createRecruiter(input: $input, condition: $condition) {
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
export const updateRecruiter = /* GraphQL */ `
  mutation UpdateRecruiter(
    $input: UpdateRecruiterInput!
    $condition: ModelRecruiterConditionInput
  ) {
    updateRecruiter(input: $input, condition: $condition) {
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
export const deleteRecruiter = /* GraphQL */ `
  mutation DeleteRecruiter(
    $input: DeleteRecruiterInput!
    $condition: ModelRecruiterConditionInput
  ) {
    deleteRecruiter(input: $input, condition: $condition) {
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
