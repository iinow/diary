import client from '@/store/ApolloClientStore'
import { ApolloError, NetworkStatus } from '@apollo/client'
import type {
  ApolloQueryResult,
  ObservableQuery,
  QueryOptions,
  MutationOptions,
} from '@apollo/client'
import { readable } from 'svelte/store'
import type { Readable } from 'svelte/store'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type Query = {
  __typename?: 'Query'
  messages: Array<Message>
  diaries?: Maybe<PaginatedDiaryResponse>
  diary?: Maybe<Diary>
  me: UserMeOut
}

export type QueryDiariesArgs = {
  page: PaginationInput
}

export type QueryDiaryArgs = {
  yyyyMMddHHmm?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Float']>
}

/** 메시지 타입 정의 */
export type Message = {
  __typename?: 'Message'
  id: Scalars['Int']
  text: Scalars['String']
  updatedAt: Scalars['DateTime']
  createAt: Scalars['DateTime']
}

export type PaginatedDiaryResponse = {
  __typename?: 'PaginatedDiaryResponse'
  items: Array<Diary>
  total: Scalars['Int']
  page: Scalars['Int']
  pageItemCount: Scalars['Int']
  hasMore: Scalars['Boolean']
}

/** 일기 */
export type Diary = {
  __typename?: 'Diary'
  id: Scalars['Int']
  /** 일기 제목 */
  title: Scalars['String']
  /** 일기 내용 */
  content: Scalars['String']
  /** 업데이트 날짜 */
  updatedAt: Scalars['DateTime']
  /** 등록 날짜 */
  createdAt: Scalars['DateTime']
}

export type PaginationInput = {
  /** page >= 1 */
  page: Scalars['Int']
  /** 페이지 당 아이템 개수 */
  pageItemCount: Scalars['Int']
}

export type UserMeOut = {
  __typename?: 'UserMeOut'
  /** 사용자 uuid */
  uuid: Scalars['String']
  /** 이름 */
  name: Scalars['String']
  /** 프로필 이미지 경로 */
  profileImageUrl: Scalars['String']
  /** Social login provider */
  provider: Provider
  /** 생성 날짜 */
  createdAt: Scalars['DateTime']
}

/** OAuth Provider */
export enum Provider {
  Kakao = 'KAKAO',
  Github = 'GITHUB',
}

export type Mutation = {
  __typename?: 'Mutation'
  publishMessage: Scalars['Float']
  insertAndUpdateDiary: InsertAndUpdateDiaryOut
}

export type MutationPublishMessageArgs = {
  message: Scalars['String']
  topic: Scalars['String']
}

export type MutationInsertAndUpdateDiaryArgs = {
  diary: DiaryInput
}

export type InsertAndUpdateDiaryOut = {
  __typename?: 'InsertAndUpdateDiaryOut'
  /** 일기 ID 값 */
  id: Scalars['Float']
  /** 수정 날짜 */
  updatedAt: Scalars['DateTime']
}

export type DiaryInput = {
  id?: Maybe<Scalars['Float']>
  title: Scalars['String']
  content: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  subscriptionMessage: MessageOut
}

export type SubscriptionSubscriptionMessageArgs = {
  topic: Scalars['String']
}

export type MessageOut = {
  __typename?: 'MessageOut'
  /** 메시지 내용물 */
  text: Scalars['String']
  /** 생성 날짜 */
  createdAt: Scalars['DateTime']
  /** 수정 날짜 */
  updatedAt: Scalars['DateTime']
}

export type GetDiaryQueryVariables = Exact<{
  id?: Maybe<Scalars['Float']>
}>

export type GetDiaryQuery = { __typename?: 'Query' } & {
  diary?: Maybe<{ __typename?: 'Diary' } & Pick<Diary, 'updatedAt'>>
}

export type GetDiaryByDateQueryVariables = Exact<{
  yyyyMMddHHmm?: Maybe<Scalars['String']>
}>

export type GetDiaryByDateQuery = { __typename?: 'Query' } & {
  diary?: Maybe<
    { __typename?: 'Diary' } & Pick<
      Diary,
      'id' | 'title' | 'content' | 'updatedAt' | 'createdAt'
    >
  >
}

export type InsertAndUpdateDiaryMutationVariables = Exact<{
  id?: Maybe<Scalars['Float']>
  title: Scalars['String']
  content: Scalars['String']
}>

