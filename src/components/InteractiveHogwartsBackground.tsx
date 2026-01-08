import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const InteractiveHogwartsBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse tracking for parallax
    const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30 });

    // Parallax transforms for fog
    const fogX = useTransform(smoothX, [-0.5, 0.5], ['-5%', '5%']);
    const fogY = useTransform(smoothY, [-0.5, 0.5], ['-2%', '2%']);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -0.5 to 0.5
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            mouseX.set(x);
            mouseY.set(y);
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Layer 1 (Z -50): Failsafe Black Background */}
            <div className="absolute inset-0 bg-[#050a14] -z-50" />

            {/* Layer 2 (Z -40): The Castle (Ken Burns Effect) */}
            <motion.div
                className="absolute inset-0 -z-40"
                animate={{
                    scale: [1, 1.1, 1],
                    x: ['0%', '-2%', '0%'],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div
                    className="absolute inset-100" // Use larger inset to allow scaling without whitespace if needed, but inset-0 with object-cover works
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(https://images.unsplash.com/photo-1618944847023-38aa001235f0?q=80&w=1920&auto=format&fit=crop)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Mobile-optimized alternative or just same image responsive */}
                <img
                    src="https://images.unsplash.com/photo-1618944847023-38aa001235f0?q=80&w=1920&auto=format&fit=crop"
                    alt="Hogwarts Castle"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Layer 3 (Z -30): Fog Parallax */}
            <motion.div
                className="absolute inset-0 -z-30 opacity-30 mix-blend-screen"
                style={{ x: fogX, y: fogY }}
            >
                {/* Floating fog patches */}
                <div
                    className="absolute top-[20%] left-[10%] w-[40vw] h-[40vh] rounded-full blur-[100px] bg-blue-900/20"
                />
                <div
                    className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vh] rounded-full blur-[120px] bg-purple-900/10"
                />
            </motion.div>

            {/* Layer 4 (Z -20): Readability Overlay */}
            <div
                className="absolute inset-0 -z-20"
                style={{
                    background: 'linear-gradient(to bottom, rgba(5, 10, 20, 0.3) 0%, rgba(5, 10, 20, 0.8) 50%, #050a14 100%)',
                }}
            />

            {/* Layer 5 (Z -10): Magic Particles */}
            <div className="absolute inset-0 -z-10">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/30 box-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: Math.random() * 3 + 1,
                            height: Math.random() * 3 + 1,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 10,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default InteractiveHogwartsBackground;
