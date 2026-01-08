import { motion } from 'framer-motion';
import BookCard from './BookCard';

interface Book {
  id: number;
  title: string;
  year: number;
  cover: string;
  house: 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';
}

interface BookGridProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

const BookGrid = ({ books, onBookClick }: BookGridProps) => {
  return (
    <section className="relative py-24 px-4">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-4 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold" />
          <span className="font-cinzel text-gold tracking-[0.2em] uppercase text-sm">
            Colección
          </span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        <h2 className="font-cinzel text-4xl md:text-5xl text-parchment mb-4">
          La Biblioteca
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Ocho tomos de magia y aventura que han cautivado a generaciones de magos y brujas.
        </p>
      </motion.div>

      {/* Book Grid */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {books.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              index={index}
              onClick={() => onBookClick(book)}
            />
          ))}
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight-deep to-transparent pointer-events-none" />
    </section>
  );
};

export default BookGrid;
