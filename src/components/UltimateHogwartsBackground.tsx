import InteractiveFallingParticles from './InteractiveFallingParticles';

const UltimateHogwartsBackground = () => {
    return (
        <>
            {/* Layer 1 (Z -50): The Castle Base */}
            <div
                className="fixed inset-0"
                style={{
                    zIndex: -50,
                    backgroundImage: `url(https://images.unsplash.com/photo-1618944847023-38aa001235f0?q=80&w=1920&auto=format&fit=crop)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
            />

            {/* Layer 2 (Z -40): The Readability Overlay */}
            <div
                className="fixed inset-0"
                style={{
                    zIndex: -40,
                    background: 'linear-gradient(to bottom, rgba(5, 12, 24, 0.5) 0%, rgba(5, 12, 24, 0.95) 70%, #050c18 100%)',
                }}
            />

            {/* Layer 3 (Z -30): Interactive Falling Magic */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{ zIndex: -30 }}
            >
                <InteractiveFallingParticles />
            </div>
        </>
    );
};

export default UltimateHogwartsBackground;
