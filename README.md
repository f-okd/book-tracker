# BookTracker

- Yet to come up with a name

#### Libraries + Technologies

- [Vite](https://vitejs.dev/guide/): Build tool
- [Vitest](https://vitest.dev/guide/): Test runner
- [Testing library](https://testing-library.com/docs/): Used to test react components
- JSDOM: lets us do dom like things without a web browser, and we need a dom environment to test react components in isolation, because the expectations that come with vitest aren't sufficient for testing-library
- [Eslint + Prettier](https://www.youtube.com/watch?v=SMbqi1HPprc&list=LL&index=4): Code formatters that work in tandem, eslint extends prettier so I can specify code standards, and have my code auto-formatted on save.
- React-router: Used to manage client side routing, and enables SPA feature of navigating between pages without reloading.
- [Tailwind](https://tailwindcss.com/docs/guides/vite): Styling, MUI was also a good choice and would probably be faster for development but I prefer the increased control over component styling provided with TW
- Axios: Fetching data
- Toaster
- [Google books api](https://developers.google.com/books/docs/v1/getting_started): used to search for books
- [Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs): Backend-as-a-service (BaaS)
- [Book Logo](https://www.svgrepo.com/svg/513520/book-closed)

Helpful resources:
[How to use Vitest with Jest-DOM and React Testing Library](https://www.youtube.com/watch?v=G-4zgIPsjkU)

### Backend

- I chose to use Supabase BaaS because I am familiar with relational DBs in the form of MySQL, and the supabase APIs and documentation make it easy to get a live product out very quickly. (seriously it's insane)
- The google books API is so thoroughly documented with more than enough features to complete this project, which meant that the complexity of the database was very minimal.
  - i.e. the only information I needed store about a book was it's ID. Then we can use the google books api to fetch any relevant information about it
- We only have 1 supabase table for reviews because Supabase manages users + authentication for us

Reviews Table:

| review_id | book_id | rating | comment                 | status  |
| --------- | ------- | ------ | ----------------------- | ------- |
| 1         | 123     | 4      | Great book! Highly rec. | toRead  |
| 2         | 124     | 3      | Good read, but not best | reading |
| 3         | 123     | 5      | Excellent! Must-read.   | read    |
| 4         | 125     | 2      | Disappointed.           | dnf     |

- review_id:int8 is a unique identifier for each review.
- book_id:text would be a foreign key referring to the book being reviewed if we had a books table
- user_id:uuid is a foreign key referring to the user who wrote the review.
- rating:int2 is the user's rating for the book (e.g., on a scale from 1 to 5).
- comment:text is the written review or comment provided by the user.
- status:text is about whether the user has read, is reading, wants to read or didn't finish the book

### Using Google Books API:

- See implementation: src/services/apiGoogleBooks.ts
- We the Google Books Rest API
- You don't actually need a Google API Key/any form of authentication to get started with this because we're only accessing public data about volumes
- We are either fetching a book (Called a [volume](https://developers.google.com/books/docs/v1/reference/volumes) in documentation) or a list of books of this type in json format:
- We destructure it and extract only the information relevant to this project:

```
export const parseBook = (apiResponse: any): IBook => {
  const { id, volumeInfo } = apiResponse;
  const { title, authors, publishedDate, description, imageLinks } =
    volumeInfo ?? {};
  const { smallThumbnail, thumbnail } = imageLinks ?? {};

  const extractedData = {
    id,
    title,
    authors,
    publishedDate,
    description,
    smallThumbnail,
    thumbnail,
  };

  return extractedData;
};

```

[How to fetch a book](https://developers.google.com/books/docs/v1/reference/volumes/get): GET https://www.googleapis.com/books/v1/volumes/volumeId returns a volume resource, which is so big/complex I chose not to add it as a type interface.

```
// Fetching a single book using an Id
export const getBook = async (bookId: string) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
  );

  return response.data;
};
```

[How to search for a book](https://developers.google.com/books/docs/v1/getting_started): HTTP GET https://www.googleapis.com/books/v1/volumes?q=quilting returns an array of volume resources

```
export const getBooks = async (
  searchValue: string,
) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=8`,
  );

  return response.data.items;
};
```

### Working with Supbase

- User management tutorial for react: [Official documentation](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- Need to install supabase package:

```
npm i --save @Supabase/supabase-js
```

- Projects have a RESTful endpoint that you can use with your project's API key to query and manage your database. I've put the keys in my .env file.
- [Connect to your project](https://supabase.com/dashboard/project/pyqlglhglzmuijyvufkr/auth/providers): We need to initialise a supabase client that we use to make db requests

```

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PROJECT_URL;
const supabaseKey = import.meta.env.ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

```

- For typescript users we can also use Supabase CLI to [generate types](https://supabase.com/docs/guides/api/rest/generating-types) based on database schema, we can now leverage intellisense for debugging:
  - note if you're using VSCODE on windows you may have to run this from terminal (didn't work in vscode for me)

```
  npm i supabase@">=1.8.1" --save-dev
  npx supabase login
  npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > types/supabase.ts

```

example of using types:

```
export const getBooksFromDb = async (): Promise<
  Database['public']['Tables']['UserBooks']['Row'][]
> => {
  const { data: books, error } = await supabase.from('UserBooks').select('*');

  if (error) {
    console.error(error);
    throw new Error("Couldn't fetch books from supabase");
  }
  return books;
};
```

### React query

- [Install react-query](https://tanstack.com/query/latest/docs/react/installation) for remote state management, meaning it will take over data fetching and storage for this application
- Instead of using a useEffect to query data, we can use reactQuery
- [Install the devtools](https://tanstack.com/query/latest/docs/react/devtools) so that we can track the state

```

npm i @tanstack/react-query
npm i -D @tanstack/eslint-plugin-query
npm i @tanstack/react-query-devtools

```

Wrap Application with QueryClientProvider so we can provide data to the whole tree

```

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routesConfig } from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
defaultOptions: {
queries: {
staleTime: 0,
},
},
});

function App() {
const router = createBrowserRouter(routesConfig);
return (
<QueryClientProvider client={queryClient}>
<RouterProvider router={router} />
</QueryClientProvider>
);
}

export default App;

```

### React router

- With react-router we can use loaders for "render as you fetch" functionality, so that means we can assign data to be fetched from a particular path/route
  - We can also fetch data from that route without visiting it using fetchers, thereby associating specific routes with specific data
  - i.e. in this project /mybooks/read loader will call the supabase api function to retrieve records of all read books

notes:

state:

- fetch userbooks in redux straight awya
  user
  books - booklist - book details page
