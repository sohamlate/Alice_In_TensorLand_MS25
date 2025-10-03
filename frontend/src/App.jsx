import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Stockform from "./components/Stockform";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      {/* Simple Navbar */}
      <nav style={{ padding: "10px", background: "#f2f2f2" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/stockform">Add Dependency</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stockform" element={<Stockform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
