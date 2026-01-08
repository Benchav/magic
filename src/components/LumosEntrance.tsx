import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LumosEntranceProps {
  isRevealed: boolean;
  onComplete: () => void;
}

const LumosEntrance = ({ isRevealed, onComplete }: LumosEntranceProps) => {
  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: 'hsl(225, 50%, 2%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          {/* Central light burst */}
          <motion.div
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 50],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 3,
              times: [0, 0.3, 1],
              ease: 'easeOut',
            }}
            onAnimationComplete={onComplete}
          >
            <div 
              className="w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle,
                  hsla(45, 100%, 90%, 1) 0%,
                  hsla(43, 80%, 55%, 0.8) 30%,
                  hsla(43, 80%, 55%, 0.3) 60%,
                  transparent 100%
                )`,
                boxShadow: `
                  0 0 100px hsla(43, 80%, 55%, 1),
                  0 0 200px hsla(43, 80%, 55%, 0.8),
                  0 0 400px hsla(43, 80%, 55%, 0.5)
                `,
              }}
            />
          </motion.div>

          {/* "Lumos Maxima" text */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: 3,
              times: [0, 0.2, 0.6, 1],
            }}
          >
            <motion.h1
              className="font-decorative text-5xl md:text-7xl text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, hsl(45, 100%, 90%), hsl(43, 80%, 55%))',
              }}
              animate={{
                textShadow: [
                  '0 0 20px hsla(43, 80%, 55%, 0.5)',
                  '0 0 60px hsla(43, 80%, 55%, 1)',
                  '0 0 100px hsla(43, 80%, 55%, 0.8)',
                ],
              }}
              transition={{ duration: 2, repeat: 1 }}
            >
              Lumos Maxima
            </motion.h1>

            {/* Wand tip */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -bottom-8"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-gold" />
            </motion.div>
          </motion.div>

          {/* Radiating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 
                  ? 'hsla(43, 80%, 55%, 0.8)' 
                  : 'hsla(45, 100%, 80%, 1)',
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0, 
                opacity: 0 
              }}
              animate={{ 
                x: Math.cos((i / 20) * Math.PI * 2) * 500,
                y: Math.sin((i / 20) * Math.PI * 2) * 500,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 2,
                delay: 0.8,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LumosEntrance;
