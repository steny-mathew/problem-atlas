function ProblemCard({
  problem,
  onExplore,
}) {
  return (
    <div className="card">

      <div className="card-top">

        <span className="card-category">
          {problem.subreddit || "Reddit"}
        </span>

        <span className="card-score">
          🚀
        </span>

      </div>

      <h2 className="card-title">
        {problem.title}
      </h2>

      <div className="card-metrics">

        <span className="growth">
          {problem.source}
        </span>

      </div>

      <p className="complaint-preview">
        Opportunity discovered from Reddit
      </p>

      <button
        className="details-btn"
        onClick={onExplore}
      >
        Explore Opportunity
      </button>

    </div>
  );
}

export default ProblemCard;