import { client as apolloClient } from '@/store/ApolloClientStore'
import { gql } from '@apollo/client'
import { of } from 'rxjs'
import { flatMap } from 'rxjs/internal/operators'

const queryDiary = (id: number) => gql`
  query {
    diary(id: ${id}) {
      id
      content
      userUid
      updatedAt
      createAt
    }
  }
`

const mutationMessage = (topic: string, message: string) => gql`
  mutation {
    publishMessage(topic: "${topic}", message: "${message}")
  }
`

export function getDiary(id: number) {
  return of(apolloClient.get()).pipe(
    flatMap((client) => client.query({ query: queryDiary(id) }))
  )
}

export function publishMessage(topic: string, message: string) {
  return of(apolloClient.get()).pipe(
    flatMap((client) =>
      client.mutate({ mutation: mutationMessage(topic, message) })
    )
  )
}
