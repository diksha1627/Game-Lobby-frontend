// MultiplayerGameApp/src/apollo/apolloClient.js
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
    uri: 'http://192.168.0.104:4000/', // Correct GraphQL endpoint
  });
  
  const wsLink = new WebSocketLink({
    uri: 'ws://192.168.0.104:4000/graphql', // Correct WebSocket endpoint
    options: {
      reconnect: true,
    },
  });

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
});

export default apolloClient;
