# BookTracker

- Yet to come up with a name

#### Libraries

- [Vite](https://vitejs.dev/guide/): Build tool
- [Vitest](https://vitest.dev/guide/): Test runner
- [Testing library](https://testing-library.com/docs/): Used to test react components
- JSDOM: lets us do dom like things without a web browser, and we need a dom environment to test react components in isolation, because the expectations that come with vitest aren't sufficient for testing-library
- [Eslint + Prettier](https://www.youtube.com/watch?v=SMbqi1HPprc&list=LL&index=4): Code formatters that work in tandem, eslint extends prettier so I can specify code standards, and have my code auto-formatted on save.
- React-router: Used to manage client side routing, and enables SPA feature of navigating between pages without reloading.
- [Tailwind](https://tailwindcss.com/docs/guides/vite): Styling, MUI was also a good choice and would probably be faster for development but I prefer the increased control over component styling provided with TW
- Axios: Fetching data
- [Google books api](https://developers.google.com/books/docs/v1/getting_started): used to search for books

Other resources:

- [Book Logo](https://www.svgrepo.com/svg/513520/book-closed)

Helpful resources:
[How to use Vitest with Jest-DOM and React Testing Library](https://www.youtube.com/watch?v=G-4zgIPsjkU)
