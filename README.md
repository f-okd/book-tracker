# Koods' Archive (Book Tracking Application)

This is a book tracking application built using React, Supabase and the Google Books API. Individuals can track books they want to read, are reading, have read or decided not to finish, fetched using the Google Books API. They can also add reviews and ratings for these books. 

Users can also login, signup and change passwords. Vitest was used for React unit testing.

## How to Run

Follow these steps to clone and run the project on your local machine:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/f-okd/book-tracker
   ```

2. Navigate to the project directory:

   ```bash
   cd C:\...\book-tracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

You should be able to access the application at [http://localhost:5173](http://localhost:5173).

## How to Test

Ensure the project functions as expected by following these steps:

1. Follow steps (1-3) from [above](#How to Run)
2. Run tests:
   `bash
    npm run test
    `
   To generate coverage reports, you can use:
   `bash
    npm run test -- --coverage
    `

## How to Contribute

If you'd like to contribute to the project, follow these steps:

1. Create an Issue (optional):
   It would be preferable to create an issue first, so proposed changes or plans can be discussed

2. Follow steps (1-3) from [above](#How to Run)

3. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature-name
   ```

4. Make your changes and commit them:

   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. Push your branch to the remote repository:

   ```bash
   git push origin feature-name
   ```

6. Open a pull request on GitHub, describing your changes.

Thank you for reading!

If you want a deeper understanding of how this project works, for contribution's sake or otherwise, I made some notes about how the different features were implemented [here](https://github.com/f-okd/book-tracker/blob/main/misc/README.md)

## Tech Stack

- [Node.js](http://nodejs.org/) – Frameworks (Full Stack)
- [React](https://reactjs.org/) – Javascript UI Libraries
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Languages
- [TypeScript](http://www.typescriptlang.org) – Languages
- [React Router](https://github.com/rackt/react-router) – JavaScript Framework Components
- [axios](https://github.com/mzabriskie/axios) – Javascript Utilities & Libraries
- [Prettier](https://prettier.io/) – Code Review
- [Tailwind CSS](https://tailwindcss.com) – Front-End Frameworks
- [Supabase](https://supabase.com/) – Realtime Backend / API
- [Vite](https://vitejs.dev/) – JS Build Tools / JS Task Runners
