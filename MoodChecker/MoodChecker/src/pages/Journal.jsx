import { useEffect, useMemo, useState } from "react";

function Journal() {
    const [note, setNote] = useState("");

    const todayKey = useMemo(() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }, []);

    const todayLabel = useMemo(() => {
        const d = new Date();
        return d.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }, []);

    const storageKey = `journal:${todayKey}`;

    useEffect(() => {
        setNote(localStorage.getItem(storageKey) || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveNote = () => {
        localStorage.setItem(storageKey, note);
    };

    const savedNote = useMemo(() => {
        return localStorage.getItem(storageKey) || "";
    }, [note, storageKey]);

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center pt-28 pb-12 px-4">
            <div className="w-full max-w-5xl">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold">Daily Journal</h1>
                    <p className="text-gray-600 mt-2">Write freely. Your notes are saved in your browser.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-black/5 p-6 ring-1 ring-black/5">
                        <div className="mb-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/60 ring-1 ring-pink-200/70 text-pink-900">
                                <span>📅</span>
                                <span className="text-sm font-semibold">{todayLabel}</span>
                            </div>
                        </div>

                        <div className="mt-2 rounded-2xl bg-white/60 ring-1 ring-black/5 p-3">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Today’s note</p>
                                    <p className="text-xs text-gray-600">Stored as journal:YYYY-MM-DD</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        localStorage.removeItem(storageKey);
                                        setNote("");
                                    }}
                                    className="text-xs font-semibold rounded-xl px-3 py-1 bg-pink-50 hover:bg-pink-100 ring-1 ring-pink-100"
                                >
                                    Delete today
                                </button>
                            </div>
                        </div>


                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Write your thoughts here..."
                            className="w-full h-72 p-4 rounded-2xl border bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        />

                        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                            <button
                                onClick={() => {
                                    saveNote();
                                    alert("Journal saved!");
                                }}
                                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl shadow-md shadow-pink-500/20 transition"
                            >
                                Save Journal
                            </button>

                            <p className="text-sm text-gray-600">
                                Tip: Try “What happened today, and how did I feel?”
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4">
                            <div className="bg-white/60 rounded-3xl ring-1 ring-black/5 p-5">
                                <h2 className="font-semibold text-lg">Today’s note</h2>
                                {savedNote ? (
                                    <p className="mt-2 whitespace-pre-wrap text-gray-700">{savedNote}</p>
                                ) : (
                                    <p className="mt-2 text-gray-500">Nothing saved for today yet.</p>
                                )}
                            </div>

                            <div className="bg-white/60 rounded-3xl ring-1 ring-black/5 p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="font-semibold text-lg">Journal history</h2>
                                    <span className="text-xs text-gray-600">Delete any entry</span>
                                </div>

                                {(() => {
                                    const keys = Object.keys(localStorage).filter((k) => k.startsWith("journal:"));
                                    const sorted = keys.sort().reverse();

                                    if (sorted.length === 0) {
                                        return (
                                            <p className="mt-3 text-sm text-gray-500">
                                                No saved journals yet.
                                            </p>
                                        );
                                    }

                                    return (
                                        <div className="mt-3 flex flex-col gap-3">
                                            {sorted.map((k) => {
                                                const date = k.replace("journal:", "");
                                                const txt = localStorage.getItem(k) || "";
                                                return (
                                                    <div
                                                        key={k}
                                                        className="rounded-2xl bg-white/70 ring-1 ring-black/5 p-4 flex items-start justify-between gap-4"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                // Load selected journal into the editor (read-only selection).
                                                                setNote(txt);
                                                                // Also set the editor to today's textarea; storageKey remains today.
                                                                // This keeps current UX: editor always edits today.
                                                                // For viewing, we show the selected content in the “Today’s note” card below.
                                                            }}
                                                            className="min-w-0 text-left flex-1"
                                                        >
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {date}
                                                            </p>
                                                            <p className="text-sm text-gray-600 mt-1 line-clamp-3 whitespace-pre-wrap">
                                                                {txt}
                                                            </p>
                                                        </button>

                                                        <div className="flex flex-col gap-2 items-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    localStorage.removeItem(k);
                                                                    if (k === storageKey) setNote("");
                                                                    window.location.reload();
                                                                }}
                                                                className="shrink-0 rounded-xl bg-pink-50 hover:bg-pink-100 ring-1 ring-pink-100 px-3 py-2 text-xs font-semibold"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-black/5 p-6 ring-1 ring-black/5">
                        <h2 className="text-xl font-semibold">Free help videos</h2>
                        <p className="text-gray-600 text-sm mt-2">General resources for mindfulness & journaling.</p>

                        <div className="mt-4 flex flex-col gap-3">
                            <a
                                href="https://www.youtube.com/watch?v=fcxVw4Zx4Gg"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl bg-pink-50 ring-1 ring-pink-100 p-4 hover:bg-pink-100 transition"
                            >
                                <p className="font-medium">Mindfulness practice (YouTube)</p>
                                <p className="text-xs text-gray-600 mt-1">Open in new tab</p>
                            </a>

                            <a
                                href="https://www.youtube.com/@JennysMindfulMoments"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl bg-pink-50 ring-1 ring-pink-100 p-4 hover:bg-pink-100 transition"
                            >
                                <p className="font-medium">Guided calm playlists</p>
                                <p className="text-xs text-gray-600 mt-1">Open channel</p>
                            </a>

                            <a
                                href="https://www.youtube.com/results?search_query=free+therapy+skills+journaling"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl bg-pink-50 ring-1 ring-pink-100 p-4 hover:bg-pink-100 transition"
                            >
                                <p className="font-medium">Search more journaling videos</p>
                                <p className="text-xs text-gray-600 mt-1">Curated via search</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Journal;

