import{V as t}from"./client.72d4fbc6.js";import{s as e,c as r,N as a}from"./ApolloClientStore.02926234.js";var n;!function(t){t.Kakao="KAKAO",t.Github="GITHUB"}(n||(n={}));e`
  query GetDiary($id: Float) {
    diary(id: $id) {
      updatedAt
    }
  }
`;const i=e`
  query GetDiaryByDate($yyyyMMddHHmm: String) {
    diary(yyyyMMddHHmm: $yyyyMMddHHmm) {
      id
      title
      content
      updatedAt
      createdAt
    }
  }
`,d=e`
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
`,u=e`
  query GetMe {
    me {
      name
      provider
      createdAt
    }
  }
`,o=e=>{const n=r().watchQuery(Object.assign({query:i},e));return t({data:null,loading:!0,error:null,networkStatus:1,query:null},(t=>{n.result().then((e=>t(Object.assign(Object.assign({},e),{query:n})))).catch((e=>t({error:e,query:n,data:null,loading:!1,networkStatus:a.error})))}))},s=t=>r().mutate(Object.assign({mutation:d},t)),y=e=>{const n=r().watchQuery(Object.assign({query:u},e));return t({data:null,loading:!0,error:null,networkStatus:1,query:null},(t=>{n.result().then((e=>t(Object.assign(Object.assign({},e),{query:n})))).catch((e=>t({error:e,query:n,data:null,loading:!1,networkStatus:a.error})))}))};export{y as G,s as I,o as a};
