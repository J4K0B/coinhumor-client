//eslint-disable-next-line
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Routes from './routes';

import url from './url';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: `${url}/graphql`,
  connectToDevTools: true,
  cache,
  defaults: {
    loginStatus: {
      __typename: 'LoginStatus',
      isLoggedIn: false,
    }
  },
  resolvers: {
    Mutation: {
      updateLoginStatus: (_, { isLoggedIn }, { cache }) => {
        const data = {
          loginStatus: {
            __typename: 'LoginStatus',
            isLoggedIn
          }
        };
        cache.writeData({ data });
        return null;
      }

    }
  }
});

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes /> 
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
