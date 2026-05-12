import { Heart } from 'lucide-react';
import { Link } from 'react-router';
import logoSC from '../../imports/logoSC.png';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src={logoSC}
              alt="Logo de Sueño Compartido"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-semibold leading-tight text-foreground">
                Sueño Compartido
              </h2>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-base text-foreground">
            <span>Hecho con</span>
            <Heart className="w-5 h-5 text-primary fill-primary" aria-label="amor" />
            <span>en Pozoblanco, Córdoba</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Sueño Compartido. Todos los derechos reservados.</span>
            <span>·</span>
            <Link to="/transparencia" className="hover:text-primary transition-colors underline">
              Transparencia
            </Link>
            <span>·</span>
            <Link to="/privacidad" className="hover:text-primary transition-colors underline">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
