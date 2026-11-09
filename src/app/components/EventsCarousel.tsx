import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

import type { CarouselImage } from '../lib/carouselImages';

interface EventsCarouselProps {
  events: CarouselImage[];
}

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Siguiente evento"
    >
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Evento anterior"
    >
      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
    </button>
  );
}

export function EventsCarousel({ events }: EventsCarouselProps) {
  const hasMultipleEvents = events.length > 1;

  const settings = {
    dots: hasMultipleEvents,
    infinite: hasMultipleEvents,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: hasMultipleEvents,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: hasMultipleEvents ? <NextArrow /> : undefined,
    prevArrow: hasMultipleEvents ? <PrevArrow /> : undefined,
    accessibility: true,
    adaptiveHeight: false,
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-primary/10 bg-white" aria-label="Carrusel de próximos eventos">
      <Slider {...settings}>
        {events.map((event, index) => (
          <div key={event.filename} className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] bg-slate-900/5 flex items-center justify-center p-2 sm:p-4">
              <img
                src={event.url}
                alt={event.alt}
                className="w-full h-full object-contain rounded-lg"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary/95 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg flex items-center gap-2 text-xs sm:text-base font-medium max-w-[calc(100%-1rem)]">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="capitalize">{event.dateFormatted}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
