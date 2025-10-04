import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Sales from './components/Sales';
import Dependency from './components/Dependency';
import DependencyNews from "./components/DependencyNews";
// import NewsEventDetail from "./components/NewsEventDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
          <Routes>
            <Route path="/" element={<Dependency />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/dependency/:id" element={<DependencyNews />} />
            {/* <Route path="/news/:newsId" element={<NewsEventDetail />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;