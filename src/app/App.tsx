import { RouterProvider } from 'react-router';
import { useEffect } from 'react';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    document.title = 'Sueño Compartido - Unidos por la EM, ELA y otras enfermedades neurodegenerativas';
  }, []);

  return <RouterProvider router={router} />;
}