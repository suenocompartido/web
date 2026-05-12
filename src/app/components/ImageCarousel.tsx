import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import carreraImg from '../../imports/carrera.jpeg';
import carreraImg2 from '../../imports/carrera.jpg';
import padelImg from '../../imports/padel.jpeg';
import sedeImg from '../../imports/sede.jpeg';
import afectadasImg from '../../imports/afectadas.jpeg';

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

export function ImageCarousel() {
  const images = [
    {
      url: carreraImg,
      alt: 'Equipo de Sueño Compartido en evento de carrera solidaria',
      objectFit: 'cover' as const,
    },
    {
      url: padelImg,
      alt: 'Actividad deportiva de pádel organizada por la asociación',
      objectFit: 'cover' as const,
    },
    {
      url: sedeImg,
      alt: 'Sede de la Asociación Sueño Compartido',
      objectFit: 'cover' as const,
    },
    {
      url: carreraImg2,
      alt: 'Equipo de Sueño Compartido en evento de carrera solidaria',
      objectFit: 'cover' as const,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    accessibility: true,
    adaptiveHeight: false,
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl" aria-label="Galería de imágenes de la asociación">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <div className="aspect-video bg-muted">
              <img
                src={image.url}
                alt={image.alt}
                className={`w-full h-full ${image.objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
