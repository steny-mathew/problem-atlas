function ProblemCard({
  problem,
  onExplore,
}) {
  const isPresentText = (value) =>
    value &&
    String(value).toLowerCase() !==
      "undefined" &&
    String(value).toLowerCase() !== "null";

  const category =
    isPresentText(problem?.category)
      ? problem.category
      : "Analyzing...";

  const score =
    problem?.opportunityScore ?? "...";

  const title =
    problem?.title || "Untitled opportunity";

  const summary =
    problem?.summary || "AI analysis pending...";

  return (
    <div className="card">

      <div className="card-top">

        <span className="card-category">
          {category}
        </span>

        <span className="card-score">
          {score}
        </span>

      </div>

      <h2 className="card-title">
        {title}
      </h2>

      <p className="complaint-preview card-summary">
        {summary}
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
