import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
    const isAuthed = Boolean(localStorage.getItem("userProfile"));
    if (!isAuthed) return <Navigate to="/" replace />;
    return children;
}

export default RequireAuth;

