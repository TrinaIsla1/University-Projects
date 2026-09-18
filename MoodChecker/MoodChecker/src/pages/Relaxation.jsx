import { useEffect, useMemo, useRef, useState } from "react";

function Relaxation() {
    const phases = useMemo(
        () => [
            { label: "Inhale", seconds: 4, speak: "Inhale" },
            { label: "Hold", seconds: 2, speak: "Hold" },
            { label: "Exhale", seconds: 6, speak: "Exhale" },
        ],
        []
    );

    const [running, setRunning] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [remaining, setRemaining] = useState(phases[0].seconds);

    const lastSpokenPhaseIndex = useRef(null);

    const phase = phases[phaseIndex];

    const playTone = (kind) => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;

            const ctx = new AudioCtx();
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();

            // Simple different tones per phase.
            const freq =
                kind === "Inhale" ? 440 : kind === "Hold" ? 300 : 220;

            oscillator.type = "sine";
            oscillator.frequency.value = freq;

            gain.gain.value = 0.0001;
            oscillator.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

            oscillator.start(now);
            oscillator.stop(now + 0.2);

            oscillator.onended = () => {
                try {
                    ctx.close();
                } catch {
                    // ignore
                }
            };
        } catch {
            // ignore audio errors
        }
    };

    const speak = (text) => {
        try {
            const synth = window.speechSynthesis;
            if (!synth) return;

            synth.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.rate = 0.95;
            utter.pitch = 1.0;
            utter.volume = 1;
            synth.speak(utter);
        } catch {
            // ignore speech errors
        }
    };

    useEffect(() => {
        if (!running) return;

        const t = window.setInterval(() => {
            setRemaining((r) => {
                if (r <= 1) {
                    setPhaseIndex((i) => (i + 1) % phases.length);
                    return 0;
                }
                return r - 1;
            });
        }, 1000);

        return () => window.clearInterval(t);
    }, [running, phases.length]);

    useEffect(() => {
        if (!running) return;
        const nextPhase = phases[phaseIndex];
        if (remaining === 0) setRemaining(nextPhase.seconds);
    }, [phaseIndex, remaining, running, phases]);

    // Speak + tone at the start of each phase.
    useEffect(() => {
        if (!running) return;
        if (lastSpokenPhaseIndex.current === phaseIndex) return;
        lastSpokenPhaseIndex.current = phaseIndex;

        speak(phase.speak);
        playTone(phase.speak);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phaseIndex, running]);

    const reset = () => {
        setRunning(false);
        setPhaseIndex(0);
        setRemaining(phases[0].seconds);
        lastSpokenPhaseIndex.current = null;
        try {
            window.speechSynthesis?.cancel?.();
        } catch {
            // ignore
        }
    };

    const progress = (1 - remaining / phase.seconds) * 100;

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center pt-28 pb-12 px-4">
            <div className="w-full max-w-5xl">
                <h1 className="text-4xl font-bold mb-2">Relaxation</h1>
                <p className="text-gray-600 mb-8">
                    Soothing audio + a calming breathing exercise.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Breathing */}
                    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-black/5 p-6 ring-1 ring-green-5/10">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold">Breathing</h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Follow the circle: {phase.label}.
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Time left</p>
                                <p className="text-4xl font-extrabold text-green-950">
                                    {remaining}s
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 rounded-3xl bg-gradient-to-br from-green-50 via-white to-green-50 ring-1 ring-green-100 p-5">
                            <div className="flex items-center justify-center">
                                <div className="relative flex flex-col items-center">
                                    <div
                                        className={
                                            "rounded-full bg-green-500/15 ring-1 ring-green-200 flex items-center justify-center"
                                        }
                                        style={{ width: 190, height: 190 }}
                                    >
                                        <div
                                            className="rounded-full bg-green-500/20 flex items-center justify-center"
                                            style={{
                                                width: 130,
                                                height: 130,
                                                transform:
                                                    phase.label === "Inhale"
                                                        ? "scale(1.06)"
                                                        : phase.label === "Exhale"
                                                            ? "scale(0.94)"
                                                            : "scale(1)",
                                                transition: "transform 1s ease-in-out",
                                            }}
                                        >
                                            <div className="text-center px-4">
                                                <div className="text-xs font-semibold text-green-900/70">
                                                    {phase.label.toUpperCase()}
                                                </div>
                                                <div className="mt-1 text-4xl font-bold text-green-950">
                                                    {phase.label === "Inhale" ? "🫁" : phase.label === "Hold" ? "🧘" : "🌬️"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                                        <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="h-3 w-full rounded-full bg-black/5 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-green-500 transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Tip: relax your shoulders and soften your gaze.
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col sm:flex-row gap-3">
                            {!running ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        lastSpokenPhaseIndex.current = null;
                                        setRunning(true);
                                        setPhaseIndex(0);
                                        setRemaining(phases[0].seconds);
                                    }}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl shadow-lg shadow-green-600/25 transition"
                                >
                                    Start
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setRunning(false)}
                                    className="flex-1 bg-white/70 hover:bg-white rounded-2xl ring-1 ring-green-100 px-5 py-3 text-gray-900 transition"
                                >
                                    Pause
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={reset}
                                className="bg-white/70 hover:bg-white rounded-2xl ring-1 ring-green-100 px-5 py-3 text-gray-900 transition"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-3">
                            {phases.map((p, idx) => (
                                <div
                                    key={p.label}
                                    className={`rounded-2xl p-3 ring-1 transition ${idx === phaseIndex
                                        ? "bg-green-50 ring-green-200"
                                        : "bg-white/60 ring-black/5"
                                        }`}
                                >
                                    <div className="text-lg">{p.label === "Inhale" ? "🫁" : p.label === "Hold" ? "🧘" : "🌬️"}</div>
                                    <div className="text-xs font-semibold mt-1">{p.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 text-xs text-gray-600">
                            Sound + voice cues are emitted at the start of each phase.
                        </div>
                    </div>

                    {/* Music */}
                    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-black/5 p-6 ring-1 ring-black/5">
                        <h2 className="text-2xl font-semibold">Soothing audio</h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Embedded YouTube player
                        </p>

                        <div className="mt-5 rounded-2xl overflow-hidden shadow-md">
                            <iframe
                                width="100%"
                                height="450"
                                src="https://www.youtube.com/embed/5qap5aO4i9A"
                                title="Relaxing Music"
                                allowFullScreen
                                className="block"
                            ></iframe>
                        </div>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <a
                                href="https://www.youtube.com/watch?v=5qap5aO4i9A"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl bg-green-50 ring-1 ring-green-100 px-4 py-3 text-sm font-medium text-green-900 hover:bg-green-100 transition"
                            >
                                Open on YouTube
                            </a>

                            <a
                                href="https://www.youtube.com/@AmbientMusic"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl bg-green-50 ring-1 ring-green-100 px-4 py-3 text-sm font-medium text-green-900 hover:bg-green-100 transition"
                            >
                                Ambient channel
                            </a>

                            <a
                                href="https://www.youtube.com/results?search_query=free+relaxing+music+ambient"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl bg-green-50 ring-1 ring-green-100 px-4 py-3 text-sm font-medium text-green-900 hover:bg-green-100 transition"
                            >
                                More free tracks
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Relaxation;



