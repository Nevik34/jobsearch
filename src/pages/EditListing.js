import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
  SelectField,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';

import { createListing as createListingMutation } from '../graphql/mutations';
import { createUpdate as createUpdateMutation } from '../graphql/mutations';
import { getListing as getListingQuery } from '../graphql/queries';
import { listUpdates as listUpdatesQuery } from '../graphql/queries';
import { LISTING_STATUS, SOURCES } from './Constants';

export default function EditListing(props) {
  const navigate = useNavigate();
  const params = useParams();
  const client = generateClient();

  const [listing, setListing] = useState({});
  const [updates, setUpdates] = useState([]);

  async function fetchListing() {
    try {
      const apiData = await client.graphql({
        query: getListingQuery,
        variables: { id: params.listingId },
      });
      const listingFromApi = apiData.data.getListing;

      setListing(listingFromApi);
    } catch (e) {
      console.log('Error listing listings: ', e);
    }
  }

  async function fetchUpdates() {
    try {
      const apiData = await client.graphql({
        query: listUpdatesQuery,
        variables: { filter: { listingId: { eq: params.listingId } } },
      });
      const updatesFromApi = apiData.data.listUpdates.items;
      let ordered = updatesFromApi.sort((a, b) => a.createdAt < b.createdAt);

      setUpdates(ordered);
    } catch (e) {
      console.log('Error listing updates: ', e);
    }
  }

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
        status: form.get('status'),
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

  async function createUpdate(event) {
    try {
      event.preventDefault();
      const form = new FormData(event.target);
      const data = {
        listingId: params.listingId,
        notes: form.get('notes'),
      };

      await client.graphql({
        query: createUpdateMutation,
        variables: { input: data },
      });
      event.target.reset();
      fetchUpdates();
    } catch (e) {
      console.log('Error creating listing: ', e);
    }
  }

  useEffect(() => {
    fetchListing();
    fetchUpdates();
  }, []);

  return (
    <View className="Listing">
      <Heading level={1}>Edit Listing</Heading>
      <View
        as="form"
        margin="3rem 0"
        style={{ textAlign: 'left', display: 'flex', justifyContent: 'center' }}
        onSubmit={createListing}
      >
        <Flex direction="column" justifyContent="center" width={'50%'}>
          <SelectField
            name="status"
            value={listing.status}
            label="Source"
            placeholder="Listing Activity Status"
            required
            onSelect={handleChange}
          >
            {Object.entries(LISTING_STATUS).map((source) => {
              return (
                <option key={source[0]} value={source[0]}>
                  {source[1]}
                </option>
              );
            })}
          </SelectField>
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
            value={listing.source}
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
      <View as="form" margin="3rem 0" onSubmit={createUpdate}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="notes"
            placeholder="What's new?"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Add Update
          </Button>
        </Flex>
      </View>
      {updates && updates.length > 0 && (
        <View>
          <Heading level={2}>Updates</Heading>
          <Table variation="striped" title="Updates">
            <TableHead>
              <TableRow>
                <TableCell as="th">Notes</TableCell>
                <TableCell as="th">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updates &&
                updates.map((update) => (
                  <TableRow>
                    <TableCell>{update.notes}</TableCell>
                    <TableCell>
                      {new Date(listing.createdAt).toDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </View>
      )}
    </View>
  );
}
