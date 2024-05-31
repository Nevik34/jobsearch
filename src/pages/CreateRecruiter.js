import React, { useState } from 'react';
import {
  Autocomplete,
  Button,
  Flex,
  Heading,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';

import { createRecruiter as createRecruiterMutation } from '../graphql/mutations';

export default function CreateRecruiter() {
  const navigate = useNavigate();
  const client = generateClient();
  const [recruiter, setRecruiter] = useState({});

  const handleChange = (event) => {
    const { target } = event;
    setRecruiter((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  async function createRecruiter(event) {
    try {
      event.preventDefault();
      const form = new FormData(event.target);
      const data = {
        first: form.get('first'),
        last: form.get('last'),
        company: form.get('company'),
        email: form.get('email'),
      };

      await client.graphql({
        query: createRecruiterMutation,
        variables: { input: data },
      });
      event.target.reset();
      navigate('/recruiters');
    } catch (e) {
      console.log('Error creating recruiter: ', e);
    }
  }

  return (
    <View className="Recruiter">
      <Heading level={1}>Create Recruiter</Heading>
      <View
        as="form"
        margin="3rem 0"
        style={{ textAlign: 'left', display: 'flex', justifyContent: 'center' }}
        onSubmit={createRecruiter}
      >
        <Flex direction="column" justifyContent="center" width={'50%'}>
          <TextField
            name="first"
            value={recruiter.first}
            label="First Name"
            required
            onChange={handleChange}
          />
          <TextField
            name="last"
            value={recruiter.last}
            label="Last Name"
            required
            onChange={handleChange}
          />
          <TextField
            name="company"
            value={recruiter.company}
            label="Company"
            required
            onChange={handleChange}
          />
          <TextField
            name="email"
            type="email"
            required
            value={recruiter.email}
            label="Email"
            onChange={handleChange}
          />
          <TextField
            name="notes"
            value={recruiter.notes}
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
