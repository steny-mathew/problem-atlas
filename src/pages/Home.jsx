import { useState, useEffect } from "react";

import ProblemModal from "../components/ProblemModal";

import Hero from "../components/Hero";
import ProblemCard from "../components/ProblemCard";
import Navbar from "../components/Navbar";
import OpportunityDeck from "../components/OpportunityDeck";
import ProblemAtlas from "../components/ProblemAtlas";
import About from "../components/About";

import "../App.css";

function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [problems, setProblems] = useState([]);

  const [selectedProblem, setSelectedProblem] =
    useState(null);
    useEffect(() => {
      fetch("http://localhost:3001/api/problems")
        .then((res) => res.json())
        .then((data) => {
          setProblems(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

  const categories = [
    "All",
    "Career",
    "Healthcare",
    "Finance",
  ];

  const filteredProblems = problems.filter(
    (problem) => {
      const categoryMatch =
        selectedCategory === "All" ||
        problem.category === selectedCategory;

      const searchMatch =
        problem.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return categoryMatch && searchMatch;
    }
  );

  return (
    <>
      <div className="background-animation"></div>

      <Navbar />

      <Hero />
      <About />
      <ProblemAtlas />

      <OpportunityDeck
        onExplore={(problem) =>
          setSelectedProblem(problem)
        }
      />

      <section
        id="explorer"
        className="explorer-section"
      >
        <div className="explorer-header">
          <p className="section-tag">
            DISCOVERY ENGINE
          </p>

          <h2 className="explorer-title">
            Explore Opportunities
          </h2>

          <p className="explorer-description">
            Search thousands of
            real-world complaints
            transformed into actionable
            opportunities.
          </p>
        </div>
      </section>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search Problems..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="search-bar"
        />
      </div>

      <div className="layout">
        <div className="explorer-content">

          <div className="category-pills">
            {categories.map(
              (category) => (
                <button
                  key={category}
                  className={
                    selectedCategory ===
                    category
                      ? "pill active-pill"
                      : "pill"
                  }
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}
          </div>

          <div className="cards">
            {filteredProblems.map(
              (problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  onExplore={() =>
                    setSelectedProblem(
                      problem
                    )
                  }
                />
              )
            )}
          </div>

        </div>
      </div>

      <ProblemModal
        isOpen={!!selectedProblem}
        problem={selectedProblem}
        onClose={() =>
          setSelectedProblem(null)
        }
      />
    </>
  );
}

export default Home;