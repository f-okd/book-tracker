import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// We separate the app so we can test it easier using different routers
export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
