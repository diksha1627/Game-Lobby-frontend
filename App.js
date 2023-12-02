// MultiplayerGameApp/src/App.js
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import AppNavigator from './src/navigation/AppNavigator';
import apolloClient from './src/apollo/apolloClient';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.0.104:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider 
    // client={apolloClient} 
    client={client}
    >
      <AppNavigator />
    </ApolloProvider>
  );
};

export default App;
