import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Button,
  Flex,
  Heading,
  SelectField,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';

import { createListing as createListingMutation } from '../graphql/mutations';
import { listRecruiters as listRecruitersQuery } from '../graphql/queries';
import { LISTING_STATUS, SOURCES } from './Constants';

export default function CreateListing() {
  const navigate = useNavigate();
  const client = generateClient();
  const [listing, setListing] = useState({});
  const [recruiters, setRecruiters] = useState([]);
  const [autoSelection, setAutoSelection] = useState({});

  const handleChange = (event) => {
    const { target } = event;
    setListing((prevState) => ({
      ...prevState,
      [target.name]: target.value.id || target.value,
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
        recruiterId: autoSelection?.id || null,
      };

      // console.log('form data: ', data);

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

  async function fetchRecruiters() {
    try {
      const apiData = await client.graphql({
        query: listRecruitersQuery,
      });
      const recruitersFromApi = apiData.data.listRecruiters.items;
      const mapped = recruitersFromApi.map((recruiter) => {
        return {
          id: recruiter.id,
          label:
            recruiter.first + ' ' + recruiter.last + ' - ' + recruiter.company,
        };
      });
      setRecruiters(mapped);
    } catch (e) {
      console.log('Error listing updates: ', e);
    }
  }

  function recruiterSelected(e) {
    setAutoSelection(e || {});
  }

  useEffect(() => {
    fetchRecruiters();
  }, []);

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
          <Autocomplete
            name="recruiter"
            placeholder="Active Recruiters..."
            options={recruiters}
            onSelect={recruiterSelected}
            onChange={recruiterSelected}
            onClear={recruiterSelected}
          />
          <Button type="submit" variation="primary">
            Save
          </Button>
        </Flex>
      </View>
    </View>
  );
}
