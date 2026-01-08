import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  year: number;
  coverImagePath: string;
}

interface MobileArtifactListProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

const bookColors = [
  'from-red-900 to-red-950',
  'from-emerald-900 to-emerald-950',
  'from-blue-900 to-blue-950',
  'from-amber-900 to-amber-950',
  'from-purple-900 to-purple-950',
  'from-slate-800 to-slate-900',
  'from-stone-900 to-stone-950',
  'from-indigo-900 to-indigo-950',
];

const MobileArtifactList = ({ books, onBookClick }: MobileArtifactListProps) => {
  return (
    <div className="space-y-4 px-4">
      {books.map((book, index) => (
        <motion.button
          key={book.id}
          onClick={() => onBookClick(book)}
          className="w-full text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className={`
              relative p-4 rounded-xl glass-dark overflow-hidden
              border border-gold/20 hover:border-gold/40 transition-colors
            `}
            whileHover={{ scale: 1.02, x: 10 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient accent */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${bookColors[index % bookColors.length]}`}
            />

            <div className="flex items-center gap-4 pl-4">
              {/* Book icon container */}
              <div
                className={`
                  w-14 h-20 rounded-lg flex items-center justify-center overflow-hidden
                  bg-gradient-to-b ${bookColors[index % bookColors.length]}
                `}
                style={{
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }}
              >
                <img src={book.coverImagePath} alt={book.title} className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-decorative text-gold text-sm">Tomo {book.id}</span>
                  <Sparkles className="w-3 h-3 text-gold/60" />
                </div>
                <h3 className="font-cinzel text-parchment text-sm leading-tight">
                  {book.title}
                </h3>
                <p className="text-muted-foreground text-xs mt-1">{book.year}</p>
              </div>

              {/* Arrow indicator */}
              <motion.div
                className="text-gold/60"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, hsla(43, 80%, 55%, 0.1), transparent)',
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};

export default MobileArtifactList;
