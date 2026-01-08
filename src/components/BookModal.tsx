import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, Sparkles } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  year: number;
  cover: string;
  house: 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';
}

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const houseColors = {
  gryffindor: 'from-red-800 via-yellow-600 to-red-900',
  slytherin: 'from-emerald-800 via-emerald-600 to-emerald-900',
  ravenclaw: 'from-blue-800 via-blue-500 to-blue-900',
  hufflepuff: 'from-yellow-700 via-yellow-500 to-yellow-800',
};

const houseNames = {
  gryffindor: 'Gryffindor',
  slytherin: 'Slytherin',
  ravenclaw: 'Ravenclaw',
  hufflepuff: 'Hufflepuff',
};

const BookModal = ({ book, isOpen, onClose }: BookModalProps) => {
  if (!book) return null;

  const handleDownload = () => {
    // Simulate download - in real app, this would trigger actual file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${book.title}.pdf`;
    // For demo purposes, we'll just show an alert
    alert(`Descargando: ${book.title}`);
  };

  const handleRead = () => {
    // In real app, this would open a PDF viewer
    alert(`Abriendo visor de PDF para: ${book.title}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-midnight-deep/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl pointer-events-auto"
              initial={{ 
                scale: 0.8, 
                opacity: 0, 
                rotateX: 15,
                y: 50 
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotateX: 0,
                y: 0 
              }}
              exit={{ 
                scale: 0.8, 
                opacity: 0, 
                rotateX: -15,
                y: 50 
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 25 
              }}
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-muted/50 text-parchment hover:bg-muted hover:text-gold transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Book Cover */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={`
                    relative aspect-[2/3] rounded-2xl overflow-hidden
                    bg-gradient-to-br ${houseColors[book.house]}
                    shadow-levitate
                  `}>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-4 border-2 border-gold rounded-xl" />
                      <div className="absolute inset-8 border border-gold/50 rounded-xl" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-gold/40 rounded-full" />
                    </div>

                    {/* Center emblem */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-28 h-28 rounded-full bg-gold/20 backdrop-blur-md border-2 border-gold flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            '0 0 20px hsla(43, 74%, 53%, 0.3)',
                            '0 0 40px hsla(43, 74%, 53%, 0.6)',
                            '0 0 20px hsla(43, 74%, 53%, 0.3)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <BookOpen className="w-12 h-12 text-gold" />
                      </motion.div>
                    </div>

                    {/* Floating sparkles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2"
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
                          delay: i * 0.3,
                        }}
                      >
                        <Sparkles className="w-full h-full text-gold" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Book Details */}
                <motion.div
                  className="flex flex-col justify-center"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* House badge */}
                  <motion.div
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full 
                      bg-gradient-to-r ${houseColors[book.house]} 
                      w-fit mb-6
                    `}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span className="text-parchment font-cinzel text-sm">
                      {houseNames[book.house]}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="font-cinzel text-3xl md:text-4xl text-parchment mb-4 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {book.title}
                  </motion.h2>

                  {/* Year */}
                  <motion.p
                    className="text-muted-foreground mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Publicado en {book.year}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    className="text-parchment-dark leading-relaxed mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Adéntrate en las páginas de este grimorio mágico y descubre 
                    los secretos que han sido guardados por generaciones de magos. 
                    Cada capítulo revela nuevos encantamientos y aventuras.
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {/* Read Button */}
                    <motion.button
                      onClick={handleRead}
                      className="
                        flex-1 min-w-[180px] btn-magical
                        px-8 py-4 rounded-xl
                        bg-gradient-to-r from-gold-dark via-gold to-gold-dark
                        text-midnight text-lg
                        border-2 border-gold-light/30
                        flex items-center justify-center gap-3
                      "
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 0 30px hsla(43, 74%, 53%, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BookOpen className="w-5 h-5" />
                      <span className="font-cinzel tracking-wide">Leer Grimorio</span>
                    </motion.button>

                    {/* Download Button (Wax Seal Style) */}
                    <motion.button
                      onClick={handleDownload}
                      className="
                        wax-seal w-16 h-16 flex items-center justify-center
                        text-parchment hover:scale-110 transition-transform
                      "
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                      }}
                      whileTap={{ scale: 0.95 }}
                      title="Descargar"
                    >
                      <Download className="w-6 h-6 relative z-10" />
                    </motion.button>
                  </motion.div>

                  {/* Download text hint */}
                  <motion.p
                    className="text-muted-foreground text-sm mt-4 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <span>Presiona el sello para</span>
                    <span className="text-gold font-cinzel">Descargar</span>
                  </motion.p>
                </motion.div>
              </div>

              {/* Bottom decorative element */}
              <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookModal;
