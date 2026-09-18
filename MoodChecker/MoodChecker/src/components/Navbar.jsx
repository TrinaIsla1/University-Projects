import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const linkBase =
        "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200";

    const navigate = useNavigate();
    const [isAuthed, setIsAuthed] = useState(
        Boolean(localStorage.getItem("userProfile"))
    );

    useEffect(() => {
        const sync = () => {
            setIsAuthed(Boolean(localStorage.getItem("userProfile")));
        };

        window.addEventListener("storage", sync);
        return () => window.removeEventListener("storage", sync);
    }, []);

    const onLogout = () => {
        localStorage.removeItem("userProfile");
        // Keep other app data (mood/journal) intact; only remove auth marker.
        setIsAuthed(false);
        navigate("/", { replace: true });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-5xl px-4 py-3">
                <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between px-3 py-2">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white font-bold">
                                i
                            </span>
                            <span className="text-white font-semibold tracking-wide">
                                Inner Echo
                            </span>
                        </Link>

                        <div className="flex flex-wrap items-center gap-2 justify-end">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `${linkBase} ${isActive
                                        ? "bg-white/20 text-white shadow-inner"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/mood"
                                className={({ isActive }) =>
                                    `${linkBase} ${isActive
                                        ? "bg-white/20 text-white shadow-inner"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                Mood
                            </NavLink>

                            <NavLink
                                to="/journal"
                                className={({ isActive }) =>
                                    `${linkBase} ${isActive
                                        ? "bg-white/20 text-white shadow-inner"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                Journal
                            </NavLink>

                            <NavLink
                                to="/relax"
                                className={({ isActive }) =>
                                    `${linkBase} ${isActive
                                        ? "bg-white/20 text-white shadow-inner"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                Relax
                            </NavLink>

                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `${linkBase} ${isActive
                                        ? "bg-white/20 text-white shadow-inner"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>

                            {isAuthed ? (
                                <button
                                    type="button"
                                    onClick={onLogout}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white/15 text-white shadow-inner hover:bg-white/25`}
                                >
                                    Log out
                                </button>
                            ) : (
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `${linkBase} ${isActive
                                            ? "bg-white/20 text-white shadow-inner"
                                            : "text-white/90 hover:text-white hover:bg-white/10"
                                        }`
                                    }
                                >
                                    Sign in
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;



