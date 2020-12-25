// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store'
import { ApolloCache, ApolloClient, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { goto } from '@sapper/app'
import { getMainDefinition } from '@apollo/client/utilities'
import { showNotification } from '@/service/Notification'

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

    const baseLink: ApolloLink = (split(
      ({ query }) => {
        // @ts-ignore
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    ) as unknown) as ApolloLink

    const errorLink = onError(({ graphQLErrors, forward, operation }) => {
      if (graphQLErrors.length !== 0) {
        const { code } = graphQLErrors[0].extensions
        switch (code) {
          case '4010':
            goto('/login')
            showNotification('로그인해주세요.')
            return
          default:
            return
        }
      }
      forward(operation)
    })

    const link = ApolloLink.from([errorLink, baseLink])

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

export default () => client.get()
