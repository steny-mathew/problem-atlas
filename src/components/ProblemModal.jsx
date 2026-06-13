function ProblemModal({
  isOpen,
  onClose,
  problem,
}) {
  if (!isOpen || !problem) return null;

  const isPresentText = (value) =>
    value &&
    String(value).toLowerCase() !==
      "undefined" &&
    String(value).toLowerCase() !== "null";

  const category =
    isPresentText(problem?.category)
      ? problem.category
      : "Analyzing...";

  const title =
    problem?.productTitle || "Untitled opportunity";

  const summary =
    problem?.summary || "AI analysis pending...";

  const reasoning =
    problem?.reasoning || "AI analysis pending...";

  const formatMetric = (value) =>
    value ?? "-";

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        <p className="problem-tag">
          {category}
        </p>

        <h1>
          {title}
        </h1>

        <div className="modal-stats">
          <div className="modal-stat">
            <span>Demand</span>
            <strong>
              {formatMetric(problem?.demand)}
            </strong>
          </div>

          <div className="modal-stat">
            <span>Difficulty</span>
            <strong>
              {formatMetric(problem?.difficulty)}
            </strong>
          </div>

          <div className="modal-stat">
            <span>Business Potential</span>
            <strong>
              {formatMetric(
                problem?.businessPotential
              )}
            </strong>
          </div>
        </div>

        <section className="modal-section">
          <h3>Summary</h3>

          <p>{summary}</p>
        </section>

        <section className="modal-section">
          <h3>AI Reasoning</h3>

          <p>{reasoning}</p>
        </section>

      </div>
    </div>
  );
}

export default ProblemModal;
