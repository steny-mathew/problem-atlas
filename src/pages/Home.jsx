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

  const [searchTerm, setSearchTerm] =
    useState("");

  const [opportunities, setOpportunities] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [selectedProblem, setSelectedProblem] =
    useState(null);

  const isPresentCategory = (category) =>
    category &&
    String(category).toLowerCase() !==
      "undefined" &&
    String(category).toLowerCase() !== "null";

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          "/api/opportunities"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch opportunities."
          );
        }

        const data = await response.json();

        setOpportunities(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(error);

        setErrorMessage(
          "We could not load opportunities right now. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, []);


  const filteredOpportunities = opportunities.filter(
    (opportunity) => {
  
      const title =
        opportunity?.title?.toLowerCase() || "";
  
      const summary =
        opportunity?.summary?.toLowerCase() || "";
  
      const query = searchTerm.toLowerCase();
  
      return (
        title.includes(query) ||
        summary.includes(query)
      );
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

          {isLoading && (
            <p className="opportunity-state">
              Loading opportunities...
            </p>
          )}

          {!isLoading && errorMessage && (
            <p className="opportunity-state opportunity-error">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && (
            <div className="cards">
              {filteredOpportunities.map(
                (opportunity, index) => (
                  <ProblemCard
                    key={
                      opportunity?._id ||
                      opportunity?.id ||
                      index
                    }
                    problem={opportunity}
                    onExplore={() =>
                      setSelectedProblem(
                        opportunity
                      )
                    }
                  />
                )
              )}
            </div>
          )}

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
