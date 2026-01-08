import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Scroll, Wand2 } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Biblioteca', icon: BookOpen },
    { label: 'Pergaminos', icon: Scroll },
    { label: 'Hechizos', icon: Wand2 },
  ];

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
    },
    open: {
      x: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 }
    })
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-card mx-4 mt-4 rounded-2xl">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-midnight" />
              </div>
              <span className="font-cinzel text-lg text-gold hidden sm:block">
                Wizarding Archives
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href="#"
                  className="flex items-center gap-2 text-parchment-dark hover:text-gold transition-colors duration-300 font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gold hover:text-gold-light transition-colors"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-midnight-deep/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] glass-card z-50 rounded-r-3xl overflow-hidden"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />
              
              <div className="p-8">
                {/* Close button */}
                <motion.button
                  className="absolute top-6 right-6 p-2 text-gold hover:text-gold-light transition-colors"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Logo */}
                <motion.div 
                  className="flex items-center gap-3 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-midnight" />
                  </div>
                  <span className="font-cinzel text-xl text-gold text-glow-gold">
                    Archives
                  </span>
                </motion.div>

                {/* Menu Items */}
                <nav className="space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href="#"
                      className="flex items-center gap-4 p-4 rounded-xl text-parchment hover:bg-gold/10 hover:text-gold transition-all duration-300 group"
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      whileHover={{ x: 8 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-cinzel text-lg">{item.label}</span>
                    </motion.a>
                  ))}
                </nav>

                {/* Decorative element */}
                <motion.div 
                  className="absolute bottom-8 left-8 right-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4" />
                  <p className="text-center text-muted-foreground text-sm font-cinzel italic">
                    "Las palabras son nuestra más inagotable fuente de magia"
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
