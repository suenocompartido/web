import { FileText, Euro, Scale, Calendar, FileCheck } from 'lucide-react';
import balancePdf from '../../imports/Balance_de_situacion_2024.pdf';
import certificadoPdf from '../../imports/CERTIFICADO_REGISTRAL.pdf';
import cuentaPdf from '../../imports/Cuenta_de_Perdidas_y_Ganancias_2024.pdf';
import memoriaPdf from '../../imports/MEMORIA_ACTIVIDADES.pdf';
import resolucionPdf from '../../imports/RESOLUCION_MODIFICACION_ESTATUTOS_ASOCIACION_SUEN_O_COMPARTIDO.pdf';

export function TransparencySection() {
  const documents = [
    {
      title: 'Junta Directiva',
      description: 'Junta Directiva de la asociación.',
      icon: FileText,
      year: '2024',
      file: certificadoPdf,
      filename: 'Certificado_Registral_Sueno_Compartido.pdf',
    },
    {
      title: 'Estatutos',
      description: 'Resolución oficial de la modificación de los estatutos de la asociación.',
      icon: FileCheck,
      year: '2025',
      file: resolucionPdf,
      filename: 'Resolucion_Modificacion_Estatutos_Sueno_Compartido.pdf',
    },
    {
      title: 'Memoria de Actividades',
      description: 'Resumen completo de todas las actividades realizadas durante el año.',
      icon: Calendar,
      year: '2024',
      file: memoriaPdf,
      filename: 'Memoria_Actividades_2024_Sueno_Compartido.pdf',
    },
    {
      title: 'Balance 2024',
      description: 'Estado patrimonial y financiero de la asociación al cierre del ejercicio.',
      icon: Scale,
      year: '2024',
      file: balancePdf,
      filename: 'Balance_Situacion_2024_Sueno_Compartido.pdf',
    },
    {
      title: 'Cuenta de Pérdidas y Ganancias 2024',
      description: 'Detalle de ingresos, gastos y resultado económico del ejercicio.',
      icon: Euro,
      year: '2024',
      file: cuentaPdf,
      filename: 'Cuenta_PyG_2024_Sueno_Compartido.pdf',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-muted via-white to-secondary py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Transparencia
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            La transparencia es uno de nuestros valores fundamentales. Aquí encontrarás toda la información sobre nuestra gestión y actividades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {doc.title}
                      </h3>
                      <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                        {doc.year}
                      </span>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {doc.description}
                    </p>
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label={`Ver ${doc.title}`}
                    >
                      <FileText className="w-5 h-5" aria-hidden="true" />
                      <span className="text-base font-medium">Ver documento</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
