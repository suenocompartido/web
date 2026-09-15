import { Bus, Handshake, Heart, Network, CheckCircle2 } from 'lucide-react';
import { OfferCarousel } from './OfferCarousel';

export function OfferSection() {

  return (
    <section
      id="que-ofrecemos"
      className="bg-muted/40 py-20 lg:py-32 border-t border-border/50"
      aria-labelledby="offer-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold text-lg tracking-wide uppercase mb-2 block">
            Nuestros Servicios y Proyectos
          </span>
          <h2 id="offer-heading" className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            ¿Qué Ofrecemos?
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            Ofrecemos servicios de atención integral, gimnasia, talleres, transporte adaptado, apoyo continuo a afectados/a en toda la comarca de Los Pedroches.
          </p>
        </div>

        {/* Image Carousel Section */}
        <div className="mb-16 max-w-5xl mx-auto">
          <OfferCarousel />
        </div>
      </div>
    </section>
  );
}
