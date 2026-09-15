import { useMemo } from 'react';
import { CalendarOff, Sparkles } from 'lucide-react';
import { EventsCarousel, EventItem } from './EventsCarousel';

export function getUpcomingEvents(): EventItem[] {
  const eventModules = import.meta.glob<{ default: string }>(
    '../../imports/eventos/*.{jpg,jpeg,png,webp,avif,svg}',
    { eager: true }
  );

  const now = new Date();
  const events: EventItem[] = [];

  for (const path in eventModules) {
    const filename = path.split('/').pop() || '';
    const match = filename.match(/(\d{2})_(\d{2})_(\d{4})/);
    if (!match) continue;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Event remains valid until the end of the specified day (23:59:59)
    const eventEndDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    if (now <= eventEndDate) {
      const eventDate = new Date(year, month - 1, day);
      const dateFormatted = eventDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      events.push({
        url: eventModules[path].default,
        filename,
        date: eventDate,
        dateFormatted,
      });
    }
  }

  // Sort upcoming events chronologically (earliest event first)
  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function EventsSection() {
  const upcomingEvents = useMemo(() => getUpcomingEvents(), []);

  return (
    <section
      id="eventos"
      className="bg-white py-20 lg:py-32 border-t border-border/50"
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold text-lg tracking-wide uppercase mb-2 block">
            A beneficio de la asociación
          </span>
          <h2 id="events-heading" className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Próximos Eventos
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            Descubre los eventos solidarios y actividades organizadas a favor de Sueño Compartido en la comarca de Los Pedroches.
          </p>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="max-w-5xl mx-auto">
            <EventsCarousel events={upcomingEvents} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-muted/30 border-2 border-dashed border-primary/20 rounded-3xl p-12 shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarOff className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
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
