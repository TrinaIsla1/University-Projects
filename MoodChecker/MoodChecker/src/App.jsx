import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MoodTracker from "./pages/MoodTracker";
import Journal from "./pages/Journal";
import Relaxation from "./pages/Relaxation";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/mood"
          element={
            <RequireAuth>
              <MoodTracker />
            </RequireAuth>
          }
        />

        <Route
          path="/journal"
          element={
            <RequireAuth>
              <Journal />
            </RequireAuth>
          }
        />

        <Route
          path="/relax"
          element={
            <RequireAuth>
              <Relaxation />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

