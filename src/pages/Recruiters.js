import React, { useState, useEffect } from 'react';
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
import { listRecruiters } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { Link } from 'react-router-dom';

export default function Recruiters() {
  const [recruiters, setRecruiters] = useState([]);
  const client = generateClient({ authMode: 'apiKey' });

  async function fetchRecruiters() {
    try {
      const apiData = await client.graphql({ query: listRecruiters });
      const recruitersFromApi = apiData.data.listRecruiters.items.sort(
        (a, b) => a.updatedAt < b.updatedAt
      );
      console.log('recruiters: ', recruitersFromApi);
      await Promise.all(
        recruitersFromApi.map(async (listing) => {
          return listing;
        })
      );
      setRecruiters(recruitersFromApi);
    } catch (e) {
      console.log('Error listing listings: ', e);
    }
  }

  //   type Recruiter @model {
  //     id: ID!
  //     first: String!
  //     last: String!
  //     email: String!
  //     company: String
  //     listings: [Listing] @hasMany
  //   }

  useEffect(() => {
    fetchRecruiters();
  }, []);

  return (
    <View className="Recruiters">
      <Link to={'/recruiter/create'}>
        <Button>Add Recruiter</Button>
      </Link>
      <View margin="3rem 0" display={'flex'} direction="column">
        <Table variation="striped">
          <TableHead>
            <TableRow>
              <TableCell as="th">Name</TableCell>
              <TableCell as="th">Company</TableCell>
              <TableCell as="th">Email</TableCell>
              <TableCell as="th">Last Update</TableCell>
              <TableCell as="th"></TableCell> {/*Edit*/}
              {/* <TableCell as="th"></TableCell> Delete */}
            </TableRow>
          </TableHead>
          <TableBody>
            {recruiters.map((recruiter) => (
              <TableRow>
                <TableCell>{recruiter.first + ' ' + recruiter.last}</TableCell>
                <TableCell>{recruiter.company}</TableCell>
                <TableCell>
                  <ExternalLink isExternal href={'mailto: ' + recruiter.email}>
                    {recruiter.email}
                  </ExternalLink>
                </TableCell>
                <TableCell>
                  {new Date(recruiter.updatedAt).toDateString()}
                </TableCell>
                <TableCell width={'100px'}>
                  <Link to={`/recruiter/${recruiter.id}`}>Edit</Link>
                </TableCell>
                {/* no good reason to delete listings */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </View>
    </View>
  );
}
