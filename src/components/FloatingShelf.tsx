import { motion } from 'framer-motion';
import MagicBook from './MagicBook';

interface Book {
  id: number;
  title: string;
  year: number;
}

interface FloatingShelfProps {
  books: Book[];
  shelfIndex: number;
  onBookClick: (book: Book) => void;
}

const FloatingShelf = ({ books, shelfIndex, onBookClick }: FloatingShelfProps) => {
  const isEven = shelfIndex % 2 === 0;

  return (
    <motion.div
      className="relative mx-auto max-w-5xl"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1.2, 
        delay: shelfIndex * 0.3,
        type: 'spring',
        stiffness: 50,
      }}
    >
      {/* Brass chains */}
      <div className="absolute -top-32 left-8 w-3 h-36 flex flex-col items-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="brass-chain w-3 h-4 rounded-full mb-0.5"
            style={{
              boxShadow: 'inset 0 1px 2px hsla(0,0%,100%,0.3), 0 2px 4px hsla(0,0%,0%,0.5)',
            }}
            animate={{
              rotateZ: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      <div className="absolute -top-32 right-8 w-3 h-36 flex flex-col items-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="brass-chain w-3 h-4 rounded-full mb-0.5"
            style={{
              boxShadow: 'inset 0 1px 2px hsla(0,0%,100%,0.3), 0 2px 4px hsla(0,0%,0%,0.5)',
            }}
            animate={{
              rotateZ: [0, -1, 0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* The wooden shelf */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -4, 0, -2, 0],
          rotateZ: isEven ? [0, 0.3, 0, -0.3, 0] : [0, -0.3, 0, 0.3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Shelf top surface */}
        <div 
          className="wood-texture h-6 rounded-t-lg relative"
          style={{
            boxShadow: `
              inset 0 2px 4px hsla(0,0%,100%,0.1),
              0 4px 20px hsla(0,0%,0%,0.5)
            `,
          }}
        >
          {/* Gold trim */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-dim to-transparent opacity-40" />
        </div>

        {/* Books container */}
        <div 
          className="wood-texture py-8 px-4 md:px-8"
          style={{
            boxShadow: 'inset 0 -4px 8px hsla(0,0%,0%,0.3)',
          }}
        >
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {books.map((book, bookIndex) => (
              <MagicBook
                key={book.id}
                book={book}
                index={bookIndex}
                onClick={() => onBookClick(book)}
              />
            ))}
          </div>
        </div>

        {/* Shelf bottom edge */}
        <div 
          className="wood-texture h-4 rounded-b-lg"
          style={{
            boxShadow: `
              0 8px 30px hsla(0,0%,0%,0.6),
              inset 0 -2px 4px hsla(0,0%,0%,0.4)
            `,
          }}
        >
          {/* Gold trim */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gold-dim to-transparent opacity-30" />
        </div>

        {/* Decorative brass brackets */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-20 brass-chain rounded-full opacity-60" 
          style={{ boxShadow: '2px 0 10px hsla(0,0%,0%,0.5)' }}
        />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-20 brass-chain rounded-full opacity-60"
          style={{ boxShadow: '-2px 0 10px hsla(0,0%,0%,0.5)' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FloatingShelf;
