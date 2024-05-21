import React, { useState, useEffect } from 'react';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import {
  Button,
  Link,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote } from '../graphql/queries';
import {
  //   createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
  updateNote as updateNoteMutation,
} from '../graphql/mutations';
import { generateClient } from 'aws-amplify/api';

function Note(props) {
  const navigate = useNavigate();
  const params = useParams();
  const client = generateClient();

  async function fetchNote() {
    const apiData = await client.graphql({
      query: getNote,
      variables: { id: params.noteId },
    });
    setNote(apiData.data.getNote);
  }

  async function editNote(event) {
    try {
      event.preventDefault();
      const { __typename, createdAt, updatedAt, ...data } = note;
      console.log(data);
      await client.graphql({
        query: updateNoteMutation,
        variables: { input: data },
      });

      navigate('/notes');
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (event) => {
    const { target } = event;
    setNote((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleImage = async (event) => {
    console.log(event, event.target);
    const target = event.target;
    console.log('target ', target);
    console.log('files: ', target.files);
    console.log('length?: ', target.files.length);
    console.log('target file name: ', target.files[0].name);
    if (target.files.length > 0) {
      if (note.image != target.files[0].name) {
        console.log('uploading?');
        await uploadData({
          key: target.files[0].name,
          data: target.files[0],
        });
        setNote((prevState) => ({
          ...prevState,
          [target.name]: target.files[0].name,
        }));
        console.log(note);
      }
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const [note, setNote] = useState(null);
  return note ? (
    <View className="Note">
      <Heading level={1}>Edit Note</Heading>
      <View as="form" margin="3rem 0" onSubmit={editNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            value={note.name}
            label="Note Name"
            labelHidden
            variation="quiet"
            required
            onChange={handleChange}
          />
          <TextField
            name="description"
            value={note.description}
            label="Note Description"
            labelHidden
            variation="quiet"
            required
            onChange={handleChange}
          />
          {/* {note.image ? (
            <Image
              src={note.image}
              alt={`visual aid for ${note.name}`}
              style={{ width: 400 }}
            />
          ) : (
            <View
              name="image"
              as="input"
              type="file"
              value={note.image}
              style={{ alignSelf: 'end' }}
              onChange={handleImage}
            />
          )} */}
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: 'end' }}
            onChange={handleImage}
          />
          <Button type="submit" variation="primary">
            Save
          </Button>
        </Flex>
      </View>
    </View>
  ) : (
    <View>Loading?</View>
  );
}

export default Note;
