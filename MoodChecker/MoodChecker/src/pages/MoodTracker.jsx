import { useMemo, useState } from "react";

function MoodTracker() {
    const [mood, setMood] = useState("");

    const moods = useMemo(
        () => [
            {
                key: "happy",
                label: "Happy",
                emoji: "😊",
                bg: "from-amber-200 to-yellow-100",
                accent: "bg-amber-500 hover:bg-amber-600",
                gif: "https://media.giphy.com/media/111ebYkqQL8N0k/giphy.gif",
            },

            {
                key: "calm",
                label: "Calm",
                emoji: "😌",
                bg: "from-sky-200 to-cyan-100",
                accent: "bg-sky-500 hover:bg-sky-600",
                gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
            },
            {
                key: "sad",
                label: "Sad",
                emoji: "😢",
                bg: "from-indigo-200 to-blue-100",
                accent: "bg-indigo-500 hover:bg-indigo-600",
                gif: "https://media.giphy.com/media/3o7qE0z8Y0u4i6u9gQ/giphy.gif",
            },
            {
                key: "angry",
                label: "Angry",
                emoji: "😡",
                bg: "from-rose-200 to-pink-100",
                accent: "bg-rose-500 hover:bg-rose-600",
                gif: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
            },

            {
                key: "stressed",
                label: "Stressed",
                emoji: "😰",
                bg: "from-fuchsia-200 to-purple-100",
                accent: "bg-fuchsia-500 hover:bg-fuchsia-600",
                gif: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
            },
        ],
        []
    );

    const saveMood = (selectedMood) => {
        const label = selectedMood.label;
        setMood(label);
        // Keep latest mood for the dashboard.
        localStorage.setItem("mood", label);

        // Store a history list so we can show when the same emotion was picked before.
        const historyKey = "moodHistory";
        const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");
        const safeExisting = Array.isArray(existing) ? existing : [];

        const next = [
            ...safeExisting,
            {
                label,
                ts: Date.now(),
            },
        ];

        localStorage.setItem(historyKey, JSON.stringify(next));
    };

    const history = useMemo(() => {
        const raw = JSON.parse(localStorage.getItem("moodHistory") || "[]");
        return Array.isArray(raw) ? raw : [];
    }, []);

    // Force re-render after saving so the "already recorded" badge updates.
    // (We keep history in localStorage; mood is enough to trigger a rerender.)
    const _ = mood;

    const getLastRecordedText = (label) => {
        // Return a friendly message like: "Last recorded: 2 days ago"
        const matches = history
            .filter((h) => h && h.label === label && typeof h.ts === "number")
            .sort((a, b) => b.ts - a.ts);
        const last = matches[0];
        if (!last) return "";

        const diffMs = Date.now() - last.ts;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffDays > 0) return `Last recorded: ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
        if (diffHours > 0) return `Last recorded: ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
        return "Last recorded: just now";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-blue-50 flex flex-col items-center pt-28 pb-12">
            {(() => {
                try {
                    const raw = localStorage.getItem("userProfile");
                    const parsed = raw ? JSON.parse(raw) : null;
                    const name = parsed?.name;
                    return (
                        <div className="w-full max-w-5xl px-4 mb-8">
                            <div className="text-center inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur shadow-md shadow-black/5 ring-1 ring-black/5">
                                <span>Welcome, {name || "friend"} ✨</span>
                            </div>
                        </div>
                    );
                } catch {
                    return null;
                }
            })()}

            <div className="w-full max-w-5xl px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">How are you feeling today?</h1>
                    <p className="mt-2 text-gray-600">Pick a mood and we’ll store it in your dashboard.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {moods.map((item) => {
                        const lastText = getLastRecordedText(item.label);
                        return (
                            <button
                                key={item.key}
                                onClick={() => saveMood(item)}
                                className={`group relative overflow-hidden rounded-3xl p-5 text-left shadow-lg shadow-indigo-500/10 ring-1 ring-black/5 bg-white/70 backdrop-blur hover:shadow-xl transition-all ${item.accent} text-white`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-70`} />
                                <div className="absolute inset-0 bg-black/15 opacity-60" />

                                <div className="relative flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-4xl shrink-0">{item.emoji}</span>
                                        <div className="min-w-0 flex flex-col items-end">
                                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 group-hover:bg-white/30">
                                                {item.label}
                                            </span>
                                            {lastText ? (
                                                <span className="mt-1 text-[11px] font-semibold text-white/90">
                                                    {lastText}
                                                </span>
                                            ) : (
                                                <span className="mt-1 text-[11px] font-semibold text-white/60">
                                                    Not recorded yet
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-white/95">Tap to save</span>
                                        <span className="text-white/90">→</span>
                                    </div>

                                    <div className="mt-2 rounded-2xl bg-white/10 p-2">
                                        <img
                                            src={item.gif}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.style.display = "none";
                                            }}
                                            alt={`${item.label} emotion gif`}
                                            className="w-full h-24 object-cover rounded-xl"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {mood && (
                    <div className="mt-10 mx-auto max-w-2xl">
                        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-black/5 p-6 ring-1 ring-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">Saved mood</h2>
                                    <p className="text-gray-600 mt-1">Dashboard will show your latest mood.</p>
                                </div>
                                <div className="text-5xl">✨</div>
                            </div>
                            <p className="mt-4 text-3xl font-semibold">{mood}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MoodTracker;

