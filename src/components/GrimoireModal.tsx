import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  year: number;
  pdfPath: string;
  downloadUrl: string;
  coverImagePath: string;
}

interface GrimoireModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const GrimoireModal = ({ book, isOpen, onClose }: GrimoireModalProps) => {
  if (!book) return null;

  const navigate = useNavigate();

  const handleRead = () => {
    const params = new URLSearchParams({
      src: book.pdfPath,
      title: book.title,
      returnTo: `/?book=${book.id}`,
    });
    navigate(`/read?${params.toString()}`);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = book.downloadUrl || book.pdfPath;
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Magical dark backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            style={{
              background: `
                radial-gradient(ellipse at center, 
                  hsla(225, 50%, 5%, 0.95) 0%,
                  hsla(225, 50%, 2%, 0.98) 100%
                )
              `,
            }}
          >
            {/* Magical particles in backdrop */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0
                    ? 'hsla(43, 80%, 55%, 0.8)'
                    : i % 3 === 1
                      ? 'hsla(280, 60%, 60%, 0.6)'
                      : 'hsla(200, 70%, 60%, 0.5)',
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
              />
            ))}
          </motion.div>

          {/* The Grimoire */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-5xl pointer-events-auto"
              initial={{
                scale: 0.3,
                rotateY: -90,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                rotateY: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0.3,
                rotateY: 90,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: 1,
              }}
              style={{ perspective: '2000px' }}
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="z-50 p-3 rounded-full glass-dark text-parchment hover:text-gold transition-colors fixed top-4 right-4 md:absolute md:-top-4 md:-right-4"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  boxShadow: '0 0 20px hsla(43, 80%, 55%, 0.3)',
                }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Open book container */}
              <div
                className="relative flex flex-col md:flex-row rounded-xl overflow-hidden max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible scrollbar-hide"
                style={{
                  background: `
                    linear-gradient(135deg,
                      hsl(22, 45%, 12%) 0%,
                      hsl(20, 50%, 10%) 50%,
                      hsl(22, 45%, 8%) 100%
                    )
                  `,
                  boxShadow: `
                    0 0 100px hsla(43, 80%, 55%, 0.2),
                    0 30px 80px hsla(0, 0%, 0%, 0.8),
                    inset 0 0 100px hsla(0, 0%, 0%, 0.5)
                  `,
                  border: '2px solid hsla(43, 80%, 55%, 0.2)',
                }}
              >
                {/* Decorative corner flourishes */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                  <div
                    key={corner}
                    className={`absolute w-16 h-16 pointer-events-none ${corner.includes('top') ? 'top-2' : 'bottom-2'
                      } ${corner.includes('left') ? 'left-2' : 'right-2'}`}
                    style={{
                      borderTop: corner.includes('top') ? '2px solid hsla(43, 80%, 55%, 0.4)' : 'none',
                      borderBottom: corner.includes('bottom') ? '2px solid hsla(43, 80%, 55%, 0.4)' : 'none',
                      borderLeft: corner.includes('left') ? '2px solid hsla(43, 80%, 55%, 0.4)' : 'none',
                      borderRight: corner.includes('right') ? '2px solid hsla(43, 80%, 55%, 0.4)' : 'none',
                      borderRadius: corner.includes('top')
                        ? corner.includes('left') ? '8px 0 0 0' : '0 8px 0 0'
                        : corner.includes('left') ? '0 0 0 8px' : '0 0 8px 0',
                    }}
                  />
                ))}

                {/* Left page - Book cover art */}
                <motion.div
                  className="flex-1 p-8 md:p-12 flex items-center justify-center"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  style={{
                    background: `
                      linear-gradient(90deg,
                        hsla(40, 30%, 90%, 0.03) 0%,
                        transparent 100%
                      )
                    `,
                  }}
                >
                  <motion.div
                    className="relative w-48 md:w-64 h-72 md:h-96 rounded-lg leather-cover"
                    animate={{
                      boxShadow: [
                        '0 0 30px hsla(43, 80%, 55%, 0.3), 0 20px 50px rgba(0,0,0,0.5)',
                        '0 0 50px hsla(43, 80%, 55%, 0.5), 0 20px 50px rgba(0,0,0,0.5)',
                        '0 0 30px hsla(43, 80%, 55%, 0.3), 0 20px 50px rgba(0,0,0,0.5)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {/* Cover Image */}
                    <img
                      src={book.coverImagePath}
                      alt={book.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />

                    {/* Book cover decorations */}
                    <div className="absolute inset-4 border-2 border-gold/30 rounded-lg" />
                    <div className="absolute inset-8 border border-gold/20 rounded-lg" />

                    {/* Center emblem */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-24 h-24 rounded-full flex items-center justify-center"
                        style={{
                          background: 'radial-gradient(circle, hsla(43, 80%, 55%, 0.2) 0%, transparent 70%)',
                          border: '2px solid hsla(43, 80%, 55%, 0.5)',
                        }}
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <BookOpen className="w-10 h-10 text-gold" />
                      </motion.div>
                    </div>

                    {/* Floating sparkles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-gold" />
                      </motion.div>
                    ))}

                    {/* Book number */}
                    <div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-decorative text-xl text-gold"
                      style={{
                        background: 'hsla(0,0%,0%,0.5)',
                        border: '1px solid hsla(43, 80%, 55%, 0.4)',
                      }}
                    >
                      {book.id}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Center spine */}
                <div
                  className="hidden md:block w-4 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
                  style={{
                    boxShadow: 'inset 0 0 20px hsla(0,0%,0%,0.5)',
                  }}
                />

                {/* Right page - Content */}
                <motion.div
                  className="flex-1 p-8 md:p-12 flex flex-col justify-center"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  style={{
                    background: `
                      radial-gradient(ellipse at 80% 20%,
                        hsla(40, 30%, 95%, 0.05) 0%,
                        transparent 50%
                      )
                    `,
                  }}
                >
                  {/* Year badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit mb-6"
                    style={{
                      background: 'hsla(43, 80%, 55%, 0.1)',
                      border: '1px solid hsla(43, 80%, 55%, 0.3)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                  >
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="font-cinzel text-gold text-sm">{book.year}</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="font-decorative text-3xl md:text-4xl lg:text-5xl text-parchment mb-4 leading-tight text-glow-gold"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {book.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    className="font-body text-lg text-parchment-aged mb-10 leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Adéntrate en las páginas de este antiguo grimorio. Los secretos del
                    mundo mágico te esperan, escritos con tinta encantada que sólo revela
                    su verdad a quienes son dignos de su conocimiento.
                  </motion.p>

                  {/* Action buttons */}
                  <motion.div
                    className="flex flex-wrap gap-6 items-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {/* Read button - Runic style */}
                    <motion.button
                      onClick={handleRead}
                      className="relative runic-glow px-8 py-4 rounded-xl font-decorative text-lg tracking-wider"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--gold-dim)), hsl(var(--gold)), hsl(var(--gold-dim)))',
                        color: 'hsl(var(--night-deep))',
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 40px hsla(43, 80%, 55%, 0.5)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <BookOpen className="w-5 h-5" />
                        Playera del Conocimiento
                      </span>
                    </motion.button>

                    {/* Download button - Wax seal */}
                    <motion.button
                      onClick={handleDownload}
                      className="relative wax-seal-btn w-20 h-20 rounded-full flex flex-col items-center justify-center gap-1"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-6 h-6 text-parchment relative z-10" />
                      <span className="text-[10px] font-cinzel text-parchment/80 relative z-10">
                        TOMO
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Hint text */}
                  <motion.p
                    className="mt-6 text-sm text-muted-foreground font-body italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Presiona el sello para materializar el tomo
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GrimoireModal;
