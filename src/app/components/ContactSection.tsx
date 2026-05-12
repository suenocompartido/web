import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contacto" className="bg-gradient-to-br from-muted via-white to-secondary py-20 lg:py-32" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 id="contact-heading" className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Contacto
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            Si necesitas información adicional sobre nuestra gestión o tienes alguna pregunta, no dudes en contactarnos.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 lg:p-16 shadow-xl border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Email
              </h3>
              <a
                href="mailto:ascompartido@gmail.com"
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                ascompartido@gmail.com
              </a>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Teléfono
              </h3>
              <a
                href="tel:+34647704333"
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                647 704 333
              </a>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Dirección
              </h3>
              <p className="text-lg text-muted-foreground">
                C/Encina 74, 14400 Pozoblanco (Córdoba)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
