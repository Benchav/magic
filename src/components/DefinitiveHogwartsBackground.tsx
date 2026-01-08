import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

const Particle = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
    // Random starting positions and animation constraints
    const startX = Math.random() * 100;
    const startY = Math.random() * -100; // Start above screen
    const duration = Math.random() * 10 + 10; // Slow falling (10-20s)

    // Interaction: Particle is pushed slightly by mouse X position
    const x = useTransform(mouseX, [0, window.innerWidth], [startX - 5, startX + 5]);
    const y = useMotionValue(startY);

    useEffect(() => {
        const controls = animate(y, 110, { // Fall to below screen
            duration: duration,
            repeat: Infinity,
            ease: "linear"
        });
        return () => controls.stop();
    }, []);

    return (
        <motion.div
            style={{ x, y: y.get() + 'vh', left: `${startX}vw` }}
            className="absolute w-1 h-1 bg-yellow-400/60 rounded-full blur-[1px]"
        />
    );
};

export const DefinitiveHogwartsBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden">
            {/* LAYER 1: The Castle Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618944847023-38aa001235f0?q=80&w=1920&auto=format&fit=crop")' }}
            />

            {/* LAYER 2: The Readability Overlay (Dark Gradient) */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(5, 12, 24, 0.4) 0%, rgba(5, 12, 24, 0.95) 70%, #050c18 100%)' }}
            />

            {/* LAYER 3: Interactive Falling Magic */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <Particle key={i} mouseX={mouseX} mouseY={mouseY} />
                ))}
            </div>
        </div>
    );
};

export default DefinitiveHogwartsBackground;
