import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  year: number;
  pdfPath: string;
  coverImagePath: string;
}

interface MagicBookProps {
  book: Book;
  index: number;
  onClick: () => void;
}

const bookColors = [
  { spine: 'from-red-900 via-red-800 to-red-950', accent: 'gold' },
  { spine: 'from-emerald-900 via-emerald-800 to-emerald-950', accent: 'gold' },
  { spine: 'from-blue-900 via-blue-800 to-blue-950', accent: 'gold' },
  { spine: 'from-amber-900 via-amber-800 to-amber-950', accent: 'gold' },
  { spine: 'from-purple-900 via-purple-800 to-purple-950', accent: 'gold' },
  { spine: 'from-slate-800 via-slate-700 to-slate-900', accent: 'gold' },
  { spine: 'from-stone-900 via-stone-800 to-stone-950', accent: 'gold' },
  { spine: 'from-indigo-900 via-indigo-800 to-indigo-950', accent: 'gold' },
];

const MagicBook = ({ book, index, onClick }: MagicBookProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleId = useRef(0);

  const colors = bookColors[index % bookColors.length];

  // 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['25deg', '-25deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-25deg', '25deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);

    // Spawn particles
    if (isHovered && Math.random() > 0.7) {
      const newParticle = {
        id: particleId.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setParticles(prev => [...prev.slice(-10), newParticle]);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setParticles([]);
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
    >
      {/* Magical particles on hover */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none z-20"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 1,
            opacity: 1
          }}
          animate={{
            y: particle.y - 60,
            scale: 0,
            opacity: 0
          }}
          transition={{ duration: 1 }}
          style={{ left: 0, top: 0 }}
        >
          <Sparkles className="w-4 h-4 text-gold" />
        </motion.div>
      ))}

      <motion.div
        className="relative preserve-3d"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isHovered ? -30 : [0, -5, 0],
          z: isHovered ? 50 : 0,
          rotateZ: isHovered ? 0 : [0, 1, 0, -1, 0],
        }}
        transition={{
          y: isHovered
            ? { type: 'spring', stiffness: 200, damping: 20 }
            : { duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {/* Book glow effect */}
        <motion.div
          className="absolute -inset-4 rounded-xl pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(circle, hsla(43, 80%, 55%, 0.4) 0%, hsla(280, 60%, 45%, 0.2) 50%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
        />

        {/* The book */}
        <div
          className={`
            relative w-24 md:w-32 h-36 md:h-48 rounded-r-lg rounded-l-sm
            bg-gradient-to-b ${colors.spine}
            shadow-[0_15px_40px_rgba(0,0,0,0.5)]
            transform-gpu
          `}
          style={{
            transformStyle: 'preserve-3d',
            backgroundImage: `url(${book.coverImagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: isHovered
              ? '0 20px 60px rgba(0,0,0,0.7), 0 0 40px hsla(43, 80%, 55%, 0.3)'
              : '0 15px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Spine leather texture */}
          <div className="absolute inset-0 opacity-30 rounded-r-lg rounded-l-sm"
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  hsla(0,0%,0%,0.1) 1px,
                  transparent 2px,
                  transparent 4px
                )
              `,
            }}
          />

          {/* Gold decorative lines */}
          <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gold-dim via-gold to-gold-dim opacity-60" />
          <div className="absolute right-3 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gold-dim via-gold to-gold-dim opacity-60" />

          {/* Top and bottom gold bands */}
          <div className="absolute top-3 left-1 right-2 h-0.5 bg-gradient-to-r from-gold-dim via-gold to-gold-dim opacity-50" />
          <div className="absolute bottom-3 left-1 right-2 h-0.5 bg-gradient-to-r from-gold-dim via-gold to-gold-dim opacity-50" />

          {/* Center emblem */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, hsla(43, 80%, 55%, 0.3) 0%, transparent 70%)`,
                border: '1px solid hsla(43, 80%, 55%, 0.4)',
              }}
              animate={isHovered ? {
                boxShadow: [
                  '0 0 20px hsla(43, 80%, 55%, 0.3)',
                  '0 0 40px hsla(43, 80%, 55%, 0.6)',
                  '0 0 20px hsla(43, 80%, 55%, 0.3)',
                ],
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-gold opacity-80" />
            </motion.div>
          </div>

          {/* Book pages edge */}
          <div
            className="absolute -right-1 top-1 bottom-1 w-2 rounded-r-sm"
            style={{
              background: `linear-gradient(90deg,
                hsl(40, 30%, 85%) 0%,
                hsl(40, 25%, 90%) 30%,
                hsl(40, 30%, 80%) 100%
              )`,
              boxShadow: 'inset -2px 0 4px hsla(0,0%,0%,0.2)',
            }}
          />

          {/* 3D side effect */}
          <div
            className="absolute -left-2 top-0 bottom-0 w-2"
            style={{
              background: `linear-gradient(90deg,
                hsla(0,0%,0%,0.4) 0%,
                transparent 100%
              )`,
              transform: 'rotateY(-90deg) translateX(-4px)',
              transformOrigin: 'right',
            }}
          />

          {/* Book opening effect on hover */}
          <motion.div
            className="absolute -right-4 top-1 bottom-1 origin-left"
            animate={{
              rotateY: isHovered ? -30 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{
              width: '80%',
              background: `linear-gradient(90deg,
                hsl(40, 30%, 90%) 0%,
                hsl(40, 25%, 95%) 100%
              )`,
              borderRadius: '0 4px 4px 0',
              boxShadow: '-2px 0 10px hsla(0,0%,0%,0.3)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Faint text lines */}
            <div className="p-3 space-y-1.5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 rounded-full opacity-20"
                  style={{
                    width: `${60 + Math.random() * 30}%`,
                    background: 'hsl(220, 20%, 30%)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Book number badge */}
        <motion.div
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-cinzel text-sm font-bold z-10"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-dim)) 100%)',
            color: 'hsl(var(--night-deep))',
            boxShadow: '0 4px 15px hsla(43, 80%, 55%, 0.4)',
          }}
          animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
        >
          {book.id}
        </motion.div>
      </motion.div>

      {/* Title below */}
      <motion.p
        className="mt-4 text-center font-cinzel text-xs md:text-sm text-parchment-aged max-w-28 md:max-w-32 mx-auto leading-tight"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        {book.title.replace('Harry Potter y ', '')}
      </motion.p>
    </motion.div>
  );
};

export default MagicBook;
