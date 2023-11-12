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

| review_id | book_id | rating | comment                 |
| --------- | ------- | ------ | ----------------------- |
| 1         | 123     | 4      | Great book! Highly rec. |
| 2         | 124     | 3      | Good read, but not best |
| 3         | 123     | 5      | Excellent! Must-read.   |
| 4         | 125     | 2      | Disappointed.           |

- review_id:int8 is a unique identifier for each review.
- book_id:text would be a foreign key referring to the book being reviewed if we had a books table
- user_id:uuid is a foreign key referring to the user who wrote the review.
- rating:int2 is the user's rating for the book (e.g., on a scale from 1 to 5).
- comment:text is the written review or comment provided by the user.

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
- Need to install supabase package: npm i --save @Supabase/supabase-js
- Can also use Supabase CLI to [generate types](https://supabase.com/docs/reference/javascript/typescript-support) based on database schema: gen types typescript --project-id abcdefghijklmnopqrst > database.types.ts
- Projects have a RESTful endpoint that you can use with your project's API key to query and manage your database. I've put the keys in my .env file.

- [Connect to your project](https://supabase.com/dashboard/project/pyqlglhglzmuijyvufkr/auth/providers):

```
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PROJECT_URL;
const supabaseKey = import.meta.env.ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

```

### React query

- We use react-query for remote state management, meaning it will take over data fetching and storage for this application
