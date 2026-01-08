import { motion } from 'framer-motion';

const HogwartsBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1618944847023-38aa001235f0?q=80&w=1920&auto=format&fit=crop)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Atmospheric Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 15, 30, 0.4) 0%, rgba(10, 15, 30, 0.8) 50%, #0a0f1e 100%)',
        }}
      />

      {/* Magical Particles: Floating Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
            }}
            animate={{
              y: [0, -120], // Move upwards
              opacity: [0, 0.5, 0], // Fade in and out
            }}
            transition={{
              duration: 8 + Math.random() * 10, // Slow, varying speed
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HogwartsBackground;
