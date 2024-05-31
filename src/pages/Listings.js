import React, { useState, useEffect } from 'react';
import { SOURCES } from './Constants';
import {
  Button,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Heading,
  Link as ExternalLink,
  View,
} from '@aws-amplify/ui-react';
import { listListings } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { Link } from 'react-router-dom';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const client = generateClient({ authMode: 'apiKey' });

  async function fetchListings() {
    try {
      const apiData = await client.graphql({ query: listListings });
      const listingsFromApi = apiData.data.listListings.items.sort(
        (a, b) => a.updatedAt < b.updatedAt
      );
      console.log('listings: ', listingsFromApi);
      await Promise.all(
        listingsFromApi.map(async (listing) => {
          return listing;
        })
      );
      setListings(listingsFromApi);
    } catch (e) {
      console.log('Error listing listings: ', e);
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <View className="Listings">
      <Heading level={2}>Current listings</Heading>
      <Link to={'/listing/create'}>
        <Button>Create Listing</Button>
      </Link>
      {listings.length > 0 && (
        <View margin="3rem 0" display={'flex'} direction="column">
          <Table variation="striped">
            <TableHead>
              <TableRow>
                <TableCell as="th">Company</TableCell>
                <TableCell as="th">Title</TableCell>
                <TableCell as="th">Source</TableCell>
                <TableCell as="th">Last Update</TableCell>
                <TableCell as="th"></TableCell> {/*Edit*/}
                {/* <TableCell as="th"></TableCell> Delete */}
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.map((listing) => (
                <TableRow>
                  <TableCell>{listing.company}</TableCell>
                  <TableCell>
                    {listing.link ? (
                      <ExternalLink isExternal href={listing.link}>
                        {listing.title}
                      </ExternalLink>
                    ) : (
                      listing.title
                    )}
                  </TableCell>
                  <TableCell>{SOURCES[listing.source]}</TableCell>
                  <TableCell>
                    {new Date(listing.updatedAt).toDateString()}
                  </TableCell>
                  <TableCell width={'100px'}>
                    <Link to={`/listing/${listing.id}`}>Edit</Link>
                  </TableCell>
                  {/* no good reason to delete listings */}
                  {/* <TableCell width={'100px'}>
                  <Button
                    variation="link"
                    onClick={() => deleteListing(listing)}
                  >
                    Delete
                  </Button>
                </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </View>
      )}
    </View>
  );
}
