// pages/live/pomodoro.tsx
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Coffee, Brain, Volume2, VolumeX, Info, X, Settings } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface SessionSettings {
    workDuration: number;        // minutes
    shortBreakDuration: number;  // minutes
    longBreakDuration: number;   // minutes
    sessionPlan: TimerMode[];    // user-defined sequence
}

const DEFAULT_SESSION_PLAN: TimerMode[] = [
    'work', 'shortBreak', 'work', 'shortBreak',
    'work', 'shortBreak', 'work', 'longBreak',
];

const DEFAULT_SETTINGS: SessionSettings = {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionPlan: DEFAULT_SESSION_PLAN,
};

const STORAGE_KEY = 'pomodoro-settings';
const MAX_PLAN_LENGTH = 12;

const MODE_META: Record<TimerMode, { label: string; shortLabel: string; color: string }> = {
    work: { label: 'Focus', shortLabel: 'Focus', color: '#1a1a1a' },
    shortBreak: { label: 'Short Break', shortLabel: 'Short', color: '#2d4a3e' },
    longBreak: { label: 'Long Break', shortLabel: 'Long', color: '#3d2a1a' },
};

function getModeDuration(mode: TimerMode, settings: SessionSettings): number {
    switch (mode) {
        case 'work': return settings.workDuration * 60;
        case 'shortBreak': return settings.shortBreakDuration * 60;
        case 'longBreak': return settings.longBreakDuration * 60;
    }
}

function formatTotalTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
}

