import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  SelectField,
  Text,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';

import { createListing as createListingMutation } from '../graphql/mutations';
import { LISTING_STATUS, SOURCES } from './Constants';

export default function CreateListing() {
  const navigate = useNavigate();
  const params = useParams();
  const client = generateClient();
  const [listing, setListing] = useState({});

  const handleChange = (event) => {
    const { target } = event;
    setListing((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  async function createListing(event) {
    try {
      event.preventDefault();
      const form = new FormData(event.target);
      const data = {
        company: form.get('company'),
        title: form.get('title'),
        source: form.get('source'),
        link: form.get('link'),
        status: LISTING_STATUS.ACTIVE,
        notes: form.get('notes'),
      };

      await client.graphql({
        query: createListingMutation,
        variables: { input: data },
      });
      event.target.reset();
      navigate('/listings');
    } catch (e) {
      console.log('Error creating listing: ', e);
    }
  }

  console.log('SOURCES: ', SOURCES);
  useEffect(() => {}, []);

  return (
    <View className="Listing">
      <Heading level={1}>Create Listing</Heading>
      <View
        as="form"
        margin="3rem 0"
        style={{ textAlign: 'left' }}
        onSubmit={createListing}
      >
        <Flex direction="column" justifyContent="center">
          <TextField
            name="company"
            value={listing.company}
            label="Company Name"
            required
            onChange={handleChange}
          />
          <TextField
            name="title"
            value={listing.title}
            label="Job Title"
            required
            onChange={handleChange}
          />
          <SelectField
            name="source"
            label="Source"
            placeholder="Where did you hear about this role?"
            required
            onSelect={handleChange}
          >
            {Object.entries(SOURCES).map((source) => {
              return (
                <option key={source[0]} value={source[0]}>
                  {source[1]}
                </option>
              );
            })}
          </SelectField>
          <TextField
            name="link"
            value={listing.link}
            label="Link to Posting"
            onChange={handleChange}
          />
          <TextField
            name="notes"
            value={listing.notes}
            label="Notes"
            onChange={handleChange}
          />
          <Button type="submit" variation="primary">
            Save
          </Button>
        </Flex>
      </View>
    </View>
  );
}
