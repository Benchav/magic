import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

const PdfReader = () => {
  const [searchParams] = useSearchParams();

  const src = searchParams.get("src") || "";
  const title = searchParams.get("title") || "Documento";

  const pdfSrc = useMemo(() => {
    // Only allow local PDFs under /books to avoid arbitrary URL injection.
    if (!src.startsWith("/books/") || !src.toLowerCase().endsWith(".pdf")) return "";
    return src;
  }, [src]);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <header className="sticky top-0 z-20 border-b border-gold/10 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="min-w-0">
            <div className="font-cinzel text-sm text-gold/80">Lectura</div>
            <div className="truncate font-cinzel text-base text-parchment">{title}</div>
          </div>
          <div className="flex items-center gap-3">
            {pdfSrc ? (
              <a
                href={pdfSrc}
                className="font-cinzel text-sm text-gold/90 hover:text-gold"
                download
              >
                Descargar
              </a>
            ) : null}
            <Link
              to="/"
              className="rounded-md border border-gold/20 px-3 py-1.5 font-cinzel text-sm text-parchment hover:border-gold/40"
            >
              Volver
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4">
        {pdfSrc ? (
          <div className="overflow-hidden rounded-xl border border-gold/10 bg-black/20">
            <iframe
              title={title}
              src={pdfSrc}
              className="h-[80vh] w-full"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-gold/10 bg-black/20 p-6">
            <p className="font-body text-parchment-aged">
              No se pudo abrir este PDF. Usa el botón de descargar desde la colección.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PdfReader;
