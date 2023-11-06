import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routesConfig } from './Routes';

function App() {
  const router = createBrowserRouter(routesConfig);
  return <RouterProvider router={router} />;
}

export default App;
