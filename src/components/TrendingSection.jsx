import problems from "../data/problems";

function TrendingSection() {
  const featured = [...problems]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <section
      id="trending"
      className="trending-section"
    >
      <p className="section-tag">
        HOT SIGNALS
      </p>

      <h2 className="trending-title">
        Trending Opportunities
      </h2>

      <div className="featured-grid">
        {featured.map((problem) => (
          <div
            key={problem.id}
            className="featured-card"
          >
            <span className="featured-category">
              {problem.category}
            </span>

            <div className="featured-score">
              {problem.score}
            </div>

            <h3>
              {problem.title}
            </h3>

            <p>
              {problem.mentions}
              {" "}mentions
            </p>

            <button>
              Explore →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;