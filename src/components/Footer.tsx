import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 px-4 border-t border-gold/10">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <Wand2 className="w-7 h-7 text-midnight" />
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          className="font-cinzel text-gold text-lg md:text-xl mb-8 italic text-glow-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          "Es nuestra elección lo que muestra lo que realmente somos, mucho más que nuestras habilidades."
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-32 h-px mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Copyright */}
        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The Wizarding Archives © {new Date().getFullYear()}
        </motion.p>
        <motion.p
          className="text-muted-foreground/60 text-xs mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Creado con magia y código
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
