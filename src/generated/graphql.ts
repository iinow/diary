import Client from '@/store/ApolloClientStore'
import type {
  ApolloQueryResult,
  ObservableQuery,
  QueryOptions,
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
  diaries?: Maybe<Array<Diary>>
  diary?: Maybe<Diary>
  me: UserMeOut
}

export type QueryDiaryArgs = {
  yyyyMMdd?: Maybe<Scalars['String']>
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

/** 일기 */
export type Diary = {
  __typename?: 'Diary'
  id: Scalars['Int']
  content: Scalars['String']
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
}

export type UserMeOut = {
  __typename?: 'UserMeOut'
  /** 사용자 uuid */
  uuid: Scalars['String']
  /** 이름 */
  name: Scalars['String']
  /** Social login provider */
  provider: Provider
  /** 생성 날짜 */
  createdAt: Scalars['DateTime']
}

/** OAuth Provider */
export enum Provider {
  Kakao = 'KAKAO',
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
  content: Scalars['String']
  yyyyMMdd: Scalars['String']
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

export const GetDiaryDoc = gql`
  query GetDiary($id: Float) {
    diary(id: $id) {
      updatedAt
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
  const q = Client.get().watchQuery({
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
      q.subscribe((v) => {
        set({ ...v, query: q })
      })
    }
  )
  return result
}
