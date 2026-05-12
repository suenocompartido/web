import { useEffect } from 'react';

export function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Política de Privacidad - Sueño Compartido';
  }, []);

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Política de Privacidad
          </h1>
          <p className="text-lg text-muted-foreground">
            Última actualización: 12 de mayo de 2026
          </p>
        </div>

        <div className="space-y-12">
          {/* Sección 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">1.</span>
              Responsable del tratamiento
            </h2>
            <div className="bg-secondary rounded-xl p-6 space-y-2">
              <p className="text-lg text-foreground">
                <strong>Denominación:</strong> Asociación Sueño Compartido
              </p>
              <p className="text-lg text-foreground">
                <strong>CIF:</strong> G56070089
              </p>
              <p className="text-lg text-foreground">
                <strong>Dirección:</strong> C/Encina 74, 14400 Pozoblanco (Córdoba)
              </p>
              <p className="text-lg text-foreground">
                <strong>Teléfono:</strong> +34 647 704 333
              </p>
              <p className="text-lg text-foreground">
                <strong>Email de contacto:</strong> ascompartido@gmail.com
              </p>
            </div>
          </div>

          {/* Sección 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">2.</span>
              Datos personales que tratamos
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Este sitio web no dispone de formularios de contacto. Los datos personales que podemos tratar son únicamente los que usted nos facilita voluntariamente al ponerse en contacto con nosotros a través de:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-lg text-foreground">Correo electrónico (nombre, email, motivo de consulta)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-lg text-foreground">WhatsApp o teléfono (nombre, número de teléfono, motivo de consulta)</span>
                </li>
              </ul>
              <p className="text-lg text-muted-foreground leading-relaxed">
                No recogemos datos de navegación ni utilizamos cookies propias de análisis o publicidad.
              </p>
              <div className="mt-6">
                <p className="text-lg font-medium text-foreground mb-3">Categorías de datos tratados:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span className="text-lg text-foreground">Datos identificativos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span className="text-lg text-foreground">Direcciones postales y electrónicas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span className="text-lg text-foreground">Información comercial</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sección 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">3.</span>
              Finalidad y base legal del tratamiento
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Gestión de consultas</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Atender y responder las consultas recibidas. <strong>Base legal:</strong> interés legítimo del responsable (art. 6.1.f RGPD).
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Prestación del servicio</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  En caso de iniciar un proceso de apoyo o servicio asociativo, el tratamiento de datos de salud se basa en el consentimiento explícito del interesado (art. 9.2.a RGPD) y en la asistencia sanitaria (art. 9.2.h RGPD).
                </p>
              </div>
            </div>
          </div>

          {/* Sección 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">4.</span>
              Plazo de conservación
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Los datos se conservarán durante el tiempo necesario para la prestación del servicio y, posteriormente, durante los plazos de prescripción de responsabilidades legales aplicables. Los datos de salud se conservan conforme a lo establecido en la normativa sanitaria vigente.
            </p>
          </div>

          {/* Sección 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">5.</span>
              Terceros y transferencias internacionales
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Este sitio web utiliza los siguientes servicios de terceros que pueden implicar transferencias de datos:
            </p>
            <ul className="space-y-4">
              <li className="bg-muted rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-2">Google Fonts</p>
                <p className="text-base text-muted-foreground">
                  Carga de tipografías desde servidores de Google (EE.UU.). Al cargar la página, su dirección IP se transmite a Google LLC. Más información en la{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-accent">
                    Política de Privacidad de Google
                  </a>.
                </p>
              </li>
              <li className="bg-muted rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-2">Google Maps</p>
                <p className="text-base text-muted-foreground">
                  El enlace de ubicación abre Google Maps en una nueva pestaña. Solo se activa si usted pulsa el enlace. Rige la Política de Privacidad de Google.
                </p>
              </li>
              <li className="bg-muted rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-2">WhatsApp (Meta)</p>
                <p className="text-base text-muted-foreground">
                  Al pulsar el botón de WhatsApp se abre la aplicación o la web de WhatsApp. El tratamiento de datos en esa comunicación queda sujeto a la{' '}
                  <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-accent">
                    Política de Privacidad de WhatsApp
                  </a>.
                </p>
              </li>
            </ul>
          </div>

          {/* Sección 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">6.</span>
              Cookies
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Este sitio web no utiliza cookies propias de análisis ni publicidad. Google Fonts puede establecer cookies técnicas de terceros al cargar las tipografías desde sus servidores. No realizamos perfilado de usuarios ni seguimiento de navegación.
            </p>
          </div>

          {/* Sección 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">7.</span>
              Sus derechos
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              En virtud del RGPD y la LOPD-GDD, puede ejercer los siguientes derechos respecto a sus datos personales:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-1">Acceso</p>
                <p className="text-base text-muted-foreground">Conocer qué datos tratamos sobre usted</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-1">Rectificación</p>
                <p className="text-base text-muted-foreground">Corregir datos inexactos o incompletos</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-1">Supresión</p>
                <p className="text-base text-muted-foreground">Solicitar la eliminación de sus datos</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-1">Oposición</p>
                <p className="text-base text-muted-foreground">Oponerse al tratamiento basado en interés legítimo</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-1">Limitación</p>
                <p className="text-base text-muted-foreground">Solicitar la restricción del tratamiento</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-lg font-medium text-foreground mb-1">Portabilidad</p>
                <p className="text-base text-muted-foreground">Recibir sus datos en formato estructurado</p>
              </div>
            </div>
            <div className="mt-6 bg-primary/10 border-l-4 border-primary rounded-lg p-6">
              <p className="text-lg font-medium text-foreground mb-2">Retirada del consentimiento</p>
              <p className="text-base text-muted-foreground">
                Si ha otorgado consentimiento para alguna finalidad, puede retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento previo a su retirada.
              </p>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6">
              Para ejercer estos derechos, diríjase por escrito a{' '}
              <a href="mailto:info@suenocompartido.org" className="text-primary underline hover:text-accent">
                info@suenocompartido.org
              </a>
              , indicando el derecho que desea ejercer y adjuntando copia de su documento de identidad.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Si considera que el tratamiento no se ajusta a la normativa vigente, puede presentar una reclamación ante la{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-accent">
                Agencia Española de Protección de Datos (AEPD)
              </a>.
            </p>
          </div>

          {/* Sección 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">8.</span>
              Seguridad de los datos
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Aplicamos medidas técnicas y organizativas adecuadas para proteger sus datos contra accesos no autorizados, pérdida o destrucción accidental, conforme al artículo 32 del RGPD.
            </p>
          </div>

          {/* Sección 9 */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="text-primary">9.</span>
              Actualizaciones de esta política
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sueño Compartido se reserva el derecho a modificar esta Política de Privacidad para adaptarla a cambios normativos o en los servicios. La versión vigente estará siempre disponible en esta página con la fecha de última actualización.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
