import { Heart, Users, Lightbulb } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="bg-gradient-to-br from-secondary via-white to-muted py-20 lg:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 id="hero-heading" className="text-4xl lg:text-6xl font-semibold text-foreground mb-6">
            Unidos por las esclerosis en Los Pedroches
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Sueño Compartido es una asociación dedicada a mejorar la calidad de vida de las personas con esclerosis múltiple, ELA y enfermedades similares en el Valle de los Pedroches, Córdoba.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Apoyo y Acompañamiento
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ofrecemos apoyo emocional y práctico a las personas afectadas por la esclerosis múltiple, ELA y enfermedades similares.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Comunidad Activa
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Creamos una red de apoyo donde compartir experiencias y fortalecer vínculos.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Información y Recursos
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Proporcionamos información actualizada sobre tratamientos y recursos disponibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
