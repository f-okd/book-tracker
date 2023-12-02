# BookTracker

- Yet to come up with a name
- Made an attempt to document how technologies were used so you can use them also or just to understand the flow of the application

### Table of Contents

1. [Libraries + Technologies](#libraries)
2. [Backend](#backend)
3. [Using google books Api](#using-google-books-api)
4. [Working with supabase](#working-with-supbase)
5. [React Query](#react-query)
6. [React router](#react-router)
7. [Google OAuth provider](#implementing-google-oauth-provider)
8. [Deployment](#deployment)

#### Libraries + Technologies

- [Vite](https://vitejs.dev/guide/): Build tool
- [Vitest](https://vitest.dev/guide/): Test runner
- [Testing library](https://testing-library.com/docs/): Used to test react components
- JSDOM: lets us do dom like things without a web browser, and we need a dom environment to test react components in isolation, because the expectations that come with vitest aren't sufficient for testing-library
- [Eslint + Prettier](https://www.youtube.com/watch?v=SMbqi1HPprc&list=LL&index=4): Code formatters that work in tandem, eslint extends prettier so I can specify code standards, and have my code auto-formatted on save.
- React-router: Used to manage client side routing, and enables SPA feature of navigating between pages without reloading.
- [Husky](https://www.youtube.com/watch?v=tmTajqVgkwI): Help standardise code and make it easier to facilitate open source contribution
- [Tailwind](https://tailwindcss.com/docs/guides/vite): Styling, MUI was also a good choice and would probably be faster for development but I prefer the increased control over component styling provided with TW
  - [Prettier-plugin](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- Axios: Fetching data
- [html-react-parser](https://www.npmjs.com/package/html-react-parser): The description passed from the google books api contains HTML tags, so we cant simply pass the value as the innerhtml of
- [tanstack/react-query](https://tanstack.com/query/latest/docs/react/examples/react/basic): Used for remote state management (handles all data fetching and mutation to/from supabase)
- [tanstack/react-query-devtools](https://tanstack.com/query/v4/docs/react/devtools): Makes it easy to track remote state variables throughout the lifecycle of the web app. Helped me spot when values weren't updating/behaving as expected and identify the shape of the data that came in
- [axios](https://axios-http.com/docs/api_intro): Used for fetching from the google books api
- [react-hook-form](https://react-hook-form.com/docs/useform): The main benefit was ease of implementing client side validation
- [react-hot-toast](https://react-hot-toast.com/docs/toast): Makes making a toast notification super simple and easy, more user friendly
- [react-router-dom](https://reactrouter.com/en/main/start/tutorial): Used to handle routing and also for querying data with loader functions
- [react-spinners]: Used for a loader symbol when waiting for data to be fetched

- [Google books api](https://developers.google.com/books/docs/v1/getting_started): used to search for books
- [Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs): Backend-as-a-service (BaaS)
- [Book Logo](https://www.svgrepo.com/svg/513520/book-closed): (I didn't create the book logo used in the project)

Helpful resources:
[How to use Vitest with Jest-DOM and React Testing Library](https://www.youtube.com/watch?v=G-4zgIPsjkU)

### Backend

- I chose to use Supabase BaaS because I am familiar with relational DBs in the form of MySQL, and the supabase APIs and documentation make it easy to get a live product out very quickly.
- The google books API is so thoroughly documented with more than enough features to complete this project, which meant that the complexity of the database was very minimal.
  - i.e. the only information I needed store about a book was it's ID. Then we can use the google books api to fetch any relevant information about it
- We only have 1 supabase table for reviews because Supabase manages users + authentication for us, one downside is that it's not normalised at all, so may cause inefficient lookups. And an excessive use of null values throughout
  - by avoiding complexity at the backend level I ended up just moving it to the frontend

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
  - When the user clicks on a search result in (SearchResultItem.tsx), we pass state to the URL and it navigates to /book/:id
  - The loader function defined below the functional componenent in BookDetailsPage.tsx fetches+returns the book details of the whom's Id we have passed as a search param using googleBooksApi

  ```
  <!-- src\modules\booksSearch\components\BookDetailsPage.tsx -->

  export const loader = async ({ params }: LoaderFunctionArgs) => {
    // console.log(params.bookId);
    const book: IBook = await getBookFromGoogle(params.bookId ?? '');
    return book;
  };

  export default Book;
  ```

  - In the main component we access this as such:

  ```
  const book: IBook = useLoaderData() as IBook;
  ```

  - We can also use a fetcher functuon to fetch the value returned by a loader at a specific route
  - e.g. In BookPreview.tsx (the book cards in the book list), we want to fetch book details again without typing it all again

  ```
  const BookPreview = ({ book }: IBookPreview) => {
    const fetcher = useFetcher<IBook>();

    useEffect(() => {
      fetcher.load(`/book/${book.book_id}`);
    }, [book.book_id]);

    if (fetcher.state === 'loading') return <Loader />;
    if (fetcher.state === 'idle' && !fetcher.data)
      return <div>No data found</div>;

    if (fetcher.data) {
      const bookData = fetcher.data;
      return (
        <p>{bookData.title}</p>
      )
    }
  }
  ```

### Implementing Google OAuth Provider:

[Supabase Docs](https://supabase.com/docs/learn/auth-deep-dive/auth-google-oauth)
[Accompanying video](https://www.youtube.com/watch?v=_XM9ziOzWk4)
state:

- Enable google provider on Supabase Auth settings
- Create new google project on google console
- Configure OAuth consent screen for external user type, where you can also set redirect li
- Generate OAuth client ID credentials
  - Add authorsed redirect URI: https://<your-ref>.supabase.co/auth/v1/callback
  - ^ The exact link can be found under the google provider details in supabase auth settings https://supabase.com/dashboard/project/<your-ref>/auth/providers
- Add client ID + secret to supabase
- You can now create a button that calls the supabase.auth.signIn function with google provider:

```
<src\modules\auth\components\Login.tsx>
...
<Button type="ternary" onClick={supabaseSignInWithGoogle}>
  Sign in with Google
</Button>
<!-- src\services\supabase\apiAuth.ts -->
...
export const supabaseSignInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) throw new Error(error.message);
  return data;
};

```

### Deployment

- build application, which creates a dist folder

```
npm run build
```

- create netlify.toml file in dist + main folder and enter:

```
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

- Login/signup to netlify
- upload using netlify drop + configure site settings

### CI with github

- Can be done with netlify/vercel
- With vercel just create an account + link it to your github
- Select your repo from the list and deploy
- IMPORTANT: remember to upload environment variables!
- Add vercel config file (vercel.json) in the root of your project otherwise app may crash when you refresh:

```
<!-- vercel.json -->
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

- Will redeploy every time a change is detected

### What would I change?

- Store user + user books state in redux!!
- Normalise database!!
  - This would have meant we have to work with less null values and bandaid fixes/workarounds
