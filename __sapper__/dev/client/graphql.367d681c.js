import './_rollup-plugin-inject-process-env.d2a692b0.js';
import { $ as readable } from './client.c2574e4a.js';
import { s as src, c as client, N as NetworkStatus } from './ApolloClientStore.7d95f40c.js';

/** OAuth Provider */
var Provider;
(function (Provider) {
    Provider["Kakao"] = "KAKAO";
    Provider["Github"] = "GITHUB";
})(Provider || (Provider = {}));
const GetDiaryDoc = src `
  query GetDiary($id: Float) {
    diary(id: $id) {
      updatedAt
    }
  }
`;
const GetDiaryByDateDoc = src `
  query GetDiaryByDate($yyyyMMddHHmm: String) {
    diary(yyyyMMddHHmm: $yyyyMMddHHmm) {
      id
      title
      content
      updatedAt
      createdAt
    }
  }
`;
const InsertAndUpdateDiaryDoc = src `
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
`;
const GetMeDoc = src `
  query GetMe {
    me {
      name
      provider
      createdAt
    }
  }
`;
const GetDiaryByDate = (options) => {
    const q = client().watchQuery(Object.assign({ query: GetDiaryByDateDoc }, options));
    var result = readable({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
        q.result()
            .then((v) => set(Object.assign(Object.assign({}, v), { query: q })))
            .catch((e) => set({
            error: e,
            query: q,
            data: null,
            loading: false,
            networkStatus: NetworkStatus.error,
        }));
    });
    return result;
};
const InsertAndUpdateDiary = (options) => {
    const m = client().mutate(Object.assign({ mutation: InsertAndUpdateDiaryDoc }, options));
    return m;
};
const GetMe = (options) => {
    const q = client().watchQuery(Object.assign({ query: GetMeDoc }, options));
    var result = readable({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
        q.result()
            .then((v) => set(Object.assign(Object.assign({}, v), { query: q })))
            .catch((e) => set({
            error: e,
            query: q,
            data: null,
            loading: false,
            networkStatus: NetworkStatus.error,
        }));
    });
    return result;
};

export { GetMe as G, InsertAndUpdateDiary as I, GetDiaryByDate as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC4zNjdkNjgxYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dlbmVyYXRlZC9ncmFwaHFsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbImdxbCJdLCJtYXBwaW5ncyI6Ijs7OztBQWtHQTtBQUNBLElBQVksUUFHWDtBQUhELFdBQVksUUFBUTtJQUNsQiwyQkFBZSxDQUFBO0lBQ2YsNkJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUhXLFFBQVEsS0FBUixRQUFRLFFBR25CO0FBNkZNLE1BQU0sV0FBVyxHQUFHQSxHQUFHLENBQUE7Ozs7OztDQU03QixDQUFBO0FBQ00sTUFBTSxpQkFBaUIsR0FBR0EsR0FBRyxDQUFBOzs7Ozs7Ozs7O0NBVW5DLENBQUE7QUFDTSxNQUFNLHVCQUF1QixHQUFHQSxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0NBV3pDLENBQUE7QUFDTSxNQUFNLFFBQVEsR0FBR0EsR0FBRyxDQUFBOzs7Ozs7OztDQVExQixDQUFBO01BbUNZLGNBQWMsR0FBRyxDQUM1QixPQUFrRTtJQU1sRSxNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLGlCQUMzQixLQUFLLEVBQUUsaUJBQWlCLElBQ3JCLE9BQU8sRUFDVixDQUFBO0lBQ0YsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUtuQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUN6RSxDQUFDLEdBQUc7UUFDRixDQUFDLENBQUMsTUFBTSxFQUFFO2FBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsaUNBQU0sQ0FBQyxLQUFFLEtBQUssRUFBRSxDQUFDLElBQUcsQ0FBQzthQUNwQyxLQUFLLENBQUMsQ0FBQyxDQUFjLEtBQ3BCLEdBQUcsQ0FBQztZQUNGLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxLQUFLO1lBQ2QsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLO1NBQ25DLENBQUMsQ0FDSCxDQUFBO0tBQ0osQ0FDRixDQUFBO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZixFQUFDO01BRVksb0JBQW9CLEdBQUcsQ0FDbEMsT0FHQztJQUVELE1BQU0sQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0saUJBSXZCLFFBQVEsRUFBRSx1QkFBdUIsSUFDOUIsT0FBTyxFQUNWLENBQUE7SUFDRixPQUFPLENBQUMsQ0FBQTtBQUNWLEVBQUM7TUFDWSxLQUFLLEdBQUcsQ0FDbkIsT0FBeUQ7SUFNekQsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxpQkFDM0IsS0FBSyxFQUFFLFFBQVEsSUFDWixPQUFPLEVBQ1YsQ0FBQTtJQUNGLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FLbkIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFDekUsQ0FBQyxHQUFHO1FBQ0YsQ0FBQyxDQUFDLE1BQU0sRUFBRTthQUNQLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLGlDQUFNLENBQUMsS0FBRSxLQUFLLEVBQUUsQ0FBQyxJQUFHLENBQUM7YUFDcEMsS0FBSyxDQUFDLENBQUMsQ0FBYyxLQUNwQixHQUFHLENBQUM7WUFDRixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsS0FBSztZQUNkLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSztTQUNuQyxDQUFDLENBQ0gsQ0FBQTtLQUNKLENBQ0YsQ0FBQTtJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2Y7Ozs7In0=
