import { $ as readable } from './client.a6b1653e.js';
import { s as src, c as client, N as NetworkStatus } from './ApolloClientStore.3582e0c8.js';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC40ZmYxMDA5Zi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dlbmVyYXRlZC9ncmFwaHFsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbImdxbCJdLCJtYXBwaW5ncyI6Ijs7O0FBa0dBO0FBQ0EsSUFBWSxRQUdYO0FBSEQsV0FBWSxRQUFRO0lBQ2xCLDJCQUFlLENBQUE7SUFDZiw2QkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsUUFBUSxLQUFSLFFBQVEsUUFHbkI7QUE2Rk0sTUFBTSxXQUFXLEdBQUdBLEdBQUcsQ0FBQTs7Ozs7O0NBTTdCLENBQUE7QUFDTSxNQUFNLGlCQUFpQixHQUFHQSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Q0FVbkMsQ0FBQTtBQUNNLE1BQU0sdUJBQXVCLEdBQUdBLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Q0FXekMsQ0FBQTtBQUNNLE1BQU0sUUFBUSxHQUFHQSxHQUFHLENBQUE7Ozs7Ozs7O0NBUTFCLENBQUE7TUFtQ1ksY0FBYyxHQUFHLENBQzVCLE9BQWtFO0lBTWxFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLFVBQVUsaUJBQzNCLEtBQUssRUFBRSxpQkFBaUIsSUFDckIsT0FBTyxFQUNWLENBQUE7SUFDRixJQUFJLE1BQU0sR0FBRyxRQUFRLENBS25CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQ3pFLENBQUMsR0FBRztRQUNGLENBQUMsQ0FBQyxNQUFNLEVBQUU7YUFDUCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxpQ0FBTSxDQUFDLEtBQUUsS0FBSyxFQUFFLENBQUMsSUFBRyxDQUFDO2FBQ3BDLEtBQUssQ0FBQyxDQUFDLENBQWMsS0FDcEIsR0FBRyxDQUFDO1lBQ0YsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLEtBQUs7WUFDZCxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUs7U0FDbkMsQ0FBQyxDQUNILENBQUE7S0FDSixDQUNGLENBQUE7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLEVBQUM7TUFFWSxvQkFBb0IsR0FBRyxDQUNsQyxPQUdDO0lBRUQsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxpQkFJdkIsUUFBUSxFQUFFLHVCQUF1QixJQUM5QixPQUFPLEVBQ1YsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxDQUFBO0FBQ1YsRUFBQztNQUNZLEtBQUssR0FBRyxDQUNuQixPQUF5RDtJQU16RCxNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLGlCQUMzQixLQUFLLEVBQUUsUUFBUSxJQUNaLE9BQU8sRUFDVixDQUFBO0lBQ0YsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUtuQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUN6RSxDQUFDLEdBQUc7UUFDRixDQUFDLENBQUMsTUFBTSxFQUFFO2FBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsaUNBQU0sQ0FBQyxLQUFFLEtBQUssRUFBRSxDQUFDLElBQUcsQ0FBQzthQUNwQyxLQUFLLENBQUMsQ0FBQyxDQUFjLEtBQ3BCLEdBQUcsQ0FBQztZQUNGLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxLQUFLO1lBQ2QsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLO1NBQ25DLENBQUMsQ0FDSCxDQUFBO0tBQ0osQ0FDRixDQUFBO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZjs7OzsifQ==
