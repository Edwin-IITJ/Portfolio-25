// pages/live/pomodoro.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Coffee, Brain, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const TIMER_CONFIGS = {
    work: { duration: 25 * 60, label: 'Focus', color: '#1a1a1a' },
    shortBreak: { duration: 5 * 60, label: 'Short Break', color: '#2d4a3e' },
    longBreak: { duration: 15 * 60, label: 'Long Break', color: '#3d2a1a' },
};

// Generate tick sound using Web Audio API
function createTickSound(audioContext: AudioContext, volume: number = 0.15) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
}

// Generate winding sound (mechanical clicking)
function createWindSound(audioContext: AudioContext, volume: number = 0.2) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 300;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.02);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.02);
}

// Generate bell/chime sound for completion
function createBellSound(audioContext: AudioContext) {
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 chord

    frequencies.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        const startTime = audioContext.currentTime + i * 0.1;
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);

        oscillator.start(startTime);
        oscillator.stop(startTime + 1.5);
    });
}

export default function PomodoroTimer() {
    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(TIMER_CONFIGS.work.duration);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [isWinding, setIsWinding] = useState(false);
    const [windAngle, setWindAngle] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const audioContextRef = useRef<AudioContext | null>(null);
    const dialRef = useRef<HTMLDivElement>(null);
    const lastWindAngleRef = useRef(0);

    const config = TIMER_CONFIGS[mode];

    // Initialize audio context on first interaction
    const initAudio = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    // Play tick sound
    const playTick = useCallback(() => {
        if (!soundEnabled) return;
        try {
            const ctx = initAudio();
            createTickSound(ctx);
        } catch { }
    }, [soundEnabled, initAudio]);

    // Play wind click
    const playWindClick = useCallback(() => {
        if (!soundEnabled) return;
        try {
            const ctx = initAudio();
            createWindSound(ctx);
        } catch { }
    }, [soundEnabled, initAudio]);

    // Play bell
    const playBell = useCallback(() => {
        if (!soundEnabled) return;
        try {
            const ctx = initAudio();
            createBellSound(ctx);
        } catch { }
    }, [soundEnabled, initAudio]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate rotation for the dial (360 degrees = full timer)
    const getDialRotation = () => {
        if (isWinding) return windAngle;
        const totalDuration = config.duration;
        const elapsed = totalDuration - timeLeft;
        return (elapsed / totalDuration) * 360;
    };

    // Handle drag-to-wind gesture
    const handleWindStart = () => {
        setIsWinding(true);
        setIsRunning(false);
        setWindAngle((config.duration - timeLeft) / config.duration * 360);
    };

    const handleWindDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (!dialRef.current || !isWinding) return;

        const rect = dialRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Get current pointer position
        const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
        const clientY = 'touches' in event ? event.touches[0].clientY : (event as MouseEvent).clientY;

        // Calculate angle from center
        const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI) + 90;
        const normalizedAngle = ((angle % 360) + 360) % 360;

        // Calculate angle delta for click sounds
        const angleDelta = Math.abs(normalizedAngle - lastWindAngleRef.current);
        if (angleDelta > 6) { // Every 6 degrees = ~1 minute = 1 click
            playWindClick();
            lastWindAngleRef.current = normalizedAngle;
        }

        setWindAngle(normalizedAngle);

        // Update time based on angle
        const newTimeRemaining = config.duration - (normalizedAngle / 360) * config.duration;
        setTimeLeft(Math.max(0, Math.min(config.duration, Math.round(newTimeRemaining))));
    };

    const handleWindEnd = () => {
        setIsWinding(false);
        if (timeLeft > 0 && timeLeft < config.duration) {
            // User wound the timer - this confirms their determination
            setIsRunning(true);
        }
    };

    const handleModeChange = useCallback((newMode: TimerMode) => {
        setMode(newMode);
        setTimeLeft(TIMER_CONFIGS[newMode].duration);
        setIsRunning(false);
    }, []);

    const handleReset = useCallback(() => {
        setTimeLeft(config.duration);
        setIsRunning(false);
    }, [config.duration]);

    // Timer countdown effect with ticking
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const interval = setInterval(() => {
            // Play tick sound on each second (externalizes the desire to complete)
            playTick();

            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    // Play bell sound (announces the break)
                    playBell();

                    // Auto-switch modes
                    if (mode === 'work') {
                        const newSessions = sessionsCompleted + 1;
                        setSessionsCompleted(newSessions);
                        if (newSessions % 4 === 0) {
                            setMode('longBreak');
                            return TIMER_CONFIGS.longBreak.duration;
                        } else {
                            setMode('shortBreak');
                            return TIMER_CONFIGS.shortBreak.duration;
                        }
                    } else {
                        setMode('work');
                        return TIMER_CONFIGS.work.duration;
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode, sessionsCompleted, playTick, playBell]);

    return (
        <>
            <Head>
                <title>Pomodoro Timer – Edwin Meleth</title>
                <meta name="description" content="A Bauhaus-inspired pomodoro timer with physical interactions - wind to start, hear the tick, feel the focus." />
            </Head>

            <div
                className="min-h-screen transition-colors duration-700"
                style={{ backgroundColor: config.color }}
            >
                {/* Header */}
                <header className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Projects</span>
                    </Link>

                    {/* Sound toggle */}
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-2 text-white/40 hover:text-white transition-colors"
                        aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                    >
                        {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </button>
                </header>

                {/* Main Timer */}
                <main className="flex flex-col items-center justify-center px-6 pb-20">

                    {/* Mode Label */}
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={mode}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="text-white/40 text-sm uppercase tracking-[0.3em] font-medium mb-8"
                        >
                            {config.label}
                        </motion.h1>
                    </AnimatePresence>

                    {/* Instruction hint */}
                    <AnimatePresence>
                        {!isRunning && timeLeft === config.duration && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-white/30 text-xs mb-6 text-center"
                            >
                                Drag on the dial to wind • Release to start
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Timer Dial - Braun/Bauhaus Style with Gesture */}
                    <motion.div
                        ref={dialRef}
                        className="relative mb-16 cursor-grab active:cursor-grabbing select-none"
                        onPanStart={handleWindStart}
                        onPan={handleWindDrag}
                        onPanEnd={handleWindEnd}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Outer ring - tactile appearance */}
                        <div className={`w-80 h-80 md:w-96 md:h-96 rounded-full shadow-2xl flex items-center justify-center p-2 transition-all duration-200 ${isWinding
                            ? 'bg-gradient-to-b from-neutral-700 to-neutral-800 ring-4 ring-white/20'
                            : 'bg-gradient-to-b from-neutral-800 to-neutral-900'
                            }`}>

                            {/* Inner dial face */}
                            <div className="w-full h-full rounded-full bg-gradient-to-b from-neutral-100 to-neutral-200 relative overflow-hidden shadow-inner">

                                {/* Tick marks */}
                                {Array.from({ length: 60 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-0 flex justify-center"
                                        style={{ transform: `rotate(${i * 6}deg)` }}
                                    >
                                        <div
                                            style={{
                                                height: i % 5 === 0 ? '24px' : '12px',
                                                width: '1px',
                                                backgroundColor: i % 5 === 0 ? '#1a1a1a' : '#9ca3af',
                                                marginTop: '8px', // Gap from edge
                                            }}
                                        />
                                    </div>
                                ))}

                                {/* Progress indicator - rotating hand */}
                                <motion.div
                                    className="absolute inset-0 flex justify-center"
                                    animate={{ rotate: getDialRotation() }}
                                    transition={isWinding ? { type: 'tween', duration: 0 } : { type: 'spring', stiffness: 100, damping: 15 }}
                                >
                                    <div
                                        className="w-1 bg-red-600 rounded-full"
                                        style={{
                                            height: 'calc(50% - 32px)',
                                            marginTop: '32px'
                                        }}
                                    />
                                </motion.div>

                                {/* Center cap with tactile ridges */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-b from-neutral-600 to-neutral-900 shadow-lg flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full border-2 border-neutral-500/30" />
                                </div>

                                {/* Time display */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-10 md:translate-y-12">
                                    <motion.span
                                        key={timeLeft}
                                        initial={{ scale: isWinding ? 1 : 1.02 }}
                                        animate={{ scale: 1 }}
                                        className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-neutral-900"
                                    >
                                        {formatTime(timeLeft)}
                                    </motion.span>
                                </div>

                                {/* Running indicator */}
                                {isRunning && (
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                                        </span>
                                    </motion.div>
                                )}

                                {/* Braun logo-style branding */}
                                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                                    <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">Pomodoro</span>
                                </div>
                            </div>
                        </div>

                        {/* Sessions indicator */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i < (sessionsCompleted % 4)
                                        ? 'bg-red-600 shadow-lg shadow-red-600/50'
                                        : 'bg-neutral-600'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Minimal Controls */}
                    <div className="flex items-center gap-4">
                        {/* Play/Pause toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                initAudio(); // Ensure audio context is ready
                                setIsRunning(!isRunning);
                            }}
                            className={`px-8 py-3 rounded-full font-medium transition-all shadow-lg ${isRunning
                                ? 'bg-white/20 text-white'
                                : 'bg-red-600 text-white'
                                }`}
                        >
                            {isRunning ? 'Pause' : 'Start'}
                        </motion.button>

                        {/* Reset */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReset}
                            className="px-6 py-3 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                        >
                            Reset
                        </motion.button>
                    </div>

                    {/* Mode Switcher */}
                    <div className="mt-12 flex gap-4">
                        <ModeButton
                            active={mode === 'work'}
                            onClick={() => handleModeChange('work')}
                            icon={<Brain className="w-4 h-4" />}
                            label="Focus"
                        />
                        <ModeButton
                            active={mode === 'shortBreak'}
                            onClick={() => handleModeChange('shortBreak')}
                            icon={<Coffee className="w-4 h-4" />}
                            label="Short"
                        />
                        <ModeButton
                            active={mode === 'longBreak'}
                            onClick={() => handleModeChange('longBreak')}
                            icon={<Coffee className="w-4 h-4" />}
                            label="Long"
                        />
                    </div>

                    {/* Session Counter */}
                    <div className="mt-10 text-center">
                        <span className="text-white/30 text-sm font-medium">
                            {sessionsCompleted} session{sessionsCompleted !== 1 ? 's' : ''} completed
                        </span>
                    </div>
                </main>
            </div>
        </>
    );
}

// Mode selection button component
function ModeButton({
    active,
    onClick,
    icon,
    label,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${active
                ? 'bg-white/20 text-white shadow-lg'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                }`}
        >
            {icon}
            {label}
        </motion.button>
    );
}