// Migrate old settings format (totalWorkSessions) to new (sessionPlan)
function migrateSettings(saved: Record<string, unknown>): SessionSettings {
    // New format — has sessionPlan
    if (Array.isArray(saved.sessionPlan)) {
        return {
            workDuration: (saved.workDuration as number) || DEFAULT_SETTINGS.workDuration,
            shortBreakDuration: (saved.shortBreakDuration as number) || DEFAULT_SETTINGS.shortBreakDuration,
            longBreakDuration: (saved.longBreakDuration as number) || DEFAULT_SETTINGS.longBreakDuration,
            sessionPlan: saved.sessionPlan as TimerMode[],
        };
    }
    // Old format — has totalWorkSessions, convert to sessionPlan
    if (typeof saved.totalWorkSessions === 'number') {
        const count = saved.totalWorkSessions as number;
        const plan: TimerMode[] = [];
        for (let i = 0; i < count; i++) {
            plan.push('work');
            if (i < count - 1) plan.push('shortBreak');
            else plan.push('longBreak');
        }
        return {
            workDuration: (saved.workDuration as number) || DEFAULT_SETTINGS.workDuration,
            shortBreakDuration: (saved.shortBreakDuration as number) || DEFAULT_SETTINGS.shortBreakDuration,
            longBreakDuration: (saved.longBreakDuration as number) || DEFAULT_SETTINGS.longBreakDuration,
            sessionPlan: plan,
        };
    }
    return DEFAULT_SETTINGS;
}

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
    // Settings
    const [settings, setSettings] = useState<SessionSettings>(DEFAULT_SETTINGS);
    const [showSettings, setShowSettings] = useState(false);
    const [draftSettings, setDraftSettings] = useState<SessionSettings>(DEFAULT_SETTINGS);

    // Timer state
    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.workDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [isWinding, setIsWinding] = useState(false);
    const [windAngle, setWindAngle] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    // Session tracking
    const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const audioContextRef = useRef<AudioContext | null>(null);
    const dialRef = useRef<HTMLDivElement>(null);
    const lastWindAngleRef = useRef(0);

    // Computed values — session plan is the sequence, fallback to single work if empty
    const sessionSequence = useMemo(() => {
        return settings.sessionPlan.length > 0 ? settings.sessionPlan : ['work' as TimerMode];
    }, [settings.sessionPlan]);
    const currentDuration = getModeDuration(mode, settings);
    const meta = MODE_META[mode];

    // Total plan duration for completion summary
    const totalPlanMinutes = useMemo(() => {
        return sessionSequence.reduce((sum, m) => sum + getModeDuration(m, settings), 0) / 60;
    }, [sessionSequence, settings]);

    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = migrateSettings(JSON.parse(saved));
                setSettings(parsed);
                setDraftSettings(parsed);
                const firstMode = parsed.sessionPlan[0] || 'work';
                setMode(firstMode);
                setTimeLeft(getModeDuration(firstMode, parsed));
            }
        } catch { }
    }, []);

    // Auto-reset after completion ceremony
    useEffect(() => {
        if (!isComplete) return;
        const timeout = setTimeout(() => {
            setIsComplete(false);
            setCurrentSessionIndex(0);
            const firstMode = settings.sessionPlan[0] || 'work';
            setMode(firstMode);
            setTimeLeft(getModeDuration(firstMode, settings));
        }, 6000);
        return () => clearTimeout(timeout);
    }, [isComplete, settings]);

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
        const elapsed = currentDuration - timeLeft;
        return (elapsed / currentDuration) * 360;
    };

    // Handle drag-to-wind gesture
    const handleWindStart = () => {
        if (isComplete) return;
        setIsWinding(true);
        setIsRunning(false);
        setWindAngle((currentDuration - timeLeft) / currentDuration * 360);
    };

    const handleWindDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (!dialRef.current || !isWinding) return;

        const rect = dialRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Get current pointer position using Framer Motion's info.point (works for both mouse and touch)
        const clientX = info.point.x;
        const clientY = info.point.y;

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
        const newTimeRemaining = currentDuration - (normalizedAngle / 360) * currentDuration;
        setTimeLeft(Math.max(0, Math.min(currentDuration, Math.round(newTimeRemaining))));
    };

    const handleWindEnd = () => {
        setIsWinding(false);
        if (timeLeft > 0 && timeLeft < currentDuration) {
            // User wound the timer - this confirms their determination
            setIsRunning(true);
        }
    };

    const handleModeChange = useCallback((newMode: TimerMode) => {
        setMode(newMode);
        setTimeLeft(getModeDuration(newMode, settings));
        setIsRunning(false);
    }, [settings]);

    const handleReset = useCallback(() => {
        setTimeLeft(currentDuration);
        setIsRunning(false);
    }, [currentDuration]);

    // Settings modal helpers
    const openSettings = () => {
        setDraftSettings({ ...settings });
        setShowSettings(true);
    };

    const saveSettings = (newSettings: SessionSettings) => {
        setSettings(newSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
        setShowSettings(false);
        // Reset timer to new plan
        const firstMode = newSettings.sessionPlan[0] || 'work';
        setCurrentSessionIndex(0);
        setMode(firstMode);
        setTimeLeft(getModeDuration(firstMode, newSettings));
        setIsRunning(false);
        setIsComplete(false);
        setSessionsCompleted(0);
    };

    const handleRestart = () => {
        setIsComplete(false);
        setCurrentSessionIndex(0);
        const firstMode = settings.sessionPlan[0] || 'work';
        setMode(firstMode);
        setTimeLeft(getModeDuration(firstMode, settings));
        setIsRunning(false);
    };

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

                    if (mode === 'work') {
                        setSessionsCompleted(s => s + 1);
                    }

                    const nextIndex = currentSessionIndex + 1;

                    if (nextIndex >= sessionSequence.length) {
                        // All sessions complete — trigger completion ceremony
                        setIsComplete(true);
                        setCurrentSessionIndex(nextIndex);
                        return 0;
                    } else {
                        // Advance to next session in the sequence
                        const nextMode = sessionSequence[nextIndex];
                        setCurrentSessionIndex(nextIndex);
                        setMode(nextMode);
                        return getModeDuration(nextMode, settings);
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode, currentSessionIndex, sessionSequence, settings, playTick, playBell]);

    return (
        <>
            <Head>
                <title>Pomodoro Timer – Edwin Meleth</title>
                <meta name="description" content="A Bauhaus-inspired pomodoro timer with physical interactions - wind to start, hear the tick, feel the focus." />
            </Head>

            <div
                className="min-h-screen transition-colors duration-700"
                style={{ backgroundColor: isComplete ? '#131320' : meta.color }}
            >
                {/* Header */}
                <header className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Projects</span>
                    </Link>

                    {/* Header Controls */}
                    <div className="flex items-center gap-2">
                        {/* Sound toggle */}
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-2 text-white/40 hover:text-white transition-colors"
                            aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                        >
                            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>

                        {/* Settings */}
                        <button
                            onClick={openSettings}
                            className="p-2 text-white/40 hover:text-white transition-colors"
                            aria-label="Session settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>

                        {/* Info button */}
                        <button
                            onClick={() => setShowInfo(true)}
                            className="p-2 text-white/40 hover:text-white transition-colors"
                            aria-label="Information"
                        >
                            <Info className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Info Modal */}
                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowInfo(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#1a1a1a] p-8 md:p-12 max-w-2xl w-full relative shadow-2xl border border-white/10"
                            >
                                <button
                                    onClick={() => setShowInfo(false)}
                                    className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="space-y-6 text-neutral-300 font-light leading-relaxed">
                                    <p>
                                        This page was created to recreate the physical ritual of the Pomodoro technique in a digital context, where winding the timer signals commitment, ticking externalizes the desire to complete the task, and ringing announces a break. Instead of features and tracking, it focuses on intent and presence. The design stays minimal so focus can stay uninterrupted.
                                    </p>

                                    <div className="pt-4">
                                        <a
                                            href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all text-sm"
                                        >
                                            Read more on Wikipedia
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Settings Modal */}
                <AnimatePresence>
                    {showSettings && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowSettings(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#1a1a1a] p-8 md:p-10 max-w-md w-full relative shadow-2xl border border-white/10"
                            >
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <h2 className="text-white/50 text-xs uppercase tracking-[0.25em] font-medium mb-8">
                                    Session Settings
                                </h2>

                                {/* Duration Steppers */}
                                <div className="space-y-1">
                                    <SettingStepper
                                        label="Focus Duration"
                                        value={draftSettings.workDuration}
                                        onChange={(v) => setDraftSettings(d => ({ ...d, workDuration: v }))}
                                        min={5} max={60} step={5} unit="min"
                                    />
                                    <SettingStepper
                                        label="Short Break"
                                        value={draftSettings.shortBreakDuration}
                                        onChange={(v) => setDraftSettings(d => ({ ...d, shortBreakDuration: v }))}
                                        min={1} max={15} step={1} unit="min"
                                    />
                                    <SettingStepper
                                        label="Long Break"
                                        value={draftSettings.longBreakDuration}
                                        onChange={(v) => setDraftSettings(d => ({ ...d, longBreakDuration: v }))}
                                        min={5} max={30} step={5} unit="min"
                                    />
                                </div>

                                {/* Session Plan Builder */}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Session Plan</p>

                                    {/* Current sequence — tappable chips, tap to remove */}
                                    <div className="flex flex-wrap gap-1.5 mb-4 min-h-[36px] items-center">
                                        {draftSettings.sessionPlan.length === 0 ? (
                                            <span className="text-white/20 text-sm italic">Tap below to add sessions</span>
                                        ) : (
                                            draftSettings.sessionPlan.map((m, i) => (
                                                <motion.button
                                                    key={i}
                                                    layout
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    onClick={() => {
                                                        setDraftSettings(d => ({
                                                            ...d,
                                                            sessionPlan: d.sessionPlan.filter((_, idx) => idx !== i),
                                                        }));
                                                    }}
                                                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${m === 'work'
                                                        ? 'bg-red-500/20 text-red-300 hover:bg-red-500/40'
                                                        : m === 'shortBreak'
                                                            ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40'
                                                            : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/40'
                                                        }`}
                                                    title={`Remove ${MODE_META[m].label}`}
                                                >
                                                    {MODE_META[m].shortLabel}
                                                    <span className="opacity-40 text-[10px] leading-none">×</span>
                                                </motion.button>
                                            ))
                                        )}
                                    </div>

                                    {/* Add session buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setDraftSettings(d => ({
                                                ...d,
                                                sessionPlan: [...d.sessionPlan, 'work'],
                                            }))}
                                            disabled={draftSettings.sessionPlan.length >= MAX_PLAN_LENGTH}
                                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            + Focus
                                        </button>
                                        <button
                                            onClick={() => setDraftSettings(d => ({
                                                ...d,
                                                sessionPlan: [...d.sessionPlan, 'shortBreak'],
                                            }))}
                                            disabled={draftSettings.sessionPlan.length >= MAX_PLAN_LENGTH}
                                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            + Short
                                        </button>
                                        <button
                                            onClick={() => setDraftSettings(d => ({
                                                ...d,
                                                sessionPlan: [...d.sessionPlan, 'longBreak'],
                                            }))}
                                            disabled={draftSettings.sessionPlan.length >= MAX_PLAN_LENGTH}
                                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            + Long
                                        </button>
                                    </div>

                                    {/* Total time */}
                                    {draftSettings.sessionPlan.length > 0 && (
                                        <p className="text-white/20 text-xs mt-3">
                                            {formatTotalTime(
                                                draftSettings.sessionPlan.reduce(
                                                    (sum, m) => sum + getModeDuration(m, draftSettings), 0
                                                ) / 60
                                            )} total
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        onClick={() => setDraftSettings({ ...DEFAULT_SETTINGS })}
                                        className="text-white/30 text-xs hover:text-white/60 transition-colors underline underline-offset-2"
                                    >
                                        Reset to defaults
                                    </button>
                                    <button
                                        onClick={() => saveSettings(draftSettings)}
                                        disabled={draftSettings.sessionPlan.length === 0}
                                        className="px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        Save
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Timer */}
                <main className="flex flex-col items-center justify-center px-6 pb-20">

                    {/* Mode Label */}
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={isComplete ? 'complete' : mode}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="text-white/40 text-sm uppercase tracking-[0.3em] font-medium mb-8"
                        >
                            {isComplete ? 'Complete' : meta.label}
                        </motion.h1>
                    </AnimatePresence>

                    {/* Instruction hint */}
                    <AnimatePresence>
                        {!isRunning && !isComplete && timeLeft === currentDuration && (
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
                        className={`relative mb-16 select-none touch-none ${isComplete ? '' : 'cursor-grab active:cursor-grabbing'}`}
                        onPanStart={handleWindStart}
                        onPan={handleWindDrag}
                        onPanEnd={handleWindEnd}
                        whileTap={isComplete ? undefined : { scale: 0.98 }}
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
                                    animate={{ rotate: isComplete ? 360 : getDialRotation() }}
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

                                {/* Time display / Completion overlay */}
                                <AnimatePresence mode="wait">
                                    {isComplete ? (
                                        <motion.div
                                            key="complete"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute inset-0 rounded-full bg-gradient-to-b from-neutral-100/95 to-neutral-200/95 flex flex-col items-center justify-center z-20 backdrop-blur-sm"
                                        >
                                            <span className="text-neutral-900 text-xl md:text-2xl font-bold tracking-tight">
                                                All done
                                            </span>
                                            <span className="text-neutral-500 text-sm mt-2">
                                                {sessionsCompleted} session{sessionsCompleted !== 1 ? 's' : ''} · {formatTotalTime(totalPlanMinutes)}
                                            </span>
                                            {/* Subtle progress ring around the auto-reset countdown */}
                                            <motion.div
                                                className="absolute inset-4 rounded-full border-2 border-neutral-300/40"
                                                initial={{ scale: 1, opacity: 0.5 }}
                                                animate={{ scale: 1.02, opacity: 0 }}
                                                transition={{ duration: 6, ease: 'linear' }}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="timer"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-10 md:translate-y-12"
                                        >
                                            <motion.span
                                                key={timeLeft}
                                                initial={{ scale: isWinding ? 1 : 1.02 }}
                                                animate={{ scale: 1 }}
                                                className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-neutral-900"
                                            >
                                                {formatTime(timeLeft)}
                                            </motion.span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Running indicator */}
                                {isRunning && !isComplete && (
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
                                {!isComplete && (
                                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                                        <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">Pomodoro</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Session Progress Dots */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                            {sessionSequence.map((sessionMode, i) => (
                                <div
                                    key={i}
                                    className={`rounded-full transition-all duration-300 ${sessionMode === 'work' ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'
                                        } ${i < currentSessionIndex
                                            ? 'bg-white/50'
                                            : i === currentSessionIndex && !isComplete
                                                ? 'bg-red-600 shadow-lg shadow-red-600/50'
                                                : isComplete
                                                    ? 'bg-white/50'
                                                    : 'bg-neutral-600'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Minimal Controls */}
                    <div className="flex items-center gap-4">
                        {/* Play/Pause/Restart toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (isComplete) {
                                    handleRestart();
                                    return;
                                }
                                initAudio(); // Ensure audio context is ready
                                setIsRunning(!isRunning);
                            }}
                            className={`px-8 py-3 rounded-full font-medium transition-all shadow-lg ${isComplete
                                ? 'bg-white/20 text-white'
                                : isRunning
                                    ? 'bg-white/20 text-white'
                                    : 'bg-red-600 text-white'
                                }`}
                        >
                            {isComplete ? 'Restart' : isRunning ? 'Pause' : 'Start'}
                        </motion.button>

                        {/* Reset */}
                        {!isComplete && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReset}
                                className="px-6 py-3 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                            >
                                Reset
                            </motion.button>
                        )}
                    </div>

                    {/* Mode Switcher */}
                    {!isComplete && (
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
                    )}

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

// Stepper input for settings modal
function SettingStepper({
    label,
    value,
    onChange,
    min,
    max,
    step,
    unit,
}: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    step: number;
    unit: string;
}) {
    return (
        <div className="flex items-center justify-between py-3">
            <span className="text-neutral-300 text-sm font-light">{label}</span>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onChange(Math.max(min, value - step))}
                    className="w-11 h-11 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors text-lg select-none"
                    aria-label={`Decrease ${label}`}
                >
                    −
                </button>
                <span className="text-white font-mono text-base w-10 text-center tabular-nums">
                    {value}
                </span>
                <button
                    onClick={() => onChange(Math.min(max, value + step))}
                    className="w-11 h-11 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors text-lg select-none"
                    aria-label={`Increase ${label}`}
                >
                    +
                </button>
                <span className="text-white/30 text-xs w-6">{unit}</span>
            </div>
        </div>
    );
}
