import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HogwartsBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Parallax transforms
  const cloudX = useTransform(smoothX, [0, 1], ['-5%', '5%']);
  const cloudY = useTransform(smoothY, [0, 1], ['-2%', '2%']);
  const castleX = useTransform(smoothX, [0, 1], ['-2%', '2%']);
  const castleY = useTransform(smoothY, [0, 1], ['-1%', '1%']);
  const auroraX = useTransform(smoothX, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Castle windows with flickering candles
  const windows = [
    { x: '25%', y: '35%', size: 4 },
    { x: '28%', y: '40%', size: 3 },
    { x: '32%', y: '32%', size: 5 },
    { x: '45%', y: '38%', size: 4 },
    { x: '48%', y: '45%', size: 3 },
    { x: '52%', y: '35%', size: 4 },
    { x: '68%', y: '40%', size: 5 },
    { x: '72%', y: '36%', size: 3 },
    { x: '75%', y: '42%', size: 4 },
    { x: '38%', y: '50%', size: 3 },
    { x: '60%', y: '48%', size: 4 },
    { x: '42%', y: '30%', size: 5 },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden z-0">
      {/* Deep night sky base */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 100%, hsla(225, 45%, 8%, 1) 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 50% 0%, hsla(230, 50%, 6%, 1) 0%, hsla(225, 50%, 3%, 1) 100%)
          `,
        }}
      />

      {/* Stars layer */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Aurora layer */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ x: auroraX }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-[40vh]"
          style={{
            background: `
              linear-gradient(180deg, 
                hsla(280, 60%, 30%, 0.15) 0%,
                hsla(200, 70%, 40%, 0.1) 30%,
                transparent 100%
              )
            `,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Aurora ribbons */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-32 w-[150%]"
            style={{
              top: `${5 + i * 8}%`,
              left: '-25%',
              background: `linear-gradient(90deg, 
                transparent 0%,
                hsla(${280 + i * 30}, 60%, 50%, 0.2) 20%,
                hsla(${200 + i * 20}, 70%, 50%, 0.15) 50%,
                hsla(${280 + i * 30}, 60%, 50%, 0.2) 80%,
                transparent 100%
              )`,
              filter: 'blur(20px)',
              transform: `skewX(-15deg)`,
            }}
            animate={{
              x: ['-30%', '30%', '-30%'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Distant clouds layer */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: cloudX, y: cloudY }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${10 + Math.random() * 30}%`,
              width: `${200 + Math.random() * 300}px`,
              height: `${60 + Math.random() * 80}px`,
              background: `radial-gradient(ellipse, hsla(220, 30%, 20%, ${0.3 + Math.random() * 0.3}) 0%, transparent 70%)`,
              filter: 'blur(15px)',
            }}
            animate={{
              x: ['-100%', '100vw'],
            }}
            transition={{
              duration: 80 + i * 20,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 15,
            }}
          />
        ))}
      </motion.div>

      {/* Castle silhouette layer */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: castleX, y: castleY }}
      >
        {/* Castle main structure */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[65vh]"
          style={{
            background: `
              linear-gradient(180deg,
                transparent 0%,
                hsla(220, 20%, 8%, 0.95) 20%,
                hsla(220, 25%, 6%, 1) 100%
              )
            `,
            clipPath: `polygon(
              0% 100%,
              0% 60%,
              5% 55%,
              5% 40%,
              8% 40%,
              8% 30%,
              12% 30%,
              12% 45%,
              15% 45%,
              15% 35%,
              20% 35%,
              22% 20%,
              24% 20%,
              24% 35%,
              28% 35%,
              28% 50%,
              35% 50%,
              35% 40%,
              38% 40%,
              40% 25%,
              42% 25%,
              42% 15%,
              45% 15%,
              48% 5%,
              52% 5%,
              55% 15%,
              58% 15%,
              58% 25%,
              60% 25%,
              62% 40%,
              65% 40%,
              65% 50%,
              72% 50%,
              72% 35%,
              76% 35%,
              76% 20%,
              78% 20%,
              80% 35%,
              85% 35%,
              85% 45%,
              88% 45%,
              88% 30%,
              92% 30%,
              92% 40%,
              95% 40%,
              95% 55%,
              100% 60%,
              100% 100%
            )`,
          }}
        />

        {/* Castle windows with candle flicker */}
        {windows.map((window, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: window.x,
              top: window.y,
              width: window.size,
              height: window.size * 1.5,
              background: 'hsla(30, 100%, 60%, 0.8)',
              boxShadow: `
                0 0 ${window.size * 3}px hsla(30, 100%, 60%, 0.6),
                0 0 ${window.size * 6}px hsla(45, 100%, 60%, 0.3)
              `,
            }}
            animate={{
              opacity: [0.6, 1, 0.7, 0.9, 0.6],
              scale: [0.95, 1.05, 0.98, 1.02, 0.95],
            }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Foreground mist */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30vh]"
        style={{
          background: `linear-gradient(180deg,
            transparent 0%,
            hsla(220, 30%, 10%, 0.3) 50%,
            hsla(220, 35%, 8%, 0.6) 100%
          )`,
        }}
      />

      {/* Moonlight rays */}
      <div 
        className="absolute top-0 right-[20%] w-[40vw] h-[60vh]"
        style={{
          background: `radial-gradient(ellipse at top right,
            hsla(200, 30%, 80%, 0.05) 0%,
            transparent 60%
          )`,
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, hsla(225, 50%, 3%, 0.6) 100%)`,
        }}
      />
    </div>
  );
};

export default HogwartsBackground;
