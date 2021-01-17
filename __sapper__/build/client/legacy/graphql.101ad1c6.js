import"./_rollup-plugin-inject-process-env.95689655.js";import{a5 as t}from"./client.72c9e126.js";import{s as e,c as r,N as a}from"./ApolloClientStore.f682a05b.js";var n;!function(t){t.Kakao="KAKAO",t.Github="GITHUB"}(n||(n={}));e`
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
`,o=e`
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
`,d=e=>{const n=r().watchQuery(Object.assign({query:i},e));return t({data:null,loading:!0,error:null,networkStatus:1,query:null},(t=>{n.result().then((e=>t(Object.assign(Object.assign({},e),{query:n})))).catch((e=>t({error:e,query:n,data:null,loading:!1,networkStatus:a.error})))}))},s=t=>r().mutate(Object.assign({mutation:o},t)),l=e=>{const n=r().watchQuery(Object.assign({query:u},e));return t({data:null,loading:!0,error:null,networkStatus:1,query:null},(t=>{n.result().then((e=>t(Object.assign(Object.assign({},e),{query:n})))).catch((e=>t({error:e,query:n,data:null,loading:!1,networkStatus:a.error})))}))};export{l as G,s as I,d as a};
