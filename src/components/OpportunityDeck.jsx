import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import problems from "../data/problems";

function OpportunityDeck() {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex((prev) =>
      (prev + 1) % problems.length
    );
  };

  const prevCard = () => {
    setIndex((prev) =>
      (prev - 1 + problems.length) %
      problems.length
    );
  };

  const problem = problems[index];

  return (
    <section className="deck-section">

      <p className="section-tag">
        HOT SIGNALS
      </p>

      <h2 className="deck-title">
        Trending Opportunities
      </h2>

      <div className="deck-wrapper">

        <div className="deck-shadow deck-third"></div>
        <div className="deck-shadow deck-second"></div>

        <AnimatePresence mode="wait">

          <motion.div
            key={problem.id}
            className="deck-card"

            drag="x"

            dragConstraints={{
              left: 0,
              right: 0
            }}

            onDragEnd={(_, info) => {
              if (info.offset.x > 100)
                prevCard();

              if (info.offset.x < -100)
                nextCard();
            }}

            initial={{
              opacity: 0,
              scale: 0.9
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

            exit={{
              opacity: 0,
              scale: 0.9
            }}
          >
            <div className="deck-label">
              #{index + 1} TRENDING
            </div>

            <h3 className="deck-problem-title">
              {problem.title}
            </h3>

            <p className="deck-mentions">
              {problem.mentions} mentions across
              online communities.
            </p>

            <button className="deck-explore">
              Explore Opportunity →
            </button>

          </motion.div>

        </AnimatePresence>

      </div>

      <div className="deck-controls">

        <button onClick={prevCard}>
          ←
        </button>

        <div className="deck-dots">
          {problems.map((_, i) => (
            <span
              key={i}
              className={
                i === index
                  ? "dot active-dot"
                  : "dot"
              }
            />
          ))}
        </div>

        <button onClick={nextCard}>
          →
        </button>

      </div>

    </section>
  );
}

export default OpportunityDeck;