// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store'
import { ApolloCache, ApolloClient } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

const createApolloClient = () => {
  let client: ApolloClient<any>
  const { set } = writable<ApolloClient<any>>(null)
  const get = (): Observable<ApolloClient<any>> => {
    return of(client).pipe(
      map((c) => {
        if (c) {
          return c
        }
        client = new ApolloClient({
          cache: (new InMemoryCache() as unknown) as ApolloCache<any>,
          uri: 'http://localhost:7711/graphql',
        })
        return client
      })
    )
  }

  return {
    set,
    get,
  }
}

export const client = createApolloClient()
