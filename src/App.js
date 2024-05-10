import React, { useState, useEffect } from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {
  Button,
  Link,
  Flex,
  Heading,
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import Notes from './Notes';
import Note from './Note';

import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
  Routes,
  Route,
} from 'react-router-dom';

function Home() {
  return <Heading level={2}>Home</Heading>;
}

// function About() {
//   return <Heading level={2}>Notes</Heading>;
// }

function Users() {
  return <Heading level={2}>Users</Heading>;
}

const App = () => {
  const { user, route, signOut } = useAuthenticator((context) => [
    context.user,
  ]);
  console.log('user: ', user);
  console.log('route: ', route);
  return (
    <Router>
      <Flex>
        <ReactRouterLink to="/" component={Link}>
          Home
        </ReactRouterLink>
        <ReactRouterLink to="/notes" component={Link}>
          Notes
        </ReactRouterLink>
        <ReactRouterLink to="/users" component={Link}>
          Users
        </ReactRouterLink>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/note/:noteId" element={<Note />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default withAuthenticator(App);