export type InsertAndUpdateDiaryMutation = { __typename?: 'Mutation' } & {
  insertAndUpdateDiary: { __typename?: 'InsertAndUpdateDiaryOut' } & Pick<
    InsertAndUpdateDiaryOut,
    'id' | 'updatedAt'
  >
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'UserMeOut' } & Pick<
    UserMeOut,
    'name' | 'provider' | 'profileImageUrl' | 'createdAt'
  >
}

export const GetDiaryDoc = gql`
  query GetDiary($id: Float) {
    diary(id: $id) {
      updatedAt
    }
  }
`
export const GetDiaryByDateDoc = gql`
  query GetDiaryByDate($yyyyMMddHHmm: String) {
    diary(yyyyMMddHHmm: $yyyyMMddHHmm) {
      id
      title
      content
      updatedAt
      createdAt
    }
  }
`
export const InsertAndUpdateDiaryDoc = gql`
  mutation InsertAndUpdateDiary(
    $id: Float
    $title: String!
    $content: String!
  ) {
    insertAndUpdateDiary(diary: { id: $id, title: $title, content: $content }) {
      id
      updatedAt
    }
  }
`
export const GetMeDoc = gql`
  query GetMe {
    me {
      name
      provider
      profileImageUrl
      createdAt
    }
  }
`
export const GetDiary = (
  options: Omit<QueryOptions<GetDiaryQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<GetDiaryQuery> & {
    query: ObservableQuery<GetDiaryQuery, GetDiaryQueryVariables>
  }
> => {
  const q = client().watchQuery({
    query: GetDiaryDoc,
    ...options,
  })
  var result = readable<
    ApolloQueryResult<GetDiaryQuery> & {
      query: ObservableQuery<GetDiaryQuery, GetDiaryQueryVariables>
    }
  >(
    { data: null, loading: true, error: null, networkStatus: 1, query: null },
    (set) => {
      q.result()
        .then((v) => set({ ...v, query: q }))
        .catch((e: ApolloError) =>
          set({
            error: e,
            query: q,
            data: null,
            loading: false,
            networkStatus: NetworkStatus.error,
          })
        )
    }
  )
  return result
}

export const GetDiaryByDate = (
  options: Omit<QueryOptions<GetDiaryByDateQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<GetDiaryByDateQuery> & {
    query: ObservableQuery<GetDiaryByDateQuery, GetDiaryByDateQueryVariables>
  }
> => {
  const q = client().watchQuery({
    query: GetDiaryByDateDoc,
    ...options,
  })
  var result = readable<
    ApolloQueryResult<GetDiaryByDateQuery> & {
      query: ObservableQuery<GetDiaryByDateQuery, GetDiaryByDateQueryVariables>
    }
  >(
    { data: null, loading: true, error: null, networkStatus: 1, query: null },
    (set) => {
      q.result()
        .then((v) => set({ ...v, query: q }))
        .catch((e: ApolloError) =>
          set({
            error: e,
            query: q,
            data: null,
            loading: false,
            networkStatus: NetworkStatus.error,
          })
        )
    }
  )
  return result
}

export const InsertAndUpdateDiary = (
  options: Omit<
    MutationOptions<any, InsertAndUpdateDiaryMutationVariables>,
    'mutation'
  >
) => {
  const m = client().mutate<
    InsertAndUpdateDiaryMutation,
    InsertAndUpdateDiaryMutationVariables
  >({
    mutation: InsertAndUpdateDiaryDoc,
    ...options,
  })
  return m
}
export const GetMe = (
  options: Omit<QueryOptions<GetMeQueryVariables>, 'query'>
): Readable<
  ApolloQueryResult<GetMeQuery> & {
    query: ObservableQuery<GetMeQuery, GetMeQueryVariables>
  }
> => {
  const q = client().watchQuery({
    query: GetMeDoc,
    ...options,
  })
  var result = readable<
    ApolloQueryResult<GetMeQuery> & {
      query: ObservableQuery<GetMeQuery, GetMeQueryVariables>
    }
  >(
    { data: null, loading: true, error: null, networkStatus: 1, query: null },
    (set) => {
      q.result()
        .then((v) => set({ ...v, query: q }))
        .catch((e: ApolloError) =>
          set({
            error: e,
            query: q,
            data: null,
            loading: false,
            networkStatus: NetworkStatus.error,
          })
        )
    }
  )
  return result
}
