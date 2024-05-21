import React, { useState, useEffect } from 'react';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import {
  Button,
  Flex,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Heading,
  Image,
  Text,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { listNotes } from '../graphql/queries';
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from '../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { Link } from 'react-router-dom';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const client = generateClient({ authMode: 'apiKey' });

  async function fetchNotes() {
    try {
      const apiData = await client.graphql({ query: listNotes });
      const notesFromAPI = apiData.data.listNotes.items.sort(
        (a, b) => a.updatedAt < b.updatedAt
      );
      console.log('notes: ', notesFromAPI);
      await Promise.all(
        notesFromAPI.map(async (note) => {
          if (note.image) {
            const url = await getUrl({ key: note.name });
            note.image = url.url;
          }
          return note;
        })
      );
      setNotes(notesFromAPI);
    } catch (e) {
      console.log('Error listing notes: ', e);
    }
  }

  async function createNote(event) {
    try {
      event.preventDefault();
      const form = new FormData(event.target);
      const image = form.get('image');
      const data = {
        name: form.get('name'),
        description: form.get('description'),
        image: image.name,
      };
      if (!!data.image)
        await uploadData({
          key: data.name,
          data: image,
        });
      await client.graphql({
        query: createNoteMutation,
        variables: { input: data },
      });
      fetchNotes();
      event.target.reset();
    } catch (e) {
      console.log('Error creating note: ', e);
    }
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await remove({ key: name });
    await client.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View className="Notes">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: 'end' }}
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0" display={'flex'} direction="column">
        <Table variation="striped">
          <TableHead>
            <TableRow>
              <TableCell as="th">Name</TableCell>
              <TableCell as="th">Description</TableCell>
              <TableCell as="th">Image</TableCell>
              <TableCell as="th"></TableCell>
              <TableCell as="th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => (
              <TableRow>
                <TableCell>{note.name}</TableCell>
                <TableCell>{note.description}</TableCell>
                {note.image ? (
                  <Image
                    src={note.image}
                    alt={`visual aid for ${note.name}`}
                    style={{ width: 400 }}
                  />
                ) : (
                  <TableCell></TableCell>
                )}
                <TableCell width={'100px'}>
                  <Link to={`/note/${note.id}`}>Edit</Link>
                </TableCell>
                <TableCell width={'100px'}>
                  <Button variation="link" onClick={() => deleteNote(note)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          gap="1rem"
          width={'80%'}
          border={'1px solid red'}
        >
          <Text>Name</Text>
          <Text>Description</Text>
          <Text>Image</Text>
        </Flex>
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            alignContent="flex-start"
            wrap="nowrap"
            gap="1rem"
          >
            <Text as="strong" fontWeight={700} basis={1}>
              {note.name}
            </Text>
            <Text as="span" basis={2}>
              {note.description}
            </Text>
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${note.name}`}
                style={{ width: 400 }}
              />
            )}
            <Link to={`/note/${note.id}`}>Edit</Link>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete
            </Button>
          </Flex>
        ))} */}
      </View>
      {/* <Button onClick={signOut}>Sign Out</Button> */}
    </View>
  );
}
