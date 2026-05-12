import { Target, Hand, Globe } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';

export function AboutSection() {
  return (
    <section
      id="quienes-somos"
      className="bg-white py-20 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 id="about-heading" className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Quiénes Somos
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            Somos una asociación sin ánimo de lucro comprometida con las personas afectadas por la esclerosis múltiple, ELA y enfermedades similares en la comarca de Los Pedroches.
          </p>
        </div>

        <div className="mb-16 w-4/5 mx-auto">
          <ImageCarousel />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-secondary to-muted rounded-2xl p-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Nuestra Misión
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mejorar la calidad de vida de forma transversal de las personas con Esclerosis Múltiple, ELA y enfermedades similares,mediante el apoyo integral y la atención personal a la persona mediante el apoyo integral, la difusión de información y la promoción de la investigación.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary to-muted rounded-2xl p-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Nuestra Visión
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ser un referente en el apoyo a personas con esclerosis múltiple, ELA y enfermedades similares, promoviendo la inclusión social y la autonomía personal en nuestra comunidad.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-2 border-primary/20 p-10">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Hand className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Nuestros Valores
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" aria-hidden="true"></span>
                  <span className="text-lg text-foreground">Solidaridad y apoyo mutuo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" aria-hidden="true"></span>
                  <span className="text-lg text-foreground">Respeto y dignidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" aria-hidden="true"></span>
                  <span className="text-lg text-foreground">Transparencia en nuestra gestión</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" aria-hidden="true"></span>
                  <span className="text-lg text-foreground">Compromiso con la comunidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" aria-hidden="true"></span>
                  <span className="text-lg text-foreground">Inclusión y accesibilidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" aria-hidden="true"></span>
                  <span className="text-lg text-foreground">Innovación y mejora continua</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
