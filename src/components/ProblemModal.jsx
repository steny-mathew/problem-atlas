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
          {problem.subreddit}
        </p>

        <h1>
          {problem.title}
        </h1>

        <h3>Source</h3>

        <p>{problem.source}</p>

        <h3>Reddit Link</h3>

        <a
          href={problem.url}
          target="_blank"
          rel="noreferrer"
        >
          Open Original Post
        </a>

      </div>
    </div>
  );
}

export default ProblemModal;