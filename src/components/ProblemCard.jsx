function ProblemCard({ problem }) {
  return (
    <div className="card">

      <div className="card-top">

        <span className="card-category">
          {problem.category}
        </span>

        <span className="card-score">
          {problem.score}
        </span>

      </div>

      <h2 className="card-title">
        {problem.title}
      </h2>

      <div className="card-metrics">

        <span className="growth">
          ↑ {problem.growth}% Growth
        </span>

        <span className="mentions">
          {problem.mentions} Mentions
        </span>

      </div>

      <p className="complaint-preview">
        "{problem.complaints[0]}"
      </p>

      <button className="view-btn">
        View Opportunity →
      </button>

    </div>
  );
}

export default ProblemCard;