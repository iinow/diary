import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient, ApolloCache } from '@apollo/client'

const client = new ApolloClient({
  cache: (new InMemoryCache() as unknown) as ApolloCache<any>,
  uri: 'http://localhost:7711/graphql',
})

export default client
