import { useEffect } from 'react';
import { TransparencySection } from '../components/TransparencySection';

export function Transparencia() {
  useEffect(() => {
    document.title = 'Transparencia - Sueño Compartido';
  }, []);

  return <TransparencySection />;
}
