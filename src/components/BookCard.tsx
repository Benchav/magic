import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  year: number;
  cover: string;
  house: 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';
}

interface BookCardProps {
  book: Book;
  index: number;
  onClick: () => void;
}

const houseColors = {
  gryffindor: 'from-red-800 via-yellow-600 to-red-900',
  slytherin: 'from-emerald-800 via-emerald-600 to-emerald-900',
  ravenclaw: 'from-blue-800 via-blue-500 to-blue-900',
  hufflepuff: 'from-yellow-700 via-yellow-500 to-yellow-800',
};

const BookCard = ({ book, index, onClick }: BookCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="perspective-1000 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="preserve-3d"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        animate={{
          y: isHovered ? -20 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className={`
          relative glass-card rounded-2xl overflow-hidden
          transition-all duration-500
          ${isHovered ? 'shadow-levitate' : 'shadow-card'}
        `}>
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle at 50% 0%, hsla(43, 74%, 53%, 0.3) 0%, transparent 60%)`,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Book Cover */}
          <div className="relative aspect-[2/3] overflow-hidden">
            {/* Gradient overlay based on house */}
            <div className={`absolute inset-0 bg-gradient-to-br ${houseColors[book.house]} opacity-90`} />
            
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-4 border-2 border-gold/50 rounded-lg" />
              <div className="absolute inset-8 border border-gold/30 rounded-lg" />
            </div>

            {/* Center emblem */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-gold/20 backdrop-blur-sm border-2 border-gold/50 flex items-center justify-center"
                animate={{
                  boxShadow: isHovered 
                    ? '0 0 30px hsla(43, 74%, 53%, 0.5)' 
                    : '0 0 10px hsla(43, 74%, 53%, 0.2)',
                }}
              >
                <BookOpen className="w-8 h-8 text-gold" />
              </motion.div>
            </div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-shimmer-gold bg-[length:200%_100%]"
              animate={{
                backgroundPosition: isHovered ? ['200% 0', '-200% 0'] : '200% 0',
              }}
              transition={{ duration: 1.5, ease: 'linear' }}
            />

            {/* Year badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-midnight/60 backdrop-blur-sm border border-gold/30">
              <span className="text-gold text-sm font-cinzel">{book.year}</span>
            </div>
          </div>

          {/* Book Info */}
          <div className="p-5">
            <h3 className="font-cinzel text-parchment text-lg leading-tight mb-2 line-clamp-2">
              {book.title}
            </h3>
            
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${houseColors[book.house]}`} />
              <span className="text-muted-foreground text-sm capitalize">
                {book.house}
              </span>
            </div>

            {/* Hover indicator */}
            <motion.div
              className="mt-4 flex items-center gap-2 text-gold text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 10 
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-cinzel">Ver Grimorio</span>
              <motion.span
                animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Bottom border glow */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookCard;
