import problems from "../data/problems";

function TrendingSection() {
  return (
    <section
      id="trending"
      className="trending-section"
    >
      <h2>Trending Opportunities</h2>

      <div className="featured-grid">

        {problems.slice(0, 3).map(problem => (

          <div
            key={problem.id}
            className="featured-card"
          >
            <span className="featured-category">
              {problem.category}
            </span>

            <h3>{problem.title}</h3>

            <div className="featured-score">
              {problem.score}
            </div>

            <p>
              {problem.mentions} mentions
            </p>

          </div>

        ))}
      </div>
    </section>
  );
}

export default TrendingSection;