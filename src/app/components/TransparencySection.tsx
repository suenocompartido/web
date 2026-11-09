import { FileText } from "lucide-react";
import { useTransparencyDocuments } from "../lib/transparencyDocuments";

export function TransparencySection() {
  const { documents, loading } = useTransparencyDocuments();

  return (
    <section className="bg-gradient-to-br from-muted via-white to-secondary py-14 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Transparencia
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            La transparencia es uno de nuestros valores fundamentales. Aquí
            encontrarás toda la información sobre nuestra gestión y actividades.
          </p>
        </div>

        {loading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            aria-busy="true"
            aria-label="Cargando documentos"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white/70 rounded-2xl h-56 shadow-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <div
                  key={doc.type}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all sm:hover:scale-105"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-foreground">
                          {doc.title}
                        </h3>
                        <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                          {doc.latest.year}
                        </span>
                      </div>
                      {doc.description && (
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                          {doc.description}
                        </p>
                      )}
                      <a
                        href={doc.latest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`Ver ${doc.title} ${doc.latest.year}`}
                      >
                        <FileText className="w-5 h-5" aria-hidden="true" />
                        <span className="text-base font-medium">
                          Ver documento
                        </span>
                      </a>
                      {doc.previous.length > 0 && (
                        <p className="mt-4 text-base text-muted-foreground">
                          <span>Años anteriores: </span>
                          {doc.previous.map((version, index) => (
                            <span key={version.year}>
                              {index > 0 && <span aria-hidden="true"> · </span>}
                              <a
                                href={version.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-medium underline underline-offset-4 hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary rounded"
                                aria-label={`Ver ${doc.title} ${version.year}`}
                              >
                                {version.year}
                              </a>
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
