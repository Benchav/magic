import { motion } from 'framer-motion';

export const HogwartsBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#050a14]">
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
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-200 rounded-full blur-[1px]"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};
