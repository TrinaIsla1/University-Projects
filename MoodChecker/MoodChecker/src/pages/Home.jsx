import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [submitted, setSubmitted] = useState(false);


    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setSubmitted(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Demo-only: store locally.
        // Also ensure only authenticated users can access protected pages.
        localStorage.setItem("userProfile", JSON.stringify({
            name: form.name || "User",
            email: form.email,
            password: form.password,
        }));
        setSubmitted(true);

        // After sign-in, route user to Mood Tracker.
        // (Using hard navigation to keep the routing simple.)
        window.location.href = "/mood";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-200 to-blue-100 pt-24 pb-12 px-4">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur shadow-md shadow-black/5 ring-1 ring-black/5">
                            <span className="text-xl">🫧</span>
                            <span className="text-sm font-semibold text-indigo-900">Inner Echo</span>
                        </div>

                        <h1 className="mt-5 text-6xl font-extrabold tracking-tight text-indigo-800">
                            Inner Echo
                        </h1>

                        <p className="mt-4 text-xl text-gray-700 max-w-xl">
                            “You deserve love that feels safe.” <br />
                            “Be gentle with yourself—your mind is learning.”
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    const isAuthed = Boolean(
                                        localStorage.getItem("userProfile")
                                    );
                                    if (!isAuthed) {
                                        alert("Please sign in first.");
                                        navigate("/");
                                        return;
                                    }
                                    navigate("/mood");
                                }}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition"
                            >
                                <span>💗</span>
                                <span>Start Mood Check</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const isAuthed = Boolean(
                                        localStorage.getItem("userProfile")
                                    );
                                    if (!isAuthed) {
                                        alert("Please sign in first.");
                                        navigate("/");
                                        return;
                                    }
                                    navigate("/journal");
                                }}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-md shadow-black/5 hover:bg-white/90 transition"
                            >
                                <span>✍️</span>
                                <span>Write a Note</span>
                            </button>
                        </div>

                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="rounded-3xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-md shadow-black/5 p-4">
                                <p className="text-3xl">🌙</p>
                                <p className="mt-2 font-semibold">Calm</p>
                            </div>
                            <div className="rounded-3xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-md shadow-black/5 p-4">
                                <p className="text-3xl">🧠</p>
                                <p className="mt-2 font-semibold">Mindful</p>
                            </div>
                            <div className="rounded-3xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-md shadow-black/5 p-4">
                                <p className="text-3xl">🫶</p>
                                <p className="mt-2 font-semibold">Kind</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg shadow-black/5 ring-1 ring-black/5 p-6 md:p-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Sign in</h2>
                            <span className="text-3xl">🔐</span>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Enter your details to personalize your experience.
                        </p>

                        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium">Name</span>
                                <input
                                    required
                                    name="name"
                                    value={form.name}
                                    onChange={onChange}
                                    placeholder="Your name"
                                    className="px-4 py-3 rounded-2xl bg-white ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium">Email</span>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={onChange}
                                    placeholder="you@example.com"
                                    className="px-4 py-3 rounded-2xl bg-white ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium">Password</span>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="px-4 py-3 rounded-2xl bg-white ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                />
                            </label>

                            <button
                                type="submit"
                                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/25 transition"
                            >
                                Continue
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    localStorage.setItem(
                                        "userProfile",
                                        JSON.stringify({
                                            name: "Google User",
                                            email: "",
                                            password: "",
                                            provider: "google",
                                        })
                                    );
                                    window.location.href = "/mood";
                                }}
                                className="w-full flex items-center justify-center gap-2 rounded-2xl ring-1 ring-black/5 bg-white/70 hover:bg-white/90 px-5 py-3 shadow-md shadow-black/5 transition"
                            >
                                <span className="text-lg">🟦</span>
                                <span className="font-medium">Sign in with Google</span>
                            </button>

                            {submitted && (
                                <div className="mt-2 rounded-2xl bg-green-50 ring-1 ring-green-100 p-4 text-green-900">
                                    <p className="font-semibold">Welcome, {form.name || "friend"} ✨</p>
                                    <p className="text-sm mt-1">How are you feeling today?</p>
                                </div>
                            )}

                            <p className="text-xs text-gray-500">
                                Your details are saved only in your browser.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;


