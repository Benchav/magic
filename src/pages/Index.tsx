import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, BookOpen } from 'lucide-react';
import MagicCursor from '@/components/MagicCursor';
import FloatingShelf from '@/components/FloatingShelf';
import GrimoireModal from '@/components/GrimoireModal';
import LumosEntrance from '@/components/LumosEntrance';

interface Book {
  id: number;
  title: string;
  year: number;
  pdfPath: string;
  downloadUrl: string;
  coverImagePath: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Harry Potter y la piedra filosofal",
    year: 1997,
    pdfPath: "https://drive.google.com/file/d/1TMRvdpJhlgkLIaflryYcc2D480J-hm8U/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1TMRvdpJhlgkLIaflryYcc2D480J-hm8U",
    coverImagePath: "/ports/hp1.jpg"
  },
  {
    id: 2,
    title: "Harry Potter y la cámara secreta",
    year: 1998,
    pdfPath: "https://drive.google.com/file/d/12jZqF731zCe1MxMXGJ1xxIFGBawZLJM1/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=12jZqF731zCe1MxMXGJ1xxIFGBawZLJM1",
    coverImagePath: "/ports/hp2.jpg"
  },
  {
    id: 3,
    title: "Harry Potter y el prisionero de Azkaban",
    year: 1999,
    pdfPath: "https://drive.google.com/file/d/1TUS0nqJ14FrsVwOqT3_rDk8lCqpgL5go/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1TUS0nqJ14FrsVwOqT3_rDk8lCqpgL5go",
    coverImagePath: "/ports/hp3.jpg"
  },
  {
    id: 4,
    title: "Harry Potter y el cáliz de fuego",
    year: 2000,
    pdfPath: "https://drive.google.com/file/d/1fD7t9bxF2RHvm7PTsQEUvViqjjEKfVp1/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1fD7t9bxF2RHvm7PTsQEUvViqjjEKfVp1",
    coverImagePath: "/ports/hp4.jpg"
  },
  {
    id: 5,
    title: "Harry Potter y la orden del fénix",
    year: 2003,
    pdfPath: "https://drive.google.com/file/d/1nyP2cKgYLTtTOu5GHDEVBEyFXExZxAxN/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1nyP2cKgYLTtTOu5GHDEVBEyFXExZxAxN",
    coverImagePath: "/ports/hp5.jpg"
  },
  {
    id: 6,
    title: "Harry Potter y el misterio del príncipe",
    year: 2005,
    pdfPath: "https://drive.google.com/file/d/1ZduVvXaGJPQD7xnAKiOwTTjQKsJnKmjO/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1ZduVvXaGJPQD7xnAKiOwTTjQKsJnKmjO",
    coverImagePath: "/ports/hp6.jpg"
  },
  {
    id: 7,
    title: "Harry Potter y las reliquias de la muerte",
    year: 2007,
    pdfPath: "https://drive.google.com/file/d/1rQ4HG5kBDX2v0ss6Y1jfIPUKliFmj57v/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1rQ4HG5kBDX2v0ss6Y1jfIPUKliFmj57v",
    coverImagePath: "/ports/hp7.jpg"
  },
  {
    id: 8,
    title: "Harry Potter y el legado maldito",
    year: 2016,
    pdfPath: "https://drive.google.com/file/d/1lO6JK2hmw1e3anEjXCYRq69w0x7XozSP/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1lO6JK2hmw1e3anEjXCYRq69w0x7XozSP",
    coverImagePath: "/ports/hp8.jpg"
  },
];

const Index = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEntranceComplete = () => {
    setIsRevealed(true);
    setTimeout(() => setContentVisible(true), 500);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 500);
  };

  // Split books into two shelves
  const shelf1Books = books.slice(0, 4);
  const shelf2Books = books.slice(4, 8);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Lumos entrance animation */}
      <LumosEntrance isRevealed={isRevealed} onComplete={handleEntranceComplete} />

      {/* Magic wand cursor (desktop only) */}
      {!isMobile && <MagicCursor />}

      {/* Main content */}
      <AnimatePresence>
        {contentVisible && (
          <motion.main
            className="relative z-10 min-h-screen bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Header area */}
            <header className="pt-8 md:pt-16 pb-8 text-center px-4">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Decorative line */}
                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="w-16 md:w-32 h-px bg-gradient-to-r from-transparent to-gold/60" />
                  <Wand2 className="w-5 h-5 text-gold animate-pulse" />
                  <div className="w-16 md:w-32 h-px bg-gradient-to-l from-transparent to-gold/60" />
                </div>

                {/* Title */}
                <h1 className="font-decorative text-4xl md:text-6xl lg:text-7xl text-parchment mb-3 text-glow-gold">
                  The Hogwarts
                </h1>
                <h2 className="font-decorative text-2xl md:text-4xl lg:text-5xl text-gold mb-6">
                  Restricted Archive
                </h2>

                {/* Subtitle */}
                <motion.p
                  className="font-body text-lg md:text-xl text-parchment-aged max-w-2xl mx-auto italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  "El conocimiento es el arma más poderosa que un mago puede poseer"
                </motion.p>

                {/* Decorative bottom line */}
                <motion.div
                  className="mt-8 flex justify-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="w-48 md:w-96 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                </motion.div>
              </motion.div>
            </header>

            {/* The Library */}
            <section className="py-12 md:py-24">
              {/* Section header */}
              <motion.div
                className="text-center mb-12 md:mb-20 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex justify-center items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-gold/70" />
                  <span className="font-cinzel text-gold/80 tracking-[0.3em] uppercase text-sm">
                    Los Tomos Sagrados
                  </span>
                  <BookOpen className="w-6 h-6 text-gold/70" />
                </div>
                <h3 className="font-decorative text-2xl md:text-3xl text-parchment">
                  La Colección Prohibida
                </h3>
              </motion.div>

              {/* Floating Shelves (Responsive) */}
              <div className="space-y-32 md:space-y-48 pb-32">
                <FloatingShelf
                  books={shelf1Books}
                  shelfIndex={0}
                  onBookClick={handleBookClick}
                />
                <FloatingShelf
                  books={shelf2Books}
                  shelfIndex={1}
                  onBookClick={handleBookClick}
                />
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center border-t border-gold/10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="font-cinzel text-gold/60 text-sm mb-2">
                  The Hogwarts Restricted Archive
                </p>
                <p className="font-body text-muted-foreground text-xs italic">
                  "Draco dormiens nunquam titillandus"
                </p>
              </motion.div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Grimoire Modal */}
      <GrimoireModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
