import React, { useState, useEffect } from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {
  Button,
  Link,
  Flex,
  Heading,
  useAuthenticator,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import Notes from './pages/Notes';
import Note from './pages/Note';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Navbar from './components/navbar';

import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
  Routes,
  Route,
} from 'react-router-dom';

function Home() {
  return <Heading level={2}>Home</Heading>;
}

const App = () => {
  const { user, route, signOut } = useAuthenticator((context) => [
    context.user,
  ]);
  console.log('user: ', user);
  console.log('route: ', route);
  return (
    <View className="App">
      <Navbar signOut={signOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/note/:noteId" element={<Note />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing/create" element={<CreateListing />} />
        <Route path="/listing/:listingId" element={<EditListing />} />
      </Routes>
    </View>
  );
};

export default withAuthenticator(App);
