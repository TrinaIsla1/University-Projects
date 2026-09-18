function Dashboard() {
    const mood = localStorage.getItem("mood");

    const moodMeta = {
        Happy: { icon: "😊", className: "from-amber-100 to-yellow-100" },
        Calm: { icon: "😌", className: "from-sky-100 to-cyan-100" },
        Sad: { icon: "😢", className: "from-indigo-100 to-blue-100" },
        Angry: { icon: "😡", className: "from-rose-100 to-pink-100" },
        Stressed: { icon: "😰", className: "from-fuchsia-100 to-purple-100" },
    };

    const picked = mood ? moodMeta[mood] : null;
    const moodIcon = picked?.icon || "🫶";
    const moodBg = picked?.className || "from-yellow-100 to-amber-100";

    // History + stats stored in localStorage.
    const allKeys = Object.keys(localStorage);
    const journalKeys = allKeys.filter((k) => k.startsWith("journal:"));
    const journalCount = journalKeys.length;

    const musicHours = Number(localStorage.getItem("musicHours") || "0");
    const stayHours = musicHours;

    return (
        <div className="min-h-screen bg-yellow-50 flex flex-col items-center pt-28 pb-12 px-4">
            <div className="w-full max-w-5xl">
                <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-black/5 p-8 ring-1 ring-black/5">
                        <h2 className="text-2xl font-semibold">Latest Mood</h2>
                        <p className="text-gray-600 mt-1">
                            Your most recent mood from the Mood Tracker.
                        </p>

                        <div className={`mt-6 rounded-3xl p-8 bg-gradient-to-r ${moodBg} shadow-inner`}>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-yellow-900/70">TODAY</p>
                                    <p className="text-4xl font-bold text-yellow-950 mt-2">
                                        {mood || "No mood recorded yet"}
                                    </p>
                                </div>
                                <div className="text-6xl">{moodIcon}</div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="rounded-3xl bg-white/70 ring-1 ring-black/5 p-5 shadow-sm">
                                <p className="text-sm text-gray-600">Journals made</p>
                                <p className="text-3xl font-bold mt-2">{journalCount}</p>
                            </div>
                            <div className="rounded-3xl bg-white/70 ring-1 ring-black/5 p-5 shadow-sm">
                                <p className="text-sm text-gray-600">Music hours</p>
                                <p className="text-3xl font-bold mt-2">{stayHours.toFixed(0)}</p>
                            </div>
                            <div className="rounded-3xl bg-white/70 ring-1 ring-black/5 p-5 shadow-sm">
                                <p className="text-sm text-gray-600">Today’s entries</p>
                                <p className="text-3xl font-bold mt-2">
                                    {localStorage.getItem("journal:" + new Date().toISOString().slice(0, 10)) ? 1 : 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-black/5 p-8 ring-1 ring-black/5">
                        <h3 className="text-xl font-semibold">Quick actions</h3>
                        <p className="text-gray-600 mt-1">Choose what helps right now.</p>

                        <div className="mt-6 flex flex-col gap-3">
                            <div className="rounded-2xl bg-indigo-50 p-4 ring-1 ring-indigo-100">
                                <p className="font-medium">Breathe</p>
                                <p className="text-gray-600 text-sm">Calm your mind with a short break.</p>
                            </div>
                            <div className="rounded-2xl bg-pink-50 p-4 ring-1 ring-pink-100">
                                <p className="font-medium">Journal</p>
                                <p className="text-gray-600 text-sm">Write thoughts to reduce stress.</p>
                            </div>
                            <div className="rounded-2xl bg-green-50 p-4 ring-1 ring-green-100">
                                <p className="font-medium">Listen (Relax)</p>
                                <p className="text-gray-600 text-sm">Track music time on the Relax page.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


