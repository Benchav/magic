import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

const PdfReader = () => {
  const [searchParams] = useSearchParams();

  const src = searchParams.get("src") || "";
  const title = searchParams.get("title") || "Documento";

  const isLocalPdf = (value: string) => value.startsWith("/books/") && value.toLowerCase().endsWith(".pdf");

  const extractDriveFileId = (input: string): string | null => {
    try {
      const url = new URL(input);
      if (url.protocol !== "https:") return null;
      if (url.hostname !== "drive.google.com") return null;

      const match = url.pathname.match(/^\/file\/d\/([^/]+)\//);
      if (match?.[1]) return match[1];

      const id = url.searchParams.get("id");
      if (id) return id;

      return null;
    } catch {
      return null;
    }
  };

  const readUrl = useMemo(() => {
    if (!src) return "";
    if (isLocalPdf(src)) return src;
    const id = extractDriveFileId(src);
    if (!id) return "";
    return `https://drive.google.com/file/d/${id}/preview`;
  }, [src]);

  const downloadUrl = useMemo(() => {
    if (!src) return "";
    if (isLocalPdf(src)) return src;
    const id = extractDriveFileId(src);
    if (!id) return "";
    return `https://drive.google.com/uc?export=download&id=${id}`;
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
            {readUrl ? (
              <a
                href={readUrl}
                className="font-cinzel text-sm text-gold/90 hover:text-gold"
                target="_blank"
                rel="noreferrer"
              >
                Abrir
              </a>
            ) : null}
            {downloadUrl ? (
              <a
                href={downloadUrl}
                className="font-cinzel text-sm text-gold/90 hover:text-gold"
                target="_blank"
                rel="noreferrer"
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
        {readUrl ? (
          <div className="overflow-hidden rounded-xl border border-gold/10 bg-black/20">
            <iframe
              title={title}
              src={readUrl}
              className="h-[80vh] w-full"
              allow="fullscreen"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-gold/10 bg-black/20 p-6">
            <p className="font-body text-parchment-aged">
              No se pudo abrir este PDF desde aquí. Usa “Abrir” o “Descargar”.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PdfReader;
