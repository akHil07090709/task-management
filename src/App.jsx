import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./pages/NotFound";

const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Planner = lazy(() => import("./pages/Planner"));
const ActivityLog = lazy(() => import("./pages/ActivityLog"));

const App = () => (
  <Router>
    <Header />
    <div className="p-4">
      <Suspense fallback={<h2 className="text-center">Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/planner"
            element={
              <PrivateRoute>
                <Planner />
              </PrivateRoute>
            }
          />
          <Route
            path="/activityLog"
            element={
              <PrivateRoute>
                <ActivityLog />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  </Router>
);

export default App;
