/*
import React from 'react';
import { Notes } from './features/notes/Notes';
import { Home } from './pages/index.js';

function App() {
  return (
    <Home />
  );
}

export default App;
*/


import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';  //needs some propper setup of Amplify.  question is : can I do this in a terraform file, or do I need to do this in the amplify cli
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}