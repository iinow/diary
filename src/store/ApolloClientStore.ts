// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store'
import { ApolloCache, ApolloClient, ApolloLink } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from '@apollo/client/utilities'

const createApolloClient = () => {
  let client: ApolloClient<any> | undefined
  const { set } = writable<ApolloClient<any>>(null)
  const get = (): ApolloClient<any> => {
    if (client) {
      return client
    }

    const wsLink = new WebSocketLink({
      uri: 'APP_WS_URL',
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => {
          return { headers: {} }
        },
      },
    })

    const httpLink = new HttpLink({
      uri: 'APP_HTTP_URL',
      headers: {},
    })

    const link: ApolloLink = (split(
      ({ query }) => {
        // @ts-ignore
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    ) as unknown) as ApolloLink

    client = new ApolloClient({
      cache: (new InMemoryCache() as unknown) as ApolloCache<any>,
      link,
    })
    return client
  }

  return {
    set,
    get,
  }
}

export const client = createApolloClient()

export default client
