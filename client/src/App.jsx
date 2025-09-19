import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SetAvatar from "./pages/SetAvatar";
import GuestRoute from "./components/GuestRoute";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setavatar"
          element={
            <ProtectedRoute>
              <SetAvatar />
            </ProtectedRoute>
          }
        />



        <Route element={<GuestRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
