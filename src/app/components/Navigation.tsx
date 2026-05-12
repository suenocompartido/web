import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import logoSC from '../../imports/logoSC.png';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleScrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50" role="navigation" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src={logoSC}
              alt="Logo de Sueño Compartido"
              className="w-14 h-14 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-xl lg:text-2xl font-semibold text-foreground leading-tight">
                Sueño Compartido
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Unidos por las esclerosis
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {isHome ? (
              <>
                <button
                  onClick={() => handleScrollToSection('inicio')}
                  className="px-6 py-3 rounded-lg text-lg font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Ir a sección Inicio"
                >
                  Inicio
                </button>
                <button
                  onClick={() => handleScrollToSection('quienes-somos')}
                  className="px-6 py-3 rounded-lg text-lg font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Ir a sección Quiénes Somos"
                >
                  Quiénes Somos
                </button>
                <button
                  onClick={() => handleScrollToSection('contacto')}
                  className="px-6 py-3 rounded-lg text-lg font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Ir a sección Contacto"
                >
                  Contacto
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="px-6 py-3 rounded-lg text-lg font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Inicio
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-border mt-2 pt-4">
            <div className="flex flex-col gap-2">
              {isHome ? (
                <>
                  <button
                    onClick={() => handleScrollToSection('inicio')}
                    className="w-full text-left px-6 py-4 rounded-lg text-lg font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Ir a sección Inicio"
                  >
                    Inicio
                  </button>
                  <button
                    onClick={() => handleScrollToSection('quienes-somos')}
                    className="w-full text-left px-6 py-4 rounded-lg text-lg font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Ir a sección Quiénes Somos"
                  >
                    Quiénes Somos
                  </button>
                  <button
                    onClick={() => handleScrollToSection('contacto')}
                    className="w-full text-left px-6 py-4 rounded-lg text-lg font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Ir a sección Contacto"
                  >
                    Contacto
                  </button>
                </>
              ) : (
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-left px-6 py-4 rounded-lg text-lg font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Inicio
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
