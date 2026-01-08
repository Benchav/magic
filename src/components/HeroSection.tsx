import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onLumos: () => void;
  lumosActive: boolean;
}

const HeroSection = ({ onLumos, lumosActive }: HeroSectionProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background magical glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: lumosActive ? 1 : 0,
          background: lumosActive 
            ? 'radial-gradient(circle at 50% 50%, hsla(43, 74%, 53%, 0.15) 0%, transparent 60%)'
            : 'transparent'
        }}
        transition={{ duration: 1.5 }}
      />

      <div className="container mx-auto px-4 text-center z-10">
        {/* Decorative top element */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-cinzel text-gold/80 tracking-[0.3em] uppercase text-sm md:text-base mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Bienvenido a los
        </motion.p>

        {/* Main Title */}
        <motion.h1
          className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-parchment mb-4"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring' }}
        >
          <span className="block">The Wizarding</span>
          <motion.span 
            className="block text-gold text-glow-gold"
            animate={lumosActive ? { 
              textShadow: [
                '0 0 20px hsla(43, 74%, 53%, 0.5)',
                '0 0 60px hsla(43, 74%, 53%, 0.8)',
                '0 0 20px hsla(43, 74%, 53%, 0.5)',
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Archives
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-parchment-dark text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Una colección mágica de grimorios y textos arcanos del mundo mágico. 
          Descubre los secretos que yacen entre sus páginas encantadas.
        </motion.p>

        {/* Lumos Button */}
        <motion.button
          onClick={onLumos}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`
            relative group btn-magical px-12 py-5 rounded-2xl
            bg-gradient-to-r from-gold-dark via-gold to-gold-dark
            text-midnight text-lg
            border-2 border-gold-light/30
            ${lumosActive ? 'animate-lumos' : ''}
          `}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 40px hsla(43, 74%, 53%, 0.5), 0 0 80px hsla(43, 74%, 53%, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gold/30 blur-xl"
            animate={{
              opacity: isHovering || lumosActive ? 0.8 : 0.3,
              scale: isHovering || lumosActive ? 1.2 : 1,
            }}
            transition={{ duration: 0.4 }}
          />
          
          <span className="relative flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            <span className="font-cinzel tracking-wider">
              {lumosActive ? 'Nox' : 'Lumos'}
            </span>
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 0.8 },
            y: { delay: 1.5, duration: 2, repeat: Infinity }
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gold/40 flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-gold"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
