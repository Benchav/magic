import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfReader = () => {
  const [searchParams] = useSearchParams();

  const src = searchParams.get("src") || "";
  const title = searchParams.get("title") || "Documento";

  const pdfSrc = useMemo(() => {
    // Only allow local PDFs under /books to avoid arbitrary URL injection.
    if (!src.startsWith("/books/") || !src.toLowerCase().endsWith(".pdf")) return "";
    return src;
  }, [src]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(900);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loadError, setLoadError] = useState<string>("");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const next = Math.max(320, Math.floor(el.clientWidth));
      setContainerWidth(next);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setPageNumber(1);
    setNumPages(0);
    setLoadError("");
  }, [pdfSrc]);

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
              <>
                <a
                  href={pdfSrc}
                  className="font-cinzel text-sm text-gold/90 hover:text-gold"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir
                </a>
                <a
                  href={pdfSrc}
                  className="font-cinzel text-sm text-gold/90 hover:text-gold"
                  download
                >
                  Descargar
                </a>
              </>
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
            <div className="flex items-center justify-between gap-3 border-b border-gold/10 px-3 py-2">
              <div className="font-cinzel text-sm text-parchment-aged">
                {numPages ? `Página ${pageNumber} de ${numPages}` : "Cargando..."}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border border-gold/20 px-3 py-1.5 font-cinzel text-sm text-parchment disabled:opacity-40"
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  disabled={!numPages || pageNumber <= 1}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="rounded-md border border-gold/20 px-3 py-1.5 font-cinzel text-sm text-parchment disabled:opacity-40"
                  onClick={() => setPageNumber((p) => Math.min(numPages || p + 1, p + 1))}
                  disabled={!numPages || pageNumber >= numPages}
                >
                  Siguiente
                </button>
              </div>
            </div>

            <div ref={containerRef} className="flex justify-center p-3">
              <Document
                file={pdfSrc}
                loading={<div className="font-body text-parchment-aged">Cargando PDF...</div>}
                error={
                  <div className="font-body text-parchment-aged">
                    No se pudo renderizar el PDF aquí. Usa “Abrir” o “Descargar”.
                    {loadError ? (
                      <div className="mt-3 whitespace-pre-wrap text-xs text-parchment-aged/80">
                        {loadError}
                      </div>
                    ) : null}
                  </div>
                }
                onLoadError={(err) => {
                  setLoadError(String(err?.message || err));
                }}
                onSourceError={(err) => {
                  setLoadError(String(err?.message || err));
                }}
                onLoadSuccess={(info) => {
                  setNumPages(info.numPages);
                  setPageNumber(1);
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  width={Math.min(1000, containerWidth)}
                  renderAnnotationLayer
                  renderTextLayer
                />
              </Document>
            </div>
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
