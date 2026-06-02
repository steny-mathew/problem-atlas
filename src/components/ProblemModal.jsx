function ProblemModal({
  isOpen,
  onClose,
  problem,
}) {
  if (!isOpen || !problem) return null;

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
          {problem.category}
        </p>

        <h1>
          {problem.title}
        </h1>

        <div className="modal-stats">

          <div>
            <h2>{problem.score}</h2>
            <span>
              Opportunity Score
            </span>
          </div>

          <div>
            <h2>
              {problem.mentions}
            </h2>
            <span>
              Mentions
            </span>
          </div>

          <div>
            <h2>
              +{problem.growth}%
            </h2>
            <span>
              Growth
            </span>
          </div>

        </div>

        <h3>
          Real Complaints
        </h3>

        <div className="modal-complaints">

          {problem.complaints.map(
            (complaint, index) => (
              <div
                key={index}
                className="modal-complaint"
              >
                "{complaint}"
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}

export default ProblemModal;