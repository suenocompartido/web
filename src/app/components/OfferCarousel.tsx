import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import furgonetaImg from '../../imports/furgoneta.jpg';

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Siguiente imagen"
    >
      <ChevronRight className="w-6 h-6 text-primary" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Imagen anterior"
    >
      <ChevronLeft className="w-6 h-6 text-primary" />
    </button>
  );
}

export function OfferCarousel() {
  const images = [
    {
      url: furgonetaImg,
      alt: 'Proyecto Nadie se Queda Atrás - Vehículo de transporte adaptado y trabajo social itinerante',
      title: 'Nadie se Queda Atrás',
      description: 'Acercando Cuidados y Trabajo Social a la Comarca de Los Pedroches',
      objectFit: 'contain' as const,
    },
  ];

  const hasMultipleImages = images.length > 1;

  const settings = {
    dots: hasMultipleImages,
    infinite: hasMultipleImages,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: hasMultipleImages,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: hasMultipleImages ? <NextArrow /> : undefined,
    prevArrow: hasMultipleImages ? <PrevArrow /> : undefined,
    accessibility: true,
    adaptiveHeight: false,
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-primary/10 bg-white" aria-label="Galería de servicios y proyectos">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <div className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/10] bg-slate-900/5 flex items-center justify-center p-2 sm:p-4">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-contain rounded-lg"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
