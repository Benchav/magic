import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const MagicCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sparkleIdRef = useRef(0);
  const lastSparkleTime = useRef(0);

  const colors = [
    'hsla(43, 80%, 55%, 1)',   // Gold
    'hsla(45, 90%, 70%, 1)',   // Bright gold
    'hsla(280, 60%, 60%, 0.8)', // Purple aurora
    'hsla(200, 70%, 60%, 0.6)', // Blue aurora
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const now = Date.now();
      if (now - lastSparkleTime.current > 30) {
        lastSparkleTime.current = now;
        
        // Create sparkle
        const newSparkle: Sparkle = {
          id: sparkleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setSparkles(prev => [...prev.slice(-30), newSparkle]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Clean up old sparkles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setSparkles(prev => prev.slice(-20));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Sparkle trail */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ 
              x: sparkle.x, 
              y: sparkle.y, 
              scale: 1, 
              opacity: 1 
            }}
            animate={{ 
              y: sparkle.y - 30,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: 0,
              top: 0,
              width: sparkle.size,
              height: sparkle.size,
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
                boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Wand tip glow */}
      {isVisible && (
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
          {/* Outer glow */}
          <div 
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsla(43, 80%, 55%, 0.3) 0%, transparent 70%)',
            }}
          />
          {/* Inner core */}
          <div 
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsla(45, 90%, 80%, 1) 0%, hsla(43, 80%, 55%, 0.8) 50%, transparent 100%)',
              boxShadow: '0 0 15px hsla(43, 80%, 55%, 0.8), 0 0 30px hsla(43, 80%, 55%, 0.5)',
            }}
          />
          {/* Wand tip dot */}
          <div 
            className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
            style={{
              boxShadow: '0 0 10px white, 0 0 20px hsla(43, 80%, 55%, 1)',
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MagicCursor;
