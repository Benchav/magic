import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const HogwartsBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        size: Math.random() * 3 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 10 + 10,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      {/* LAYER 1: Your Local Image (magic.jpg) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url("/ports/magic.jpg")' }} 
      />

      {/* LAYER 2: The Dark Gradient (To make text readable) */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(5, 10, 20, 0.3) 0%, rgba(5, 10, 20, 0.8) 60%, #050a14 100%)' 
        }}
      />

      {/* LAYER 3: Simple Magic Particles (Optional but elegant) */}
      {!shouldReduceMotion ? (
        <div className="absolute inset-0 opacity-30">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-[1px] bg-yellow-200"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                top: p.top,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
