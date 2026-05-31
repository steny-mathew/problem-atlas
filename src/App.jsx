import { useState } from "react";

import Hero from "./components/Hero";
import ProblemPulse from "./components/ProblemPulse";
import CategoryFilter from "./components/CategoryFilter";
import ProblemCard from "./components/ProblemCard";

import problems from "./data/problems";

import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Career",
    "Healthcare",
    "Finance"
  ];

  const filteredProblems =
    selectedCategory === "All"
      ? problems
      : problems.filter(
          (p) => p.category === selectedCategory
        );

  return (
    <>
      <Hero />

      <ProblemPulse />

      <div className="layout">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

        <div className="cards">
          {filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;