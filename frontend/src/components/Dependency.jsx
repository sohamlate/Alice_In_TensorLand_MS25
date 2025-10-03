import React from "react";
import { useState, useEffect } from "react";
import DependencyCard from "./DependencyCard";

const Dependency = () => {
  const [dependencies, setDependencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeps = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/dependencies/");
        const data = await res.json();
        setDependencies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeps();
  }, []);

  const handleUpdate = (dependency) => {
    console.log("Update dependency:", dependency);
    // Add your update logic here
  };

  const handleDelete = (id) => {
    console.log("Delete dependency:", id);
    // Add your delete logic here
    // Example: setDependencies(dependencies.filter(dep => dep.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          <p className="text-amber-400 mt-4 text-xl">Loading dependencies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Dependencies
        </h1>
        
        {dependencies.length === 0 ? (
          <div className="text-center text-gray-400 text-xl mt-12">
            No dependencies found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dependencies.map((dependency) => (
              <DependencyCard
                key={dependency.id}
                dependency={dependency}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dependency;