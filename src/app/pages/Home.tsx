import { useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';

export function Home() {
  useEffect(() => {
    document.title = 'Sueño Compartido - Unidos por la EM, ELA y otras enfermedades neurodegenerativas';
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
