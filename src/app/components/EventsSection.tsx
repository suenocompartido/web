import { CalendarOff, Sparkles } from 'lucide-react';
import { EventsCarousel } from './EventsCarousel';
import { useCarouselImages } from '../lib/carouselImages';

export function EventsSection() {
  const { images: upcomingEvents, loading } = useCarouselImages('eventos');

  return (
    <section
      id="eventos"
      className="bg-white py-14 sm:py-20 lg:py-32 border-t border-border/50"
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <span className="text-primary font-semibold text-lg tracking-wide uppercase mb-2 block">
            A beneficio de la asociación
          </span>
          <h2 id="events-heading" className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Próximos Eventos
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            Descubre los eventos solidarios y actividades organizadas a favor de Sueño Compartido en la comarca de Los Pedroches.
          </p>
        </div>

        {loading ? (
          <div
            className="max-w-5xl mx-auto rounded-2xl shadow-xl border border-primary/10 bg-white aspect-[4/5] sm:aspect-[16/10] animate-pulse"
            aria-busy="true"
            aria-label="Cargando próximos eventos"
          />
        ) : upcomingEvents.length > 0 ? (
          <div className="max-w-5xl mx-auto">
            <EventsCarousel events={upcomingEvents} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-muted/30 border-2 border-dashed border-primary/20 rounded-3xl p-6 sm:p-12 shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarOff className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
              No hay próximos eventos programados
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Actualmente no tenemos eventos solidarios activos. ¡Permanece atento/a a nuestras redes y página web para futuras actividades!
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-secondary px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span>Próximamente publicaremos nuevos eventos</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
